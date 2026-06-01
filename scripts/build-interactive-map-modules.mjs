/**
 * Extracts shared interactive map JS from season-1 and updates all season HTML files.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const srcPath = path.join(root, "season-1-interactive-map.html");
const html = fs.readFileSync(srcPath, "utf8");
const lines = html.split(/\r?\n/);

function extractScriptBody(startLine, endLine) {
  const chunk = lines.slice(startLine - 1, endLine).join("\n");
  const m = chunk.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
  if (!m) throw new Error(`No script body between ${startLine}-${endLine}`);
  return m[1].replace(/^\n/, "").replace(/\n$/, "");
}

const liveBody = extractScriptBody(1487, 2207);
const importAndEngine = extractScriptBody(2209, 3955);
const importEndMarker = "      // Initialize map data";
const splitIdx = importAndEngine.indexOf(importEndMarker);
if (splitIdx < 0) throw new Error("Could not split import vs engine");
const importBody = importAndEngine.slice(0, splitIdx).trimEnd();
let engineBody = importAndEngine.slice(splitIdx).trimStart();

function dedent6(s) {
  return s
    .split("\n")
    .map((line) => (line.startsWith("      ") ? line.slice(6) : line))
    .join("\n");
}

const liveInner = dedent6(liveBody)
  .replace(
    /const MAP_LIVE_LOG = "\[Season 1 Map\]";/,
    "const MAP_LIVE_LOG = opts.logTag || \"[Map Live]\";",
  )
  .replace(
    /`season1-map\/\$\{shareId\}`/g,
    "`${RTDB_MAP_ROOT}/${shareId}`",
  )
  .replace(/window\.__lwMapS1BadAppCheckKeyWarned/g, "window.__lwMapBadAppCheckKeyWarned");

const liveJs = `/**
 * Firebase RTDB live sync for interactive season maps.
 */
(function (global) {
  "use strict";

  function initMapLiveSync(opts) {
    opts = opts || {};
    const RTDB_MAP_ROOT = opts.rtdbPath || "season1-map";
    const getState = opts.getState || function () { return {}; };

${liveInner}

    global.applyLiveMapPayload = applyLiveMapPayload;
    global.pushLiveMapState = pushLiveMapState;
    global.syncLocalMapChanges = syncLocalMapChanges;

    function patchPayloadHelpers() {
      const _get = getLiveMapPayload;
      getLiveMapPayload = function () {
        const payload = _get();
        if (opts.getState) {
          const s = getState();
          payload.alliances = s.alliances;
          payload.territories = s.territories;
          payload.selectedAlliance = s.selectedAlliance;
          payload.strategyPins = s.strategyPins;
        }
        return payload;
      };
    }
    patchPayloadHelpers();
  }

  global.initMapLiveSync = initMapLiveSync;
})(typeof window !== "undefined" ? window : globalThis);
`;

// Simpler: replace state references in getLiveMapPayload inside liveInner - the original uses `state` directly.
// initMapLiveSync runs inside boot AFTER state exists - but state is local to boot scope.
// So we must pass getState and rewrite getLiveMapPayload/applyLiveMapPayload in liveInner.

const liveJsFixed = `/**
 * Firebase RTDB live sync for interactive season maps.
 */
(function (global) {
  "use strict";

  function initMapLiveSync(opts) {
    opts = opts || {};
    const RTDB_MAP_ROOT = opts.rtdbPath || "season1-map";
    const getState = opts.getState || function () { return {}; };
    const onApply = opts.onApplyRemote;

${liveInner
  .replace(
    /function getLiveMapPayload\(\) \{[\s\S]*?updatedBy: liveSyncState\.clientId,\n        \};\n      \}/,
    `function getLiveMapPayload() {
        const state = getState();
        return {
          alliances: state.alliances,
          territories: state.territories,
          selectedAlliance: state.selectedAlliance,
          strategyPins: state.strategyPins,
          updatedAt: Date.now(),
          updatedBy: liveSyncState.clientId,
        };
      }`,
  )
  .replace(
    /function applyLiveMapPayload\(payload\) \{[\s\S]*?window\.LWStrategyPins\.updatePinsList\(\);\n        \}\n      \}/,
    `function applyLiveMapPayload(payload) {
        if (!payload) return;
        const state = getState();
        if (Array.isArray(payload.alliances)) state.alliances = payload.alliances;
        if (payload.territories && typeof payload.territories === "object")
          state.territories = payload.territories;
        if (typeof payload.selectedAlliance !== "undefined")
          state.selectedAlliance = payload.selectedAlliance;
        if (Array.isArray(payload.strategyPins))
          state.strategyPins = payload.strategyPins;
        if (typeof onApply === "function") onApply(payload);
        else {
          if (typeof global.updateUI === "function") global.updateUI();
          if (typeof global.renderMap === "function") global.renderMap();
          if (
            global.LWStrategyPins &&
            typeof global.LWStrategyPins.updatePinsList === "function"
          ) {
            global.LWStrategyPins.updatePinsList();
          }
        }
      }`,
  )}

    global.applyLiveMapPayload = applyLiveMapPayload;
    global.pushLiveMapState = pushLiveMapState;
    global.syncLocalMapChanges = syncLocalMapChanges;
    global.setStatus = setStatus;
  }

  global.initMapLiveSync = initMapLiveSync;
})(typeof window !== "undefined" ? window : globalThis);
`;

const importJs = `/**
 * Screenshot / link import (Tesseract) for interactive maps.
 */
