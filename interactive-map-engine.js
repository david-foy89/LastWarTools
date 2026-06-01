/**
 * Interactive map engine (canvas, alliances, export) — shared across seasons.
 */
(function (global) {
  "use strict";

  function bootInteractiveMap(cfg) {
    cfg = cfg || {};
    const TERRITORY_DATA = global[cfg.territoriesGlobal || "SEASON_1_TERRITORIES"] || [];

// Initialize map data
const state = {
  alliances: [],
  selectedAlliance: null,
  selectedAreaId: null,
  territories: {}, // territory index -> alliance tag
  view: {
    zoom: 1,
    minZoom: 0.75,
    maxZoom: 3,
    zoomStep: 0.25,
    pinchStartDistance: null,
    pinchStartZoom: 1,
    isDragging: false,
    dragHappened: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartScrollLeft: 0,
    dragStartScrollTop: 0,
    touchPanStartX: null,
    touchPanStartY: null,
    touchPanScrollLeft: 0,
    touchPanScrollTop: 0,
  },
  paint: {
    isPainting: false,
    mode: "assign",
    visited: new Set(),
    justPainted: false,
  },
  areaTypes: {
    SH: { name: "Stronghold", count: 305 },
    B: { name: "Brewery", count: 24 },
    FSA: { name: "Fog Shroud Alley", count: 20 },
    TP: { name: "Theme Park", count: 16 },
    AG: { name: "Art Gallery", count: 12 },
    S: { name: "Stadium", count: 2 },
    RS: { name: "Royal Stadium", count: 3 },
    HN: { name: "House of Nobles", count: 3 },
  },
  strategyPins: [],
  selectedPinId: null,
  pinPlacementMode: false,
};

const canvas = document.getElementById("mapCanvas");
const mapCanvasWrapper = document.getElementById("mapCanvasWrapper");
const mapTooltip = document.getElementById("mapTooltip");
const ctx = canvas.getContext("2d");
const MAP_SIZE = 1000;
const CURRENT_SEASON = cfg.seasonNumber;
const MAX_ALLIANCES = 12;
const SHARED_ALLIANCE_TAGS_KEY = "lwst-shared-alliance-tags-v1";
const AREA_ABBREVIATIONS = {
  Stronghold: "SH",
  Village: "V",
  Town: "T",
  Factory: "F",
  Brewery: "B",
  "Fog Shroud Alley": "FSA",
  "Theme Park": "TP",
  "Art Gallery": "AG",
  Stadium: "S",
  "Royal Stadium": "RS",
  "House of Nobles": "HN",
  "Train Station": "TS",
  "Launch Site": "LS",
  "War Palace": "WP",
  "Royal Palace": "RP",
};

const BUFF_LABELS = {
  iron: "Iron Output",
  food: "Food Output",
  coin: "Coin Output",
  gathering: "Gathering Speed",
  research: "Research Speed",
  training: "Training Speed",
  construction: "Construction Speed",
  healing: "Healing Speed",
  march: "March Speed",
};

// Alliance colors
const allianceColors = [
  "#ff6b6b",
  "#4ecdc4",
  "#45b7d1",
  "#ffd93d",
  "#a78bfa",
  "#f97316",
  "#10b981",
  "#06b6d4",
  "#ec4899",
  "#8b5cf6",
  "#ef4444",
  "#3b82f6",
];

function clampZoom(zoom) {
  return Math.min(state.view.maxZoom, Math.max(state.view.minZoom, zoom));
}

function updateCanvasDisplay() {
  const wrapperStyles = window.getComputedStyle(mapCanvasWrapper);
  const paddingLeft = parseFloat(wrapperStyles.paddingLeft) || 0;
  const paddingRight = parseFloat(wrapperStyles.paddingRight) || 0;
  const availableWidth = Math.max(
    240,
    mapCanvasWrapper.clientWidth - paddingLeft - paddingRight,
  );
  const baseWidth = Math.min(MAP_SIZE, availableWidth);
  const displayWidth = baseWidth * state.view.zoom;
  const displayHeight = displayWidth;

  state.view.displayWidth = displayWidth;
  state.view.displayHeight = displayHeight;

  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;
  document.getElementById("zoomLevel").textContent = `${Math.round(
    state.view.zoom * 100,
  )}%`;
}

function setZoom(zoom) {
  const nextZoom = clampZoom(zoom);
  if (nextZoom === state.view.zoom) {
    return;
  }

  state.view.zoom = nextZoom;
  updateCanvasDisplay();
  renderMap();
}

function zoomIn() {
  setZoom(state.view.zoom + state.view.zoomStep);
}

function zoomOut() {
  setZoom(state.view.zoom - state.view.zoomStep);
}

function resetZoom() {
  setZoom(1);
}

function getTouchDistance(touchA, touchB) {
  const deltaX = touchA.clientX - touchB.clientX;
  const deltaY = touchA.clientY - touchB.clientY;
  return Math.hypot(deltaX, deltaY);
}

function getSharedAllianceTags() {
  try {
    const raw = localStorage.getItem(SHARED_ALLIANCE_TAGS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return null;
        }

        const tag = String(entry.tag || "")
          .trim()
          .toUpperCase();
        const firstSeason = Number.parseInt(entry.firstSeason, 10);
        if (!tag || Number.isNaN(firstSeason)) {
          return null;
        }

        return {
          tag,
          firstSeason,
          color: entry.color || null,
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function setSharedAllianceTags(entries) {
  localStorage.setItem(SHARED_ALLIANCE_TAGS_KEY, JSON.stringify(entries));
}

function loadAllianceTagsForSeason() {
  const debugPanel = document.getElementById("allianceDebugPanel");
  const debugContent = document.getElementById("allianceDebugContent");
  const raw = getSharedAllianceTags();
  const filtered = raw
    .filter((entry) => entry.firstSeason <= CURRENT_SEASON)
    .sort(
      (a, b) =>
        a.firstSeason - b.firstSeason || a.tag.localeCompare(b.tag),
    )
    .slice(0, MAX_ALLIANCES);
  state.alliances = filtered.map((entry, index) => ({
    tag: entry.tag,
    color:
      entry.color || allianceColors[index % allianceColors.length],
    cities: 0,
    strongholds: 0,
  }));
  // Only show debug panel if a special flag is set
  if (window.SHOW_ALLIANCE_DEBUG_PANEL && debugPanel && debugContent) {
    debugPanel.removeAttribute("hidden");
    debugPanel.setAttribute("aria-hidden", "false");
    debugPanel.style.cssText =
      "display:block;position:fixed;bottom:12px;right:12px;max-width:420px;z-index:10000;background:#222;color:#fff;padding:12px;border-radius:10px;border:2px solid #e74c3c;font-size:0.9em;word-break:break-all;white-space:pre-wrap;";
    debugContent.textContent =
      "Raw from localStorage:\n" +
      JSON.stringify(raw, null, 2) +
      "\n\nFiltered (firstSeason <= " +
      CURRENT_SEASON +
      "):\n" +
      JSON.stringify(filtered, null, 2);
  } else if (debugPanel) {
    debugPanel.setAttribute("hidden", "");
    debugPanel.setAttribute("aria-hidden", "true");
    debugPanel.style.cssText =
      "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0";
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function syncSharedAllianceTagsFromState() {
  const sharedByTag = new Map(
    getSharedAllianceTags().map((entry) => [entry.tag, entry]),
  );
  const currentTags = new Set(state.alliances.map((a) => a.tag));

  for (const [tag, entry] of sharedByTag.entries()) {
    if (entry.firstSeason === CURRENT_SEASON && !currentTags.has(tag)) {
      sharedByTag.delete(tag);
    }
  }

  state.alliances.forEach((alliance, index) => {
    const existing = sharedByTag.get(alliance.tag);
    sharedByTag.set(alliance.tag, {
      tag: alliance.tag,
      firstSeason: existing
        ? Math.min(existing.firstSeason, CURRENT_SEASON)
        : CURRENT_SEASON,
      color:
        (existing && existing.color) ||
        alliance.color ||
        allianceColors[index % allianceColors.length],
    });
  });

  const merged = Array.from(sharedByTag.values()).sort(
    (a, b) => a.firstSeason - b.firstSeason || a.tag.localeCompare(b.tag),
  );
  setSharedAllianceTags(merged);
}

function addAlliance() {
  const input = document.getElementById("allianceInput");
  const tag = input.value.trim().toUpperCase();

  if (!tag) return;
  if (state.alliances.find((a) => a.tag === tag)) {
    alert("Alliance already exists!");
    return;
  }
  if (state.alliances.length >= MAX_ALLIANCES) {
    alert(`Maximum ${MAX_ALLIANCES} alliances allowed!`);
    return;
  }

  const alliance = {
    tag,
    color: allianceColors[state.alliances.length % allianceColors.length],
    cities: 0,
    strongholds: 0,
  };

  state.alliances.push(alliance);
  syncSharedAllianceTagsFromState();
  input.value = "";
  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
}

function removeAlliance(tag) {
  if (
    !confirm(
      `Remove alliance "${tag}"? Its painted territories will be cleared.`,
    )
  ) {
    return;
  }

  state.alliances = state.alliances.filter((a) => a.tag !== tag);

  Object.keys(state.territories).forEach((key) => {
    if (state.territories[key] === tag) {
      delete state.territories[key];
    }
  });

  if (state.selectedAlliance === tag) {
    state.selectedAlliance = null;
  }

  syncSharedAllianceTagsFromState();
  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
}

function renameAlliance(oldTag, newTag, color) {
  const alliance = state.alliances.find((a) => a.tag === oldTag);
  if (!alliance) return false;

  const trimmed = String(newTag || "")
    .trim()
    .toUpperCase();
  if (!trimmed) return false;
  if (trimmed !== oldTag && state.alliances.some((a) => a.tag === trimmed)) {
    alert("Alliance already exists!");
    return false;
  }

  alliance.tag = trimmed;
  if (color) alliance.color = color;

  Object.keys(state.territories).forEach((key) => {
    if (state.territories[key] === oldTag) {
      state.territories[key] = trimmed;
    }
  });

  if (state.selectedAlliance === oldTag) {
    state.selectedAlliance = trimmed;
  }

  syncSharedAllianceTagsFromState();
  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
  return true;
}

function editAlliance(tag) {
  const alliance = state.alliances.find((a) => a.tag === tag);
  if (!alliance) return;

  const newTag = prompt("Edit alliance tag:", tag);
  if (newTag === null) return;

  renameAlliance(tag, newTag, alliance.color);
}

function setAllianceColor(tag, color) {
  const alliance = state.alliances.find((a) => a.tag === tag);
  if (!alliance || !color) return;

  alliance.color = color;
  syncSharedAllianceTagsFromState();
  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
}

let allianceColorPickerInput = null;

function pickAllianceColor(tag) {
  const alliance = state.alliances.find((a) => a.tag === tag);
  if (!alliance) return;

  if (!allianceColorPickerInput) {
    allianceColorPickerInput = document.createElement("input");
    allianceColorPickerInput.type = "color";
    allianceColorPickerInput.id = "lwstAllianceColorInput";
    allianceColorPickerInput.style.cssText =
      "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;";
    allianceColorPickerInput.addEventListener("change", () => {
      const pickerTag = allianceColorPickerInput.dataset.tag;
      if (pickerTag) {
        setAllianceColor(pickerTag, allianceColorPickerInput.value);
      }
    });
    document.body.appendChild(allianceColorPickerInput);
  }

  allianceColorPickerInput.dataset.tag = tag;
  allianceColorPickerInput.value = alliance.color || allianceColors[0];
  allianceColorPickerInput.click();
}

const ALLIANCE_ICON_EDIT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
const ALLIANCE_ICON_DELETE =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';

function setupAllianceListActions() {
  const list = document.getElementById("allianceList");
  if (!list || list._lwAllianceActionsBound) return;
  list._lwAllianceActionsBound = true;

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".alliance-item");
    if (!item) return;
    const tag = item.dataset.tag;
    if (!tag) return;

    if (
      e.target.closest("[data-action='edit']") ||
      e.target.closest(".alliance-btn--edit")
    ) {
      e.stopPropagation();
      editAlliance(tag);
      return;
    }
    if (
      e.target.closest("[data-action='remove']") ||
      e.target.closest(".alliance-btn--delete")
    ) {
      e.stopPropagation();
      removeAlliance(tag);
      return;
    }
    if (
      e.target.closest("[data-action='color']") ||
      e.target.closest(".alliance-color-btn")
    ) {
      e.stopPropagation();
      pickAllianceColor(tag);
      return;
    }
    if (!e.target.closest(".alliance-actions")) {
      selectAlliance(tag);
    }
  });
}

function initAllianceManagerUi() {
  const addBtn = document.querySelector(".alliance-input .btn-small");
  if (addBtn) addBtn.classList.add("btn-small--add");
}

function selectAlliance(tag) {
  state.selectedAlliance = state.selectedAlliance === tag ? null : tag;
  updateUI();
}

function updateUI() {
  const allianceList = document.getElementById("allianceList");
  if (!state.alliances.length) {
    allianceList.innerHTML =
      '<p class="alliance-empty">No alliances yet.<br />Enter a tag above and click Add.</p>';
  } else {
    allianceList.innerHTML = state.alliances
      .map((alliance) => {
        const safeTag = escapeHtml(alliance.tag);
        const safeColor = escapeHtml(alliance.color || allianceColors[0]);
        const areaCount = countAllianceTerritories(alliance.tag);
        const selected =
          state.selectedAlliance === alliance.tag ? "selected" : "";
        const areaLabel = areaCount === 1 ? "1 area" : `${areaCount} areas`;
        return `
          <div class="alliance-item ${selected}" data-tag="${safeTag}"
               style="--alliance-accent: ${safeColor};">
            <button type="button" class="alliance-color-btn" data-action="color"
                    title="Change color" aria-label="Change color for ${safeTag}">
              <span class="alliance-color-swatch" style="--alliance-color: ${safeColor};"></span>
            </button>
            <div class="alliance-item-main">
              <span class="alliance-tag" title="${safeTag}">${safeTag}</span>
              <span class="alliance-area-count">${areaLabel}</span>
            </div>
            <div class="alliance-actions">
              <button type="button" class="alliance-btn alliance-btn--edit" data-action="edit"
                      title="Edit tag" aria-label="Edit ${safeTag}">
                ${ALLIANCE_ICON_EDIT}
              </button>
              <button type="button" class="alliance-btn alliance-btn--delete" data-action="remove"
                      title="Delete alliance" aria-label="Delete ${safeTag}">
                ${ALLIANCE_ICON_DELETE}
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Update stats
  const assignedCount = Object.keys(state.territories).length;
  document.getElementById("statTotalAreas").textContent = "386";
  document.getElementById("statAssigned").textContent = assignedCount;
  document.getElementById("statAlliances").textContent =
    state.alliances.length;
  document.getElementById("statSelected").textContent =
    state.selectedAlliance || "None";

  // Update top stats
  document.getElementById("topStatTotalAreas").textContent = "386";
  document.getElementById("topStatAlliances").textContent =
    state.alliances.length;
  document.getElementById("topStatAssigned").textContent = assignedCount;
  updateSelectedAreaInfo();
}

function countAllianceTerritories(tag) {
  return Object.values(state.territories).filter((t) => t === tag).length;
}

function getAreaAbbreviation(name) {
  return AREA_ABBREVIATIONS[name] || name;
}

function formatBuff(buff) {
  if (!buff) {
    return "None";
  }

  const label = BUFF_LABELS[buff.item] || buff.item;
  return `${label} +${buff.percentage}%`;
}

function updateSelectedAreaInfo() {
  const panel = document.getElementById("selectedAreaPanel");
  if (!panel) {
    return;
  }

  if (!state.selectedAreaId) {
    panel.innerHTML = `
      <div class="area-detail-hint">
        Click any square on the map to inspect its level, buff, and influence points.
      </div>
    `;
    return;
  }

  const area = mapAreas.find(
    (entry) => entry.id === state.selectedAreaId,
  );
  if (!area) {
    panel.innerHTML = `
      <div class="area-detail-hint">Area details are unavailable.</div>
    `;
    return;
  }

  const owner = state.territories[area.id] || "Unassigned";
  const influence = area.resources?.influence ?? 0;

  panel.innerHTML = `
    <div class="stats-row">
      <span class="stat-label">Area:</span>
      <span class="area-detail-value">${area.name}</span>
    </div>
    <div class="stats-row">
      <span class="stat-label">Level:</span>
      <span class="area-detail-value">Lv. ${area.level}</span>
    </div>
    <div class="stats-row">
      <span class="stat-label">Abbrev:</span>
      <span class="area-detail-value">${area.abbreviation}</span>
    </div>
    <div class="stats-row">
      <span class="stat-label">Buff:</span>
      <span class="area-detail-value">${formatBuff(area.buff)}</span>
    </div>
    <div class="stats-row">
      <span class="stat-label">Influence:</span>
      <span class="area-detail-value">${influence.toLocaleString()}</span>
    </div>
    <div class="stats-row">
      <span class="stat-label">Owner:</span>
      <span class="area-detail-value">${owner}</span>
    </div>
  `;
}

function getAreaById(areaId) {
  return mapAreas.find((entry) => entry.id === areaId) || null;
}

function hideMapTooltip() {
  if (!mapTooltip) return;
  mapTooltip.classList.remove("show");
}

function showMapTooltip(area, clientX, clientY) {
  if (!mapTooltip || !area) return;

  const owner = state.territories[area.id] || "Unassigned";
  const influence = area.resources?.influence ?? 0;

  mapTooltip.innerHTML = `
    <div class="map-tooltip-title">${area.name} (Lv. ${area.level})</div>
    <div>Buff: ${formatBuff(area.buff)}</div>
    <div>Influence: ${influence.toLocaleString()}</div>
    <div>Owner: ${owner}</div>
  `;

  const offset = 14;
  const maxLeft = window.innerWidth - 300;
  const maxTop = window.innerHeight - 140;
  const left = Math.max(10, Math.min(clientX + offset, maxLeft));
  const top = Math.max(10, Math.min(clientY + offset, maxTop));

  mapTooltip.style.left = `${left}px`;
  mapTooltip.style.top = `${top}px`;
  mapTooltip.classList.add("show");
}

const mapAreas = (TERRITORY_DATA || []).map((area) => ({
  id: area.id,
  name: area.name,
  abbreviation: getAreaAbbreviation(area.name),
  level: area.level,
  isCapitol: !!area.isCapitol,
  buff: area.buff,
  resources: area.resources,
  coordinates: area.coordinates,
}));

function renderMap() {
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = state.view.displayWidth || MAP_SIZE;
  const renderScale = Math.max((cssWidth / MAP_SIZE) * dpr, 1);

  canvas.width = Math.round(MAP_SIZE * renderScale);
  canvas.height = Math.round(MAP_SIZE * renderScale);
  ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

  ctx.fillStyle = "rgb(20, 20, 25)";
  ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

  // Dynamically scale text size if sidebar is hidden (map expanded) and with zoom
  let fontScale = 1;
  const sidebar = document.querySelector(".sidebar");
  if (sidebar && sidebar.style.display === "none") {
    fontScale *= 1.35; // Increase text size when expanded
  }
  // Further scale text size based on zoom level (default zoom=1)
  fontScale *= state.view.zoom || 1;
  const mapPx = (base) =>
    typeof mapTextPxForInteractiveMap === "function"
      ? mapTextPxForInteractiveMap(state, MAP_SIZE, base * fontScale)
      : Math.max(5, Math.round(base * fontScale));

  const showGrid = document.getElementById("showGrid").checked;
  const showLabels = document.getElementById("showLabels").checked;
  const showCities = document.getElementById("showCities").checked;

  // Always fill canvas with dark background before drawing
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = "#0a1420";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  // Draw territories
  mapAreas.forEach((area) => {
    const x = area.coordinates.x;
    const y = area.coordinates.y;
    const w = area.coordinates.width;
    const h = area.coordinates.height;

    const alliance = state.territories[area.id];
    const isCapitol = area.isCapitol;
    const isStronghold = area.name === "Stronghold";

    if (alliance) {
      const allianceObj = state.alliances.find((a) => a.tag === alliance);
      ctx.fillStyle =
        (allianceObj && allianceObj.color) ||
        allianceColors[0];
      ctx.globalAlpha = isCapitol ? 0.85 : 0.7;
    } else if (isCapitol) {
      ctx.fillStyle = "rgba(255, 215, 0, 0.1)";
      ctx.globalAlpha = 1.0;
    } else {
      ctx.fillStyle = "rgba(217, 240, 255, 0.16)";
      ctx.globalAlpha = 1.0;
    }

    ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
    ctx.globalAlpha = 1.0;

    // Border
    ctx.strokeStyle = isCapitol
      ? alliance
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(255, 215, 0, 0.85)"
      : alliance
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(43, 61, 81, 0.95)";
    ctx.lineWidth = isCapitol ? 2.5 : alliance ? 2 : 0.75;
    if (showGrid || alliance || isCapitol) {
      ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    }

    if (state.selectedAreaId === area.id) {
      ctx.strokeStyle = "rgba(116, 192, 252, 0.95)";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    }

    // Level badge colours: index = city level (1–6)
    const LEVEL_COLORS = [
      "",
      "rgba(160,180,200,0.85)", // L1 — outer ring, dim
      "rgba(120,195,225,0.9)", // L2
      "#74c0fc", // L3
      "#cd7f32", // L4 bronze
      "#c0c0c0", // L5 silver
      "#ffd700", // L6 gold
    ];

    // Capitol label — always visible
    if (isCapitol) {
      ctx.fillStyle = alliance
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(255, 215, 0, 0.95)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${mapPx(10)}px monospace`;
      ctx.fillText("ROYAL", x + w / 2, y + h / 2 - 13);
      ctx.fillText("PALACE", x + w / 2, y + h / 2);
      ctx.font = `${mapPx(9)}px monospace`;
      ctx.fillText("LV. 7", x + w / 2, y + h / 2 + 13);
    } else if (showCities && (!isStronghold || showLabels)) {
      const labelColor = alliance
        ? "rgba(255,255,255,0.95)"
        : LEVEL_COLORS[Math.min(area.level, 6)] ||
          "rgba(217,240,255,0.7)";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = labelColor;
      ctx.font =
        w >= 100 || h >= 100
          ? `bold ${mapPx(12)}px monospace`
          : `bold ${mapPx(8)}px monospace`;
      ctx.fillText(area.abbreviation, x + w / 2, y + h / 2 - 6);
      ctx.fillStyle = alliance
        ? "rgba(255,255,255,0.8)"
        : "rgba(217,240,255,0.55)";
      ctx.font =
        w >= 100 || h >= 100
          ? `${mapPx(10)}px monospace`
          : `${mapPx(7)}px monospace`;
      ctx.fillText(`LV ${area.level}`, x + w / 2, y + h / 2 + 8);
    } else if (showLabels) {
      ctx.fillStyle = "rgba(217, 240, 255, 0.6)";
      ctx.font = `${mapPx(9)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(area.name, x + w / 2, y + h / 2 - 5);
      ctx.fillText(area.id, x + w / 2, y + h / 2 + 7);
    }
  });

  if (window.LWStrategyPins && window.LWStrategyPins.draw) {
    window.LWStrategyPins.draw(ctx, MAP_SIZE);
  }
}

function getTerritoryAtPosition(x, y) {
  const rect = canvas.getBoundingClientRect();
  const canvasX = ((x - rect.left) / rect.width) * MAP_SIZE;
  const canvasY = ((y - rect.top) / rect.height) * MAP_SIZE;

  for (let i = mapAreas.length - 1; i >= 0; i--) {
    const area = mapAreas[i];
    const areaRight = area.coordinates.x + area.coordinates.width;
    const areaBottom = area.coordinates.y + area.coordinates.height;
    if (
      canvasX >= area.coordinates.x &&
      canvasX < areaRight &&
      canvasY >= area.coordinates.y &&
      canvasY < areaBottom
    ) {
      return area.id;
    }
  }

  return null;
}
function applyAllianceToTerritory(territory, mode = "toggle") {
  if (territory === null || territory === undefined) return false;

  state.selectedAreaId = territory;
  const current = state.territories[territory];

  if (!state.selectedAlliance) {
    return false;
  }

  if (mode === "assign") {
    if (current === state.selectedAlliance) return false;
    state.territories[territory] = state.selectedAlliance;
    if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
    return true;
  }

  if (mode === "erase") {
    if (current !== state.selectedAlliance) return false;
    delete state.territories[territory];
    if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
    return true;
  }

  if (current === state.selectedAlliance) {
    delete state.territories[territory];
  } else {
    state.territories[territory] = state.selectedAlliance;
  }

  return true;
}

function startPainting(clientX, clientY) {
  if (state.pinPlacementMode) {
    return;
  }
  if (!state.selectedAlliance) {
    return;
  }

  const territory = getTerritoryAtPosition(clientX, clientY);
  if (territory === null) {
    return;
  }

  state.paint.isPainting = true;
  state.paint.visited = new Set();
  state.paint.mode =
    state.territories[territory] === state.selectedAlliance
      ? "erase"
      : "assign";

  state.paint.visited.add(territory);
  if (applyAllianceToTerritory(territory, state.paint.mode)) {
    state.paint.justPainted = true;
  }

  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
}

function paintAt(clientX, clientY) {
  if (!state.paint.isPainting) {
    return;
  }

  const territory = getTerritoryAtPosition(clientX, clientY);
  if (territory === null || state.paint.visited.has(territory)) {
    return;
  }

  state.paint.visited.add(territory);
  if (applyAllianceToTerritory(territory, state.paint.mode)) {
    state.paint.justPainted = true;
    updateUI();
    renderMap();
    if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
  }
}

function stopPainting() {
  if (!state.paint.isPainting) {
    return;
  }

  state.paint.isPainting = false;
  state.paint.visited = new Set();
}

canvas.addEventListener("click", (e) => {
  if (state.paint.justPainted) {
    state.paint.justPainted = false;
    return;
  }

  if (state.view.dragHappened) {
    state.view.dragHappened = false;
    return;
  }

  if (
    window.LWStrategyPins &&
    window.LWStrategyPins.handleCanvasClick(e)
  ) {
    return;
  }

  const territory = getTerritoryAtPosition(e.clientX, e.clientY);
  if (territory === null) return;

  state.selectedAreaId = territory;

  if (!state.selectedAlliance) {
    updateSelectedAreaInfo();
    renderMap();
    return;
  }

  applyAllianceToTerritory(territory, "toggle");

  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
});

canvas.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;

  if (state.pinPlacementMode) {
    return;
  }

  if (state.selectedAlliance && !e.shiftKey) {
    startPainting(e.clientX, e.clientY);
    return;
  }

  state.view.isDragging = true;
  state.view.dragHappened = false;
  state.view.dragStartX = e.clientX;
  state.view.dragStartY = e.clientY;
  state.view.dragStartScrollLeft = mapCanvasWrapper.scrollLeft;
  state.view.dragStartScrollTop = mapCanvasWrapper.scrollTop;
  canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mousemove", (e) => {
  if (state.paint.isPainting) {
    hideMapTooltip();
    paintAt(e.clientX, e.clientY);
    return;
  }

  if (state.view.isDragging) {
    hideMapTooltip();
    return;
  }

  const territory = getTerritoryAtPosition(e.clientX, e.clientY);
  if (!territory) {
    hideMapTooltip();
    return;
  }

  const area = getAreaById(territory);
  if (!area) {
    hideMapTooltip();
    return;
  }

  showMapTooltip(area, e.clientX, e.clientY);
});

canvas.addEventListener("mouseleave", () => {
  hideMapTooltip();
});

document.addEventListener("mousemove", (e) => {
  if (!state.view.isDragging) return;
  const dx = e.clientX - state.view.dragStartX;
  const dy = e.clientY - state.view.dragStartY;
  if (!state.view.dragHappened && Math.hypot(dx, dy) < 5) return;
  state.view.dragHappened = true;
  mapCanvasWrapper.scrollLeft = state.view.dragStartScrollLeft - dx;
  mapCanvasWrapper.scrollTop = state.view.dragStartScrollTop - dy;
});

document.addEventListener("mouseup", () => {
  stopPainting();

  if (!state.view.isDragging) return;
  state.view.isDragging = false;
  canvas.style.cursor = "crosshair";
  hideMapTooltip();
});

mapCanvasWrapper.addEventListener(
  "wheel",
  (event) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    if (event.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  },
  { passive: false },
);

mapCanvasWrapper.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 2) {
      // Two fingers: start pinch zoom
      state.view.pinchStartDistance = getTouchDistance(
        event.touches[0],
        event.touches[1],
      );
      state.view.pinchStartZoom = state.view.zoom;
      // Cancel any in-progress single-touch pan
      state.view.touchPanStartX = null;
      state.view.touchPanStartY = null;
    } else if (event.touches.length === 1) {
      // One finger: start pan
      state.view.touchPanStartX = event.touches[0].clientX;
      state.view.touchPanStartY = event.touches[0].clientY;
      state.view.touchPanScrollLeft = mapCanvasWrapper.scrollLeft;
      state.view.touchPanScrollTop = mapCanvasWrapper.scrollTop;
    }
  },
  { passive: true },
);

mapCanvasWrapper.addEventListener(
  "touchmove",
  (event) => {
    if (
      event.touches.length === 2 &&
      state.view.pinchStartDistance !== null
    ) {
      // Pinch zoom
      event.preventDefault();
      const currentDistance = getTouchDistance(
        event.touches[0],
        event.touches[1],
      );
      const zoomRatio = currentDistance / state.view.pinchStartDistance;
      setZoom(state.view.pinchStartZoom * zoomRatio);
    } else if (
      event.touches.length === 1 &&
      state.view.touchPanStartX !== null
    ) {
      // Single-finger pan
      const dx = event.touches[0].clientX - state.view.touchPanStartX;
      const dy = event.touches[0].clientY - state.view.touchPanStartY;
      mapCanvasWrapper.scrollLeft = state.view.touchPanScrollLeft - dx;
      mapCanvasWrapper.scrollTop = state.view.touchPanScrollTop - dy;
    }
  },
  { passive: false },
);

mapCanvasWrapper.addEventListener("touchend", () => {
  state.view.pinchStartDistance = null;
  state.view.touchPanStartX = null;
  state.view.touchPanStartY = null;
});

mapCanvasWrapper.addEventListener("touchcancel", () => {
  state.view.pinchStartDistance = null;
  state.view.touchPanStartX = null;
  state.view.touchPanStartY = null;
});

function clearAllTerritories() {
  if (confirm("Clear all territories? This cannot be undone.")) {
    state.territories = {};
    updateUI();
    renderMap();
    if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
  }
}

function resetView() {
  mapCanvasWrapper.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  canvas.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showExportModal() {
  document.getElementById("exportModal").classList.add("show");
}

function getExportData() {
  return {
    version: "1.0",
    timestamp: new Date().toISOString(),
    alliances: state.alliances,
    territories: state.territories,
    strategyPins: state.strategyPins || [],
  };
}

function getExportFileName() {
  return `${cfg.exportFilePrefix}-${new Date().toISOString().split("T")[0]}`;
}

function exportAsJSON() {
  const data = getExportData();
  const json = JSON.stringify(data, null, 2);
  document.getElementById("exportText").value = json;
  document.getElementById("exportText").style.display = "block";
  document.getElementById("exportPreview").style.display = "block";
  document.getElementById("copyBtn").style.display = "block";
}

function exportAsExcel() {
  try {
    if (!window.XLSX) {
      alert(
        "Excel library is still loading. Please wait a moment and try again.",
      );
      return;
    }

    const data = getExportData();
    const wb = XLSX.utils.book_new();

    // Sheet 1: Alliances summary
    const alliancesData = data.alliances.map((a) => ({
      Alliance: a.tag,
      Color: a.color,
      TerritoryCount: Object.values(data.territories).filter(
        (t) => t === a.tag,
      ).length,
    }));

    if (alliancesData.length > 0) {
      const wsAlliances = XLSX.utils.json_to_sheet(alliancesData);
      XLSX.utils.book_append_sheet(wb, wsAlliances, "Alliances");
    }

    // Sheet 2: Territory mapping
    const territoriesData = Object.entries(data.territories).map((e) => ({
      AreaIndex: e[0],
      Alliance: e[1],
    }));

    if (territoriesData.length > 0) {
      const wsTerritories = XLSX.utils.json_to_sheet(territoriesData);
      XLSX.utils.book_append_sheet(wb, wsTerritories, "Territories");
    }

    // Sheet 3: Metadata
    const metaData = [
      { Key: "Export Date", Value: new Date().toLocaleString() },
      { Key: "Total Areas", Value: 386 },
      { Key: "Assigned Areas", Value: territoriesData.length },
      { Key: "Total Alliances", Value: data.alliances.length },
    ];
    const wsMeta = XLSX.utils.json_to_sheet(metaData);
    XLSX.utils.book_append_sheet(wb, wsMeta, "Summary");

    XLSX.writeFile(wb, `${getExportFileName()}.xlsx`);
    closeExportModal();
    alert("Exported to Excel successfully!");
  } catch (error) {
    console.error("Excel export error:", error);
    alert(
      "Failed to export to Excel: " +
        error.message +
        ". Please try PNG or PDF instead.",
    );
  }
}

function exportAsPNG() {
  try {
    html2canvas(document.getElementById("mapCanvas"), {
      backgroundColor: "rgb(20, 20, 25)",
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${getExportFileName()}.png`;
      link.click();
      closeExportModal();
      alert("Map exported as PNG successfully!");
    });
  } catch (error) {
    console.error("PNG export error:", error);
    alert("Failed to export as PNG: " + error.message);
  }
}

function exportAsPDF() {
  try {
    html2canvas(document.getElementById("mapCanvas"), {
      backgroundColor: "rgb(20, 20, 25)",
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 15, 15, imgWidth, imgHeight);

      // Add metadata
      const data = getExportData();
      pdf.setFontSize(10);
      pdf.setTextColor(150);
      pdf.text(
        `Exported: ${new Date().toLocaleString()}`,
        15,
        pdf.internal.pageSize.height - 15,
      );
      pdf.text(
        `Alliances: ${data.alliances.length} | Assigned: ${Object.keys(data.territories).length}`,
        15,
        pdf.internal.pageSize.height - 10,
      );

      pdf.save(`${getExportFileName()}.pdf`);
      closeExportModal();
      alert("Map exported as PDF successfully!");
    });
  } catch (error) {
    console.error("PDF export error:", error);
    alert("Failed to export as PDF: " + error.message);
  }
}

function closeExportModal() {
  document.getElementById("exportModal").classList.remove("show");
  document.getElementById("exportText").style.display = "none";
  document.getElementById("exportPreview").style.display = "none";
  document.getElementById("copyBtn").style.display = "none";
}

function showImportModal() {
  document.getElementById("importText").value = "";
  document.getElementById("importModal").classList.add("show");
}

function closeImportModal() {
  document.getElementById("importModal").classList.remove("show");
}

function importPlan() {
  try {
    const data = JSON.parse(document.getElementById("importText").value);

    if (!data.alliances || !data.territories) {
      throw new Error("Invalid plan format");
    }

    state.alliances = data.alliances;
    state.territories = data.territories;
    state.selectedAlliance = null;
    state.strategyPins = Array.isArray(data.strategyPins)
      ? data.strategyPins
      : [];
    state.selectedPinId = null;
    syncSharedAllianceTagsFromState();

    closeImportModal();
    updateUI();
    renderMap();
    if (
      window.LWStrategyPins &&
      typeof window.LWStrategyPins.updatePinsList === "function"
    ) {
      window.LWStrategyPins.updatePinsList();
    }
    if (typeof saveInteractiveMapTabs === "function") {
      saveInteractiveMapTabs();
    }
  } catch (e) {
    alert("Invalid import data: " + e.message);
  }
}

function copyToClipboard() {
  const text = document.getElementById("exportText");
  text.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}

// Language selection
document
  .getElementById("languageSelect")
  .addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("selectedLanguage", lang);

    const googleTranslateElement = document.getElementById(
      "google_translate_element",
    );
    if (
      googleTranslateElement &&
      window.google &&
      window.google.translate
    ) {
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,pt,ru,ja,zh-CN",
        },
        "google_translate_element",
      );

      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      }
    }
  });

