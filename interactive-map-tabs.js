/**
 * Multi-tab map slots (up to 10) for interactive season maps.
 * Expects initInteractiveMapTabs() to be called from each page after
 * state, setZoom, updateUI, renderMap, updateCanvasDisplay, and helpers exist.
 */
(function (global) {
  "use strict";

  function cloneAlliances(alliances) {
    try {
      return JSON.parse(JSON.stringify(alliances || []));
    } catch {
      return [];
    }
  }

  function clonePins(pins) {
    try {
      return JSON.parse(JSON.stringify(pins || []));
    } catch {
      return [];
    }
  }

  function defaultLabel(index) {
    return "Map " + (index + 1);
  }

  /**
   * @param {object} options
   * @param {string} options.storageKey - unique per season map page
   * @param {object} options.state - page map state (mutated)
   * @param {HTMLElement} options.mapCanvasWrapper
   * @param {function} options.loadAllianceTagsForSeason
   * @param {function} options.updateUI
   * @param {function} options.renderMap
   * @param {function} options.updateCanvasDisplay
   * @param {function} options.setZoom - (zoom: number) => void
   * @param {function} [options.syncSharedAllianceTagsFromState]
   * @param {number} [options.maxTabs=10]
   */
  function initInteractiveMapTabs(options) {
    var storageKey = options.storageKey;
    var state = options.state;
    var mapCanvasWrapper = options.mapCanvasWrapper;
    var loadAllianceTagsForSeason = options.loadAllianceTagsForSeason;
    var updateUI = options.updateUI;
    var renderMap = options.renderMap;
    var updateCanvasDisplay = options.updateCanvasDisplay;
    var setZoom = options.setZoom;
    var syncShared = options.syncSharedAllianceTagsFromState || function () {};
    var maxTabs = options.maxTabs || 10;

    var activeIndex = 0;
    /** @type {Array<{label?: string, alliances: object[], territories: object, selectedAlliance: *, selectedAreaId: *, zoom: number, scrollLeft: number, scrollTop: number}|null>} */
    var slots = new Array(maxTabs).fill(null);
    /** Display names for tabs that have not been saved yet */
    var tabLabels = new Array(maxTabs).fill("");

    var strip = document.getElementById("mapTabsStrip");
    if (!strip) {
      return;
    }

    function persist() {
      try {
        var payload = {
          v: 1,
          activeIndex: activeIndex,
          tabLabels: tabLabels.slice(),
          slots: slots.map(function (s) {
            return s;
          }),
        };
        global.localStorage.setItem(storageKey, JSON.stringify(payload));
      } catch (e) {
        /* ignore quota */
      }
    }

    function loadPersisted() {
      try {
        var raw = global.localStorage.getItem(storageKey);
        if (!raw) {
          return false;
        }
        var data = JSON.parse(raw);
        if (!data || typeof data !== "object") {
          return false;
        }
        if (typeof data.activeIndex === "number" && data.activeIndex >= 0) {
          activeIndex = Math.min(maxTabs - 1, data.activeIndex);
        }
        if (Array.isArray(data.slots)) {
          for (var i = 0; i < maxTabs; i++) {
            slots[i] = data.slots[i] || null;
          }
        }
        if (Array.isArray(data.tabLabels)) {
          for (var j = 0; j < maxTabs; j++) {
            tabLabels[j] =
              typeof data.tabLabels[j] === "string" ? data.tabLabels[j] : "";
          }
        }
        return true;
      } catch {
        return false;
      }
    }

    function snapshotCurrent() {
      var prev = slots[activeIndex];
      var pendingLabel =
        (prev && prev.label) ||
        (tabLabels[activeIndex] && String(tabLabels[activeIndex]).trim()) ||
        "";
      slots[activeIndex] = {
        label: pendingLabel,
        alliances: cloneAlliances(state.alliances),
        territories: Object.assign({}, state.territories),
        selectedAlliance: state.selectedAlliance,
        selectedAreaId: state.selectedAreaId,
        zoom: state.view.zoom,
        scrollLeft: mapCanvasWrapper.scrollLeft,
        scrollTop: mapCanvasWrapper.scrollTop,
        strategyPins: clonePins(state.strategyPins),
        selectedPinId: state.selectedPinId || null,
      };
      tabLabels[activeIndex] = "";
    }

    function applySlot(index) {
      var slot = slots[index];
      state.paint.isPainting = false;
      state.paint.visited = new Set();
      state.paint.justPainted = false;

      if (!slot) {
        state.territories = {};
        state.selectedAlliance = null;
        state.selectedAreaId = null;
        state.strategyPins = [];
        state.selectedPinId = null;
        state.pinPlacementMode = false;
        var placementCb0 = document.getElementById("strategyPinPlacement");
        if (placementCb0) {
          placementCb0.checked = false;
        }
        mapCanvasWrapper.scrollLeft = 0;
        mapCanvasWrapper.scrollTop = 0;
        setZoom(1);
        // Always load shared alliances
        loadAllianceTagsForSeason();
        syncShared();
        return;
      }

      state.territories = Object.assign({}, slot.territories || {});
      state.selectedAlliance = slot.selectedAlliance;
      state.selectedAreaId = slot.selectedAreaId;
      state.strategyPins = clonePins(slot.strategyPins);
      state.selectedPinId = slot.selectedPinId || null;
      state.pinPlacementMode = false;
      var placementCb1 = document.getElementById("strategyPinPlacement");
      if (placementCb1) {
        placementCb1.checked = false;
      }
      mapCanvasWrapper.scrollLeft = slot.scrollLeft || 0;
      mapCanvasWrapper.scrollTop = slot.scrollTop || 0;
      setZoom(typeof slot.zoom === "number" ? slot.zoom : 1);
      // Always load shared alliances for every tab
      loadAllianceTagsForSeason();
      syncShared();
    }

    function tabLabel(index) {
      var s = slots[index];
      var fromSlot = s && s.label && String(s.label).trim();
      if (fromSlot) {
        return fromSlot;
      }
      var fromStrip = tabLabels[index] && String(tabLabels[index]).trim();
      if (fromStrip) {
        return fromStrip;
      }
      return defaultLabel(index);
    }

    function renderTabs() {
      strip.innerHTML = "";
      for (var i = 0; i < maxTabs; i++) {
        (function (idx) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "map-tab" + (idx === activeIndex ? " map-tab-active" : "");
          btn.setAttribute("role", "tab");
          btn.setAttribute("aria-selected", idx === activeIndex ? "true" : "false");
          btn.setAttribute("id", "mapTab-" + idx);
          btn.setAttribute("aria-controls", "mapTabPanel");
          btn.title = "Map slot " + (idx + 1) + ". Double-click to rename.";
          btn.textContent = tabLabel(idx);
          btn.addEventListener("click", function () {
            if (idx === activeIndex) {
              return;
            }
            snapshotCurrent();
            persist();
            activeIndex = idx;
            applySlot(activeIndex);
            updateUI();
            updateCanvasDisplay();
            renderMap();
            if (
              global.LWStrategyPins &&
              typeof global.LWStrategyPins.updatePinsList === "function"
            ) {
              global.LWStrategyPins.updatePinsList();
            }
            persist();
            renderTabs();
          });
          btn.addEventListener("dblclick", function (e) {
            e.preventDefault();
            var name = global.prompt("Name for this map tab:", tabLabel(idx));
            if (name === null) {
              return;
            }
            name = String(name).trim().slice(0, 48);
            if (slots[idx]) {
              slots[idx].label = name;
            } else {
              tabLabels[idx] = name;
            }
            persist();
            renderTabs();
          });
          strip.appendChild(btn);
        })(i);
      }
    }

    function init() {
      var hadSaved = loadPersisted();
      if (!hadSaved) {
        loadAllianceTagsForSeason();
        activeIndex = 0;
        snapshotCurrent();
        persist();
      } else {
        applySlot(activeIndex);
      }
      updateUI();
      updateCanvasDisplay();
      renderMap();
      if (
        global.LWStrategyPins &&
        typeof global.LWStrategyPins.updatePinsList === "function"
      ) {
        global.LWStrategyPins.updatePinsList();
      }
      renderTabs();
    }

    global.addEventListener("beforeunload", function () {
      snapshotCurrent();
      persist();
    });

    global.saveInteractiveMapTabs = function () {
      snapshotCurrent();
      persist();
    };

    init();
  }

  global.initInteractiveMapTabs = initInteractiveMapTabs;
})(typeof window !== "undefined" ? window : globalThis);