(function (global) {
  "use strict";

  function initMapMediaImport() {
${dedent6(importBody)}
  }

  global.initMapMediaImport = initMapMediaImport;
})(typeof window !== "undefined" ? window : globalThis);
`;

engineBody = dedent6(engineBody)
  .replace(/window\.SEASON_1_TERRITORIES/g, "TERRITORY_DATA")
  .replace(/const CURRENT_SEASON = 1;/, "const CURRENT_SEASON = cfg.seasonNumber;")
  .replace(
    /return `season-1-map-\$\{new Date\(\)\.toISOString\(\)\.split\("T"\)\[0\]\}`;/,
    "return `${cfg.exportFilePrefix}-${new Date().toISOString().split(\"T\")[0]}`;",
  )
  .replace(
    /storageKey: "lwst-interactive-map-tabs-s1-v1"/,
    "storageKey: cfg.tabsStorageKey",
  );

const engineJs = `/**
 * Interactive map engine (canvas, alliances, export) — shared across seasons.
 */
(function (global) {
  "use strict";

  function bootInteractiveMap(cfg) {
    cfg = cfg || {};
    const TERRITORY_DATA = global[cfg.territoriesGlobal || "SEASON_1_TERRITORIES"] || [];

${engineBody}

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
`;

fs.writeFileSync(path.join(root, "interactive-map-live-sync.js"), liveJsFixed);
fs.writeFileSync(path.join(root, "interactive-map-media-import.js"), importJs);
fs.writeFileSync(path.join(root, "interactive-map-engine.js"), engineJs);

const seasons = [1, 2, 3, 4, 5, 6];
for (const n of seasons) {
  const cfgPath = path.join(root, `interactive-map-s${n}-config.js`);
  fs.writeFileSync(
    cfgPath,
    `window.__LW_INTERACTIVE_MAP_CFG__ = {
  seasonNumber: ${n},
  logTag: "[Season ${n} Map]",
  rtdbPath: "season${n}-map",
  territoriesGlobal: "SEASON_${n}_TERRITORIES",
  tabsStorageKey: "lwst-interactive-map-tabs-s${n}-v1",
  exportFilePrefix: "season-${n}-map",
};
`,
  );

  for (const rel of [
    `season-${n}-interactive-map.html`,
    `season-${n}/season-${n}-interactive-map.html`,
  ]) {
    const mapPath = path.join(root, rel);
    if (!fs.existsSync(mapPath)) continue;
    let mapHtml = fs.readFileSync(mapPath, "utf8");
    const marker = "    <!-- Firebase Live Sync Logic -->";
    const tesseractMarker =
      '    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5.0.1/dist/tesseract.min.js"></script>';
    const liveStart = mapHtml.indexOf(marker);
    const supportIdx = mapHtml.indexOf(
      '<div class="support-bar">',
      liveStart,
    );
    if (liveStart < 0 || supportIdx < 0) {
      console.warn("Skip (markers):", rel);
      continue;
    }
    const before = mapHtml.slice(0, liveStart);
    const after = mapHtml.slice(supportIdx);
    const terrScript = `season-${n}-territories.js`;
    const block = `    <script src="interactive-map-live-sync.js"></script>
    <script src="interactive-map-media-import.js"></script>
    <script src="interactive-map-engine.js"></script>
    <script src="interactive-map-s${n}-config.js"></script>
${tesseractMarker}
    <script>
      bootInteractiveMap(window.__LW_INTERACTIVE_MAP_CFG__ || {});
    </script>

`;
    // Fix territories script name in before section if still season-1
    let beforeFixed = before.replace(
      /season-\d+-territories\.js/g,
      terrScript,
    );
    mapHtml =
      beforeFixed +
      block +
      after;
    fs.writeFileSync(mapPath, mapHtml);
    console.log("Updated", rel);
  }
}

console.log("Done.");