// Load saved language preference
const savedLang = localStorage.getItem("selectedLanguage");
if (savedLang) {
  document.getElementById("languageSelect").value = savedLang;
}

// Google Translate
window.addEventListener("load", () => {
  const script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
});

window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,es,fr,de,pt,ru,ja,zh-CN",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element",
  );
};

initAllianceManagerUi();
setupAllianceListActions();
// Always load alliances from shared storage on page load
loadAllianceTagsForSeason();
// Initial render (multi-tab map slots)
initInteractiveMapTabs({
  storageKey: cfg.tabsStorageKey,
  state: state,
  mapCanvasWrapper: mapCanvasWrapper,
  loadAllianceTagsForSeason: loadAllianceTagsForSeason,
  updateUI: updateUI,
  renderMap: renderMap,
  updateCanvasDisplay: updateCanvasDisplay,
  setZoom: setZoom,
  syncSharedAllianceTagsFromState: syncSharedAllianceTagsFromState,
});

// Listen for alliance changes in other tabs
window.addEventListener("storage", function (e) {
  if (e.key === SHARED_ALLIANCE_TAGS_KEY) {
    loadAllianceTagsForSeason();
    updateUI();
    renderMap();
  }
});

// After adding/removing alliances, reload from shared storage
const origAddAlliance = addAlliance;
window.addAlliance = function () {
  origAddAlliance();
  loadAllianceTagsForSeason();
  updateUI();
  renderMap();
  if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
};
const origRemoveAlliance = removeAlliance;
window.removeAlliance = function (tag) {
  origRemoveAlliance(tag);
  if (!state.alliances.some((a) => a.tag === tag)) {
    loadAllianceTagsForSeason();
    updateUI();
    renderMap();
    if (typeof syncLocalMapChanges === "function") syncLocalMapChanges();
  }
};
window.editAlliance = editAlliance;
window.setAllianceColor = setAllianceColor;

