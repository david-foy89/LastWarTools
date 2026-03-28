/**
 * Strategy pins on interactive maps: placement, optional target time or countdown,
 * drawing on canvas, sidebar list. Requires LWStrategyPins.init() after state/canvas exist.
 */
(function (global) {
  "use strict";

  /**
   * Scale label font sizes so on-screen text stays readable when the map is
   * zoomed (canvas CSS width uses displayWidth = baseWidth × zoom).
   */
  function computeMapTextPx(state, mapSize, basePx) {
    var dW = state.view && state.view.displayWidth;
    if (!dW || dW <= 0) {
      dW = mapSize;
    }
    var comp = mapSize / Math.max(160, dW);
    comp = Math.max(0.45, Math.min(2.35, comp));
    return Math.max(5, Math.round(basePx * comp));
  }

  global.mapTextPxForInteractiveMap = computeMapTextPx;

  function ensurePins(state) {
    if (!Array.isArray(state.strategyPins)) {
      state.strategyPins = [];
    }
  }

  function formatRemaining(iso) {
    if (!iso) {
      return "";
    }
    var t = new Date(iso).getTime();
    if (Number.isNaN(t)) {
      return "";
    }
    var diff = t - Date.now();
    if (diff <= 0) {
      return "Due";
    }
    var s = Math.floor(diff / 1000);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    if (h > 48) {
      var d = Math.floor(h / 24);
      return d + "d " + (h % 24) + "h";
    }
    if (h > 0) {
      return h + "h " + m + "m";
    }
    if (m > 0) {
      return m + "m " + sec + "s";
    }
    return sec + "s";
  }

  var LS_STRATEGY_TZ = "lwStrategyPinsTimezone";
  var LS_PROFILE_TZ = "lwProfileTimezone";

  function getStrategyPinsTimezone() {
    try {
      var sel = document.getElementById("strategyPinTimezone");
      if (sel && sel.value) {
        return sel.value;
      }
    } catch (e) {
      /* ignore */
    }
    try {
      var raw = localStorage.getItem(LS_STRATEGY_TZ);
      if (raw && raw.length) {
        return raw;
      }
      raw = localStorage.getItem(LS_PROFILE_TZ);
      if (raw && raw.length) {
        return raw;
      }
    } catch (e2) {
      /* ignore */
    }
    try {
      if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
        var z = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (z) {
          return z;
        }
      }
    } catch (e3) {
      /* ignore */
    }
    return "UTC";
  }

  function getWallClockInZone(ms, timeZone) {
    var f = new Intl.DateTimeFormat("en-GB", {
      timeZone: timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    });
    var o = {};
    f.formatToParts(new Date(ms)).forEach(function (p) {
      if (p.type !== "literal") {
        o[p.type] = p.value;
      }
    });
    return {
      y: +o.year,
      mo: +o.month,
      d: +o.day,
      h: +o.hour,
      min: +o.minute,
    };
  }

  function zonedWallToUtcIso(y, mo, d, h, min, timeZone) {
    if (typeof Temporal !== "undefined") {
      try {
        var pdt = Temporal.PlainDateTime.from({
          year: y,
          month: mo,
          day: d,
          hour: h,
          minute: min,
        });
        return pdt.toZonedDateTime(timeZone).toInstant().toString();
      } catch (e) {
        /* fall through */
      }
    }
    var center = Date.UTC(y, mo - 1, d, h, min, 0);
    var start = center - 48 * 3600 * 1000;
    var end = center + 48 * 3600 * 1000;
    for (var guess = start; guess <= end; guess += 60000) {
      var w = getWallClockInZone(guess, timeZone);
      if (w.y === y && w.mo === mo && w.d === d && w.h === h && w.min === min) {
        return new Date(guess).toISOString();
      }
    }
    return new Date(center).toISOString();
  }

  function isoToDatetimeLocalInZone(iso, timeZone) {
    if (!iso) {
      return "";
    }
    var ms = new Date(iso).getTime();
    if (Number.isNaN(ms)) {
      return "";
    }
    var w = getWallClockInZone(ms, timeZone);
    var pad = function (n) {
      return (n < 10 ? "0" : "") + n;
    };
    return (
      w.y +
      "-" +
      pad(w.mo) +
      "-" +
      pad(w.d) +
      "T" +
      pad(w.h) +
      ":" +
      pad(w.min)
    );
  }

  function populateStrategyPinTimezoneSelect() {
    var sel = document.getElementById("strategyPinTimezone");
    if (!sel) {
      return;
    }
    var zones = [];
    try {
      if (typeof Intl !== "undefined" && Intl.supportedValuesOf) {
        zones = Intl.supportedValuesOf("timeZone");
      }
    } catch (e) {
      zones = [];
    }
    if (!zones.length) {
      zones = [
        "UTC",
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Los_Angeles",
        "Europe/London",
        "Europe/Paris",
        "Asia/Tokyo",
        "Asia/Shanghai",
        "Australia/Sydney",
      ];
    }
    zones = zones.slice().sort();
    var current = getStrategyPinsTimezone();
    sel.innerHTML = "";
    zones.forEach(function (z) {
      var o = document.createElement("option");
      o.value = z;
      o.textContent = z;
      sel.appendChild(o);
    });
    if (zones.indexOf(current) < 0) {
      var orphan = document.createElement("option");
      orphan.value = current;
      orphan.textContent = current;
      sel.insertBefore(orphan, sel.firstChild);
    }
    sel.value = current;
  }

  function persistStrategyPinTimezone(value) {
    try {
      localStorage.setItem(LS_STRATEGY_TZ, value);
    } catch (e) {
      /* ignore */
    }
  }

  function wireStrategyPinTimezoneSelect() {
    var sel = document.getElementById("strategyPinTimezone");
    if (!sel || sel.dataset.lwWired) {
      return;
    }
    sel.dataset.lwWired = "1";
    sel.addEventListener("change", function () {
      persistStrategyPinTimezone(sel.value);
      var modal = document.getElementById("strategyPinModal");
      var id = modal && modal.dataset.editingId;
      if (!id || !optsRef) {
        updatePinsList();
        if (optsRef) {
          optsRef.renderMap();
        }
        return;
      }
      var state = optsRef.state;
      ensurePins(state);
      var pin = state.strategyPins.find(function (p) {
        return p.id === id;
      });
      var targetEl = document.getElementById("strategyPinTarget");
      if (pin && pin.targetTime && targetEl) {
        targetEl.value = isoToDatetimeLocalInZone(pin.targetTime, sel.value);
      }
      updatePinsList();
      optsRef.renderMap();
    });
  }

  function formatTargetLocal(iso) {
    if (!iso) {
      return "";
    }
    var d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return "";
    }
    var tz = getStrategyPinsTimezone();
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    });
  }

  var tickTimer = null;
  var optsRef = null;

  function saveTabs() {
    if (typeof global.saveInteractiveMapTabs === "function") {
      global.saveInteractiveMapTabs();
    }
  }

  function updatePinsList() {
    var el = document.getElementById("strategyPinsList");
    if (!el || !optsRef) {
      return;
    }
    var state = optsRef.state;
    ensurePins(state);
    var pins = state.strategyPins;
    if (pins.length === 0) {
      el.innerHTML =
        '<div class="strategy-pins-empty">No pins yet. Enable placement mode and click the map, or use Add pin.</div>';
      return;
    }
    el.innerHTML = pins
      .map(function (p) {
        var sel = state.selectedPinId === p.id ? " strategy-pin-item-selected" : "";
        var timeLine = "";
        if (p.targetTime) {
          timeLine =
            '<div class="strategy-pin-time">' +
            formatRemaining(p.targetTime) +
            " · " +
            formatTargetLocal(p.targetTime) +
            "</div>";
        } else {
          timeLine = '<div class="strategy-pin-time muted">No timer</div>';
        }
        var markCh = markDisplayChar(p.mark);
        var tagLine =
          (p.allianceTag ? escapeHtml(p.allianceTag) + " · " : "") +
          "<strong>" +
          escapeHtml(markCh) +
          "</strong>";
        return (
          '<div class="strategy-pin-item' +
          sel +
          '" data-pin-id="' +
          p.id +
          '">' +
          '<div class="strategy-pin-item-title">' +
          escapeHtml((p.label || "Pin").slice(0, 40)) +
          "</div>" +
          '<div class="strategy-pin-meta">' +
          tagLine +
          "</div>" +
          timeLine +
          "</div>"
        );
      })
      .join("");

    el.querySelectorAll(".strategy-pin-item").forEach(function (node) {
      node.addEventListener("click", function () {
        var id = node.getAttribute("data-pin-id");
        state.selectedPinId = id;
        updatePinsList();
        optsRef.renderMap();
        openPinModal(id);
      });
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeMark(mark) {
    var m = String(mark || "1").toLowerCase();
    if (m === "attack") {
      return "attack";
    }
    if (m === "defend") {
      return "defend";
    }
    if (/^[1-9]$/.test(m)) {
      return m;
    }
    return "1";
  }

  function markDisplayChar(mark) {
    var m = normalizeMark(mark);
    if (m === "attack") {
      return "A";
    }
    if (m === "defend") {
      return "D";
    }
    return m;
  }

  function parseHexColor(hex) {
    var s = String(hex || "").trim();
    if (s[0] === "#") {
      s = s.slice(1);
    }
    if (s.length === 3) {
      s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
    }
    if (!/^[0-9a-fA-F]{6}$/.test(s)) {
      return null;
    }
    return {
      r: parseInt(s.slice(0, 2), 16),
      g: parseInt(s.slice(2, 4), 16),
      b: parseInt(s.slice(4, 6), 16),
    };
  }

  function rgbToHex(rgb) {
    return (
      "#" +
      [rgb.r, rgb.g, rgb.b]
        .map(function (n) {
          return Math.max(0, Math.min(255, Math.round(n)))
            .toString(16)
            .padStart(2, "0");
        })
        .join("")
    );
  }

  function mixToward(rgb, toward255, amount) {
    var t = Math.max(0, Math.min(1, amount));
    var end = toward255 ? 255 : 0;
    return {
      r: rgb.r + (end - rgb.r) * t,
      g: rgb.g + (end - rgb.g) * t,
      b: rgb.b + (end - rgb.b) * t,
    };
  }

  function allianceColorForPin(pin, state) {
    var tag = String((pin && pin.allianceTag) || "")
      .trim()
      .toUpperCase();
    if (!tag) {
      return "#868e96";
    }
    var a = state.alliances.find(function (x) {
      return x.tag === tag;
    });
    return a && a.color ? a.color : "#868e96";
  }

  function fillAllianceDropdown(state, selectedTag) {
    var sel = document.getElementById("strategyPinAlliance");
    if (!sel) {
      return;
    }
    var tag = String(selectedTag || "").trim().toUpperCase();
    sel.innerHTML = "";
    var none = document.createElement("option");
    none.value = "";
    none.textContent = "None (neutral gray)";
    sel.appendChild(none);
    state.alliances.forEach(function (a) {
      var o = document.createElement("option");
      o.value = a.tag;
      o.textContent = a.tag;
      sel.appendChild(o);
    });
    if (
      tag &&
      !state.alliances.some(function (a) {
        return a.tag === tag;
      })
    ) {
      var orphan = document.createElement("option");
      orphan.value = tag;
      orphan.textContent = tag + " (not in list)";
      sel.appendChild(orphan);
    }
    sel.value = tag || "";
  }

  function openPinModal(pinId) {
    var modal = document.getElementById("strategyPinModal");
    var state = optsRef.state;
    ensurePins(state);
    var pin = state.strategyPins.find(function (p) {
      return p.id === pinId;
    });
    if (!modal || !pin) {
      return;
    }
    modal.classList.add("show");
    document.getElementById("strategyPinModalTitle").textContent =
      "Strategy pin";
    fillAllianceDropdown(state, pin.allianceTag || "");
    document.getElementById("strategyPinLabel").value = pin.label || "";
    document.getElementById("strategyPinNote").value = pin.note || "";
    var markSel = document.getElementById("strategyPinMark");
    if (markSel) {
      markSel.value = normalizeMark(pin.mark);
    }
    var tzForPin = getStrategyPinsTimezone();
    document.getElementById("strategyPinTarget").value = pin.targetTime
      ? isoToDatetimeLocalInZone(pin.targetTime, tzForPin)
      : "";
    document.getElementById("strategyPinTimerMins").value = "";
    modal.dataset.editingId = pinId;
  }

  function closePinModal() {
    var modal = document.getElementById("strategyPinModal");
    if (modal) {
      modal.classList.remove("show");
    }
  }

  function applyPinModalSave() {
    if (!optsRef) {
      return;
    }
    var modal = document.getElementById("strategyPinModal");
    var id = modal && modal.dataset.editingId;
    if (!id) {
      return;
    }
    var state = optsRef.state;
    ensurePins(state);
    var pin = state.strategyPins.find(function (p) {
      return p.id === id;
    });
    if (!pin) {
      closePinModal();
      return;
    }
    pin.label = String(document.getElementById("strategyPinLabel").value || "")
      .trim()
      .slice(0, 80);
    pin.note = String(document.getElementById("strategyPinNote").value || "").slice(
      0,
      2000,
    );
    var allianceEl = document.getElementById("strategyPinAlliance");
    var at = allianceEl
      ? String(allianceEl.value || "").trim().toUpperCase()
      : "";
    pin.allianceTag = at || null;
    var markEl = document.getElementById("strategyPinMark");
    pin.mark = markEl ? normalizeMark(markEl.value) : "1";
    var dt = document.getElementById("strategyPinTarget").value;
    var mins = parseInt(
      String(document.getElementById("strategyPinTimerMins").value || ""),
      10,
    );
    var tzSave = getStrategyPinsTimezone();
    if (dt) {
      var m = dt.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
      if (m) {
        pin.targetTime = zonedWallToUtcIso(
          +m[1],
          +m[2],
          +m[3],
          +m[4],
          +m[5],
          tzSave,
        );
      } else {
        pin.targetTime = new Date(dt).toISOString();
      }
    } else if (!Number.isNaN(mins) && mins > 0) {
      pin.targetTime = new Date(Date.now() + mins * 60000).toISOString();
    } else {
      pin.targetTime = null;
    }
    var tzEl = document.getElementById("strategyPinTimezone");
    if (tzEl && tzEl.value) {
      persistStrategyPinTimezone(tzEl.value);
    }
    updatePinsList();
    optsRef.renderMap();
    saveTabs();
    closePinModal();
  }

  function deletePinFromModal() {
    if (!optsRef) {
      return;
    }
    var modal = document.getElementById("strategyPinModal");
    var id = modal && modal.dataset.editingId;
    if (!id) {
      return;
    }
    var state = optsRef.state;
    ensurePins(state);
    state.strategyPins = state.strategyPins.filter(function (p) {
      return p.id !== id;
    });
    if (state.selectedPinId === id) {
      state.selectedPinId = null;
    }
    updatePinsList();
    optsRef.renderMap();
    saveTabs();
    closePinModal();
  }

  function findPinAt(clientX, clientY, state, canvas, mapSize) {
    var rect = canvas.getBoundingClientRect();
    var mx = ((clientX - rect.left) / rect.width) * mapSize;
    var my = ((clientY - rect.top) / rect.height) * mapSize;
    var hitR = 23;
    ensurePins(state);
    for (var i = state.strategyPins.length - 1; i >= 0; i--) {
      var p = state.strategyPins[i];
      if (Math.hypot(mx - p.x, my - p.y) <= hitR) {
        return p;
      }
    }
    return null;
  }

  function clientToMap(clientX, clientY, canvas, mapSize) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * mapSize,
      y: ((clientY - rect.top) / rect.height) * mapSize,
    };
  }

  function drawPins(ctx, mapSize, state) {
    ensurePins(state);
    var pins = state.strategyPins;
    if (!pins.length) {
      return;
    }
    var mpx = computeMapTextPx;
    ctx.save();
    pins.forEach(function (pin) {
      var x = pin.x;
      var y = pin.y;
      var isSel = state.selectedPinId === pin.id;
      var scale = mpx(state, mapSize, 13) / 13;
      scale = Math.max(0.6, Math.min(1.2, scale));
      var r = Math.round((isSel ? 9 : 7) * scale);
      var fill = allianceColorForPin(pin, state);
      var rgb = parseHexColor(fill);

      if (isSel) {
        ctx.beginPath();
        ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(116, 192, 252, 0.22)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(116, 192, 252, 0.95)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      if (rgb) {
        var light = rgbToHex(mixToward(rgb, true, 0.42));
        var dark = rgbToHex(mixToward(rgb, false, 0.28));
        var grd = ctx.createRadialGradient(
          x - r * 0.38,
          y - r * 0.42,
          r * 0.12,
          x,
          y,
          r,
        );
        grd.addColorStop(0, light);
        grd.addColorStop(0.55, fill);
        grd.addColorStop(1, dark);
        ctx.fillStyle = grd;
      } else {
        ctx.fillStyle = fill;
      }

      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r - 1.2, Math.PI * 1.12, Math.PI * 1.88);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      var ch = markDisplayChar(pin.mark);
      var glyphPx = mpx(state, mapSize, 17);
      ctx.font =
        'bold ' +
        glyphPx +
        'px "Segoe UI", "Roboto", system-ui, -apple-system, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = Math.max(2, Math.round(glyphPx * 0.18));
      ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
      ctx.fillStyle = "#ffffff";
      ctx.strokeText(ch, x, y);
      ctx.fillText(ch, x, y);

      ctx.font = "bold " + mpx(state, mapSize, 9) + "px monospace";
      ctx.textBaseline = "top";
      ctx.lineWidth = 1;
      var label = (pin.label || "").trim();
      if (label) {
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.strokeStyle = "rgba(0,0,0,0.55)";
        var short = label.slice(0, 18);
        var yLabel = y + r + Math.max(4, Math.round(5 * scale));
        ctx.strokeText(short, x, yLabel);
        ctx.fillText(short, x, yLabel);
      }
      if (pin.targetTime) {
        ctx.font = 'bold ' + mpx(state, mapSize, 17) + "px monospace";
        ctx.fillStyle = "#c5e7ff";
        ctx.strokeStyle = "rgba(0,0,0,0.45)";
        var rem = formatRemaining(pin.targetTime);
        var ty =
          y +
          r +
          (label ? Math.max(16, Math.round(19 * scale)) : Math.max(7, Math.round(8 * scale)));
        ctx.strokeText(rem, x, ty);
        ctx.fillText(rem, x, ty);
      }
    });
    ctx.restore();
  }

  function startTickIfNeeded() {
    if (tickTimer) {
      clearInterval(tickTimer);
      tickTimer = null;
    }
    if (!optsRef) {
      return;
    }
    tickTimer = setInterval(function () {
      if (!optsRef) {
        return;
      }
      var hasTimer = optsRef.state.strategyPins.some(function (p) {
        return p.targetTime;
      });
      if (hasTimer) {
        optsRef.renderMap();
        updatePinsList();
      }
    }, 1000);
  }

  function init(opts) {
    optsRef = opts;
    var state = opts.state;
    var canvas = opts.canvas;
    var mapSize = opts.mapSize;
    ensurePins(state);

    populateStrategyPinTimezoneSelect();
    wireStrategyPinTimezoneSelect();

    var placementCb = document.getElementById("strategyPinPlacement");
    if (placementCb) {
      placementCb.addEventListener("change", function () {
        state.pinPlacementMode = placementCb.checked;
        canvas.style.cursor = state.pinPlacementMode ? "cell" : "crosshair";
        opts.renderMap();
      });
    }

    document.getElementById("strategyPinAddBtn") &&
      document
        .getElementById("strategyPinAddBtn")
        .addEventListener("click", function () {
          var rect = canvas.getBoundingClientRect();
          var c = clientToMap(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            canvas,
            mapSize,
          );
          addPinAt(c.x, c.y);
        });

    document.getElementById("strategyPinClearBtn") &&
      document
        .getElementById("strategyPinClearBtn")
        .addEventListener("click", function () {
          if (
            state.strategyPins.length &&
            confirm("Remove all strategy pins on this map?")
          ) {
            state.strategyPins = [];
            state.selectedPinId = null;
            updatePinsList();
            opts.renderMap();
            saveTabs();
          }
        });

    document.getElementById("strategyPinModalSave") &&
      document
        .getElementById("strategyPinModalSave")
        .addEventListener("click", applyPinModalSave);
    document.getElementById("strategyPinModalDelete") &&
      document
        .getElementById("strategyPinModalDelete")
        .addEventListener("click", deletePinFromModal);
    document.getElementById("strategyPinModalCancel") &&
      document
        .getElementById("strategyPinModalCancel")
        .addEventListener("click", closePinModal);

    function addPinAt(mx, my) {
      var id =
        "pin-" +
        Date.now() +
        "-" +
        Math.random().toString(36).slice(2, 8);
      ensurePins(state);
      state.strategyPins.push({
        id: id,
        x: mx,
        y: my,
        label: "Pin " + state.strategyPins.length,
        note: "",
        targetTime: null,
        allianceTag: null,
        mark: "1",
      });
      state.selectedPinId = id;
      updatePinsList();
      opts.renderMap();
      saveTabs();
      openPinModal(id);
    }

    global.LWStrategyPins = {
      mapSize: mapSize,
      findPinAt: function (clientX, clientY) {
        return findPinAt(clientX, clientY, state, canvas, mapSize);
      },
      addPinAt: addPinAt,
      draw: function (ctx, ms) {
        drawPins(ctx, ms, state);
      },
      handleCanvasClick: function (e) {
        if (!state.pinPlacementMode) {
          var hit = findPinAt(e.clientX, e.clientY, state, canvas, mapSize);
          if (hit) {
            state.selectedPinId = hit.id;
            updatePinsList();
            opts.renderMap();
            openPinModal(hit.id);
            return true;
          }
          return false;
        }
        var hitPl = findPinAt(e.clientX, e.clientY, state, canvas, mapSize);
        if (hitPl) {
          state.selectedPinId = hitPl.id;
          updatePinsList();
          opts.renderMap();
          openPinModal(hitPl.id);
          return true;
        }
        var pos = clientToMap(e.clientX, e.clientY, canvas, mapSize);
        addPinAt(pos.x, pos.y);
        return true;
      },
      updatePinsList: updatePinsList,
    };

    updatePinsList();
    startTickIfNeeded();
    opts.renderMap();
  }

  global.LWStrategyPinsInit = init;
})(typeof window !== "undefined" ? window : globalThis);