if (typeof LWStrategyPinsInit === "function") {
  LWStrategyPinsInit({
    state: state,
    canvas: canvas,
    mapSize: MAP_SIZE,
    renderMap: renderMap,
  });
}

// Sidebar hide/show toggle
document.addEventListener("DOMContentLoaded", function () {
  const hideSidebarBtn = document.getElementById("hideSidebarBtn");
  const sidebar = hideSidebarBtn && hideSidebarBtn.closest(".sidebar");
  const mapCanvasWrapper = document.getElementById("mapCanvasWrapper");
  const mapContainer = document.getElementById("mapTabPanel");
  if (hideSidebarBtn && sidebar && mapCanvasWrapper && mapContainer) {
    // Store original grid template for restoration
    const originalGrid =
      mapContainer.style.gridTemplateColumns ||
      window.getComputedStyle(mapContainer).gridTemplateColumns;
    hideSidebarBtn.addEventListener("click", function () {
      if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
        hideSidebarBtn.textContent = "Hide";
        // Restore map container grid
        mapContainer.style.gridTemplateColumns = originalGrid;
        // Restore mapCanvasWrapper width if changed
        mapCanvasWrapper.style.width = "";
        mapCanvasWrapper.style.flex = "";
        const showBtn = document.getElementById("showSidebarBtn");
        if (showBtn) showBtn.remove();
        // Update map size
        updateCanvasDisplay();
        renderMap();
      } else {
        sidebar.style.display = "none";
        // Expand map to fill area
        mapContainer.style.gridTemplateColumns = "1fr";
        mapCanvasWrapper.style.width = "100%";
        mapCanvasWrapper.style.flex = "1 1 100%";
        // Add a show button at the top right inside map-container
        let showBtn = document.getElementById("showSidebarBtn");
        if (!showBtn) {
          showBtn = document.createElement("button");
          showBtn.id = "showSidebarBtn";
          showBtn.className = "btn-small";
          showBtn.textContent = "Show";
          showBtn.style.position = "absolute";
          showBtn.style.top = "16px";
          showBtn.style.right = "16px";
          showBtn.style.transform = "none";
          showBtn.style.zIndex = 2000;
          // Place the button relative to the map-container
          mapContainer.style.position = "relative";
          mapContainer.appendChild(showBtn);
          // Restore mapCanvasWrapper to full width
          mapCanvasWrapper.style.width = "100%";
          showBtn.addEventListener("click", function () {
            sidebar.style.display = "block";
            hideSidebarBtn.textContent = "Hide";
            mapContainer.style.gridTemplateColumns = originalGrid;
            mapCanvasWrapper.style.width = "";
            mapCanvasWrapper.style.flex = "";
            showBtn.remove();
            updateCanvasDisplay();
            renderMap();
          });
        }
        updateCanvasDisplay();
        renderMap();
      }
    });
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  updateCanvasDisplay();
  renderMap();
});

// ESC to close modals and keyboard zoom shortcuts
document.addEventListener("keydown", (e) => {
  const targetTag = e.target.tagName;
  const isTypingTarget =
    targetTag === "INPUT" ||
    targetTag === "TEXTAREA" ||
    targetTag === "SELECT" ||
    e.target.isContentEditable;

  if (e.key === "Escape") {
    closeExportModal();
    closeImportModal();
    const pm = document.getElementById("strategyPinModal");
    if (pm) {
      pm.classList.remove("show");
    }
    return;
  }

  if (isTypingTarget) {
    return;
  }

  if (e.key === "+" || e.key === "=") {
    e.preventDefault();
    zoomIn();
    return;
  }

  if (e.key === "-" || e.key === "_") {
    e.preventDefault();
    zoomOut();
    return;
  }

  if (e.key === "0") {
    e.preventDefault();
    resetZoom();
  }
});

    global.state = state;
    global.updateUI = updateUI;
    global.renderMap = renderMap;

    const pageApi = {
      clearAllTerritories,
      resetView,
      showExportModal,
      zoomIn,
      zoomOut,
      resetZoom,
      exportAsJSON,
      exportAsExcel,
      exportAsPNG,
      exportAsPDF,
      closeExportModal,
      showImportModal,
      closeImportModal,
      importPlan,
      copyToClipboard,
      selectAlliance,
      removeAlliance,
      editAlliance,
      setAllianceColor,
      pickAllianceColor,
    };
    for (const key of Object.keys(pageApi)) {
      global[key] = pageApi[key];
    }

    if (typeof global.initMapLiveSync === "function") {
      global.initMapLiveSync({
        logTag: cfg.logTag,
        rtdbPath: cfg.rtdbPath,
        getState: function () { return state; },
        onApplyRemote: function () {
          updateUI();
          renderMap();
          if (
            global.LWStrategyPins &&
            typeof global.LWStrategyPins.updatePinsList === "function"
          ) {
            global.LWStrategyPins.updatePinsList();
          }
        },
      });
    }
    if (typeof global.initMapMediaImport === "function") {
      global.initMapMediaImport();
    }
  }

  global.bootInteractiveMap = bootInteractiveMap;
})(typeof window !== "undefined" ? window : globalThis);
