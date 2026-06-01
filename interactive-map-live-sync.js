/**
 * Firebase RTDB live sync for interactive season maps.
 */
(function (global) {
  "use strict";

  function initMapLiveSync(opts) {
    opts = opts || {};
    const RTDB_MAP_ROOT = opts.rtdbPath || "season1-map";
    const getState = opts.getState || function () { return {}; };
    const onApply = opts.onApplyRemote;

// --- Firebase Live Sync for Map ---
const LIVE_SYNC = {
  // DB URL: ?db=, localStorage lastWarLiveSyncDbUrl, window.LWST_LIVE_SYNC_DB_URL,
  // firebase-config.js → __FIREBASE_CONFIG__.databaseURL (infer helper), or default below.
  defaultDatabaseUrl:
    "https://lastwartools-c12c8-default-rtdb.firebaseio.com/",
  pollMs: 1200,
  enableAnonymousAuth: false,
};
const MAP_LIVE_LOG = opts.logTag || "[Map Live]";
const liveSyncState = {
  clientId: `${Math.random().toString(36).slice(2, 10)}-${Date.now()}`,
  shareId: null,
  firebaseApp: null,
  firebaseDb: null,
  firebaseRef: null,
  firebaseValueHandler: null,
  lastSeenUpdatedAt: 0,
  applyingRemote: false,
  dbUrl: "",
  hadError: false,
  enabled: false,
};

function firebaseConfigOk(cfg) {
  if (!cfg || typeof cfg !== "object") return false;
  const k = String(cfg.apiKey || "");
  const pid = String(cfg.projectId || "");
  return (
    k.length > 0 &&
    k !== "YOUR_WEB_API_KEY" &&
    !k.startsWith("YOUR_") &&
    pid.length > 0 &&
    pid !== "YOUR_PROJECT_ID" &&
    !pid.startsWith("YOUR_") &&
    typeof cfg.appId === "string" &&
    cfg.appId.length > 0
  );
}

function inferDatabaseUrlFromFirebaseConfig() {
  try {
    const cfg = window.__FIREBASE_CONFIG__;
    if (!cfg || typeof cfg !== "object") return "";
    const du = String(cfg.databaseURL || "").trim();
    if (/^https?:\/\//i.test(du)) {
      return du.endsWith("/") ? du : `${du}/`;
    }
    if (!firebaseConfigOk(cfg)) return "";
    const pid = String(cfg.projectId || "").trim();
    if (!pid) return "";
    return `https://${pid}-default-rtdb.firebaseio.com/`;
  } catch {
    return "";
  }
}

function plausibleAppCheckSiteKey(sk) {
  const s = String(sk || "").trim();
  if (!s || s.length > 120) return false;
  if (/[{[]|"apiKey"\s*:|'apiKey'\s*:|"projectId"\s*:|"databaseURL"\s*:/i.test(s)) {
    return false;
  }
  return /^6L[a-zA-Z0-9_-]{20,}$/.test(s);
}

function appCheckSiteKeyPresent() {
  try {
    const raw = String(window.__FIREBASE_APPCHECK_SITE_KEY__ || "").trim();
    if (!raw) return false;
    if (!plausibleAppCheckSiteKey(raw)) {
      if (!window.__lwMapBadAppCheckKeyWarned) {
        window.__lwMapBadAppCheckKeyWarned = true;
        console.warn(
          `${MAP_LIVE_LOG} __FIREBASE_APPCHECK_SITE_KEY__ must be the short reCAPTCHA Enterprise key from Firebase → App Check.`,
        );
      }
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function liveSkipAppCheckForRtdb() {
  try {
    if (window.__RS_LIVE_SKIP_APPCHECK__ === true) return true;
    const q = new URLSearchParams(window.location.search || "");
    return q.get("rsLiveDbOnly") === "1" || q.get("liveDbOnly") === "1";
  } catch {
    return false;
  }
}

function effectiveAppCheckForLiveRtdb() {
  return appCheckSiteKeyPresent() && !liveSkipAppCheckForRtdb();
}

function firebaseInitOptionsForRtdb(currentDb) {
  const cfg = window.__FIREBASE_CONFIG__;
  if (effectiveAppCheckForLiveRtdb() && firebaseConfigOk(cfg)) {
    const o = {
      apiKey: cfg.apiKey,
      authDomain: cfg.authDomain,
      projectId: cfg.projectId,
      storageBucket: cfg.storageBucket,
      messagingSenderId: cfg.messagingSenderId,
      appId: cfg.appId,
      databaseURL: currentDb,
    };
    if (cfg.measurementId) o.measurementId = cfg.measurementId;
    return o;
  }
  return { databaseURL: currentDb };
}

function activateAppCheckIfConfigured(app) {
  if (
    !app ||
    !window.firebase ||
    !window.firebase.appCheck ||
    app._lwInteractiveMapAppCheckActivated
  ) {
    return;
  }
  if (liveSkipAppCheckForRtdb()) return;
  if (!appCheckSiteKeyPresent()) return;
  try {
    const Prov = firebase.appCheck.ReCaptchaEnterpriseProvider;
    if (typeof Prov !== "function") return;
    const key = String(window.__FIREBASE_APPCHECK_SITE_KEY__ || "").trim();
    firebase.appCheck(app).activate(new Prov(key), true);
    app._lwInteractiveMapAppCheckActivated = true;
  } catch (e) {
    console.warn(`${MAP_LIVE_LOG} App Check activate:`, e);
  }
}

function promiseWithTimeout(promise, ms, timeoutMessage) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      const te = new Error(timeoutMessage || "Operation timed out.");
      te.__mapLiveTimeout = true;
      reject(te);
    }, ms);
    Promise.resolve(promise).then(
      (v) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

function awaitAppCheckTokenIfNeeded(app) {
  if (!effectiveAppCheckForLiveRtdb() || !app || !window.firebase.appCheck) {
    return Promise.resolve();
  }
  try {
    const ac = firebase.appCheck(app);
    if (typeof ac.getToken !== "function") return Promise.resolve();
    const tokenPromise = ac.getToken(false).then(
      () => {},
      (err) => console.warn(`${MAP_LIVE_LOG} App Check getToken:`, err),
    );
    const stallMs = 12000;
    const stallPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.warn(
          `${MAP_LIVE_LOG} App Check getToken still pending — opening RTDB anyway. If sync fails, check App Check domain registration or use ?rsLiveDbOnly=1 when RTDB enforcement is Off/Monitor.`,
        );
        resolve();
      }, stallMs);
    });
    return promiseWithTimeout(Promise.race([tokenPromise, stallPromise]), 20000, "App Check token timed out.").catch(
      (err) => {
        if (err && err.__mapLiveTimeout) console.warn(err.message);
        return undefined;
      },
    );
  } catch (e) {
    console.warn(`${MAP_LIVE_LOG} App Check getToken:`, e);
    return Promise.resolve();
  }
}

function ensureFirebaseDbReady() {
  if (liveSyncState.firebaseDb) return Promise.resolve();
  if (!liveSyncState.firebaseApp) {
    return Promise.reject(new Error("No Firebase app"));
  }
  if (!effectiveAppCheckForLiveRtdb()) {
    liveSyncState.firebaseDb = window.firebase.database(liveSyncState.firebaseApp);
    return Promise.resolve();
  }
  return awaitAppCheckTokenIfNeeded(liveSyncState.firebaseApp).then(() => {
    if (!liveSyncState.firebaseDb) {
      liveSyncState.firebaseDb = window.firebase.database(liveSyncState.firebaseApp);
    }
  });
}

function resolveLiveSyncDbUrl() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("db");
  let fromStorage = "";
  try {
    fromStorage = String(
      localStorage.getItem("lastWarLiveSyncDbUrl") || "",
    );
  } catch {
    fromStorage = "";
  }
  let fromGlobal = "";
  try {
    fromGlobal = String(window.LWST_LIVE_SYNC_DB_URL || "").trim();
  } catch {
    fromGlobal = "";
  }
  const fromFirebaseConfig = inferDatabaseUrlFromFirebaseConfig();
  const resolved = String(
    fromUrl ||
      fromStorage ||
      fromGlobal ||
      fromFirebaseConfig ||
      LIVE_SYNC.defaultDatabaseUrl ||
      "",
  ).trim();
  liveSyncState.dbUrl = resolved;
  if (resolved) {
    try {
      localStorage.setItem("lastWarLiveSyncDbUrl", resolved);
    } catch {
      /* ignore */
    }
  }
  let enabledRaw = "0";
  try {
    enabledRaw = localStorage.getItem("lastWarLiveSyncEnabled") || "0";
  } catch {
    enabledRaw = "0";
  }
  liveSyncState.enabled = enabledRaw === "1";
  if (params.get("shareId")) {
    liveSyncState.enabled = true;
  }
}
function isLiveSyncConfigured() {
  return Boolean(liveSyncState.dbUrl && liveSyncState.dbUrl.trim());
}
function isLiveSyncActive() {
  return liveSyncState.enabled && isLiveSyncConfigured();
}
const lwShare = window.__lwLiveShareId;
function sanitizeShareId(raw) {
  return lwShare.sanitizeShareId(raw);
}
function createShareId() {
  return lwShare.createShareId();
}
function getPersistedMapLiveShareId() {
  return lwShare.getPersistedLiveShareId();
}
function setPersistedMapLiveShareId(id) {
  lwShare.setPersistedLiveShareId(id);
}
function ensureHostMapShareId() {
  return lwShare.ensureUserShareId(liveSyncState);
}
function updateMapLiveSharePanel() {
  const panel = document.getElementById("mapLiveSharePanel");
  const input = document.getElementById("mapLiveShareUrlInput");
  if (!panel || !input) return;
  if (!isLiveSyncActive()) {
    panel.classList.add("is-hidden");
    input.value = "";
    input.placeholder = "";
    return;
  }
  panel.classList.remove("is-hidden");
  if (!liveSyncState.shareId) {
    input.value = "";
    input.placeholder = "Preparing live link…";
    return;
  }
  input.placeholder = "";
  input.value = buildLiveShareUrl(liveSyncState.shareId);
}
function getLiveEndpoint(shareId) {
  const base = liveSyncState.dbUrl.replace(/\/$/, "");
  return `${base}/season1-map/${encodeURIComponent(shareId)}.json`;
}
function buildLiveShareUrl(shareId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("shareId", shareId);
  if (isLiveSyncConfigured()) {
    url.searchParams.set("db", liveSyncState.dbUrl);
  }
  try {
    if (
      new URLSearchParams(window.location.search || "").get(
        "rsLiveDbOnly",
      ) === "1"
    ) {
      url.searchParams.set("rsLiveDbOnly", "1");
    }
  } catch {
    /* ignore */
  }
  return url.toString();
}
function ensureFirebaseReady() {
  if (!isLiveSyncConfigured()) return false;
  if (!window.firebase || !window.firebase.apps) {
    if (!liveSyncState.hadError) {
      setStatus && setStatus("Firebase SDK not loaded.", true);
      liveSyncState.hadError = true;
    }
    return false;
  }
  const currentDb = liveSyncState.dbUrl.replace(/\/$/, "");
  if (
    liveSyncState.firebaseApp &&
    liveSyncState.firebaseApp.options &&
    String(liveSyncState.firebaseApp.options.databaseURL || "").replace(
      /\/$/,
      "",
    ) !== currentDb
  ) {
    setStatus &&
      setStatus(
        "DB endpoint changed. Refresh page to reinitialize Firebase.",
        true,
      );
    return false;
  }
  const skipAc = liveSkipAppCheckForRtdb();
  let appName;
  try {
    appName =
      `lwst-${btoa(currentDb).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}` +
      (skipAc ? "nac" : "");
  } catch {
    let h = 0;
    for (let i = 0; i < currentDb.length; i++) {
      h = ((h << 5) - h + currentDb.charCodeAt(i)) | 0;
    }
    appName = `lwst-${String(h >>> 0)}${skipAc ? "nac" : ""}`;
  }
  if (!liveSyncState.firebaseApp) {
    const existing = window.firebase.apps.find((app) => app.name === appName);
    try {
      liveSyncState.firebaseApp =
        existing ||
        window.firebase.initializeApp(
          firebaseInitOptionsForRtdb(currentDb),
          appName,
        );
    } catch (initErr) {
      console.error(`${MAP_LIVE_LOG} Firebase initializeApp failed:`, initErr);
      setStatus &&
        setStatus(
          "Firebase init failed — check database URL matches firebase-config.",
          true,
        );
      return false;
    }
    activateAppCheckIfConfigured(liveSyncState.firebaseApp);
    if (!effectiveAppCheckForLiveRtdb()) {
      liveSyncState.firebaseDb = window.firebase.database(
        liveSyncState.firebaseApp,
      );
    }
  } else {
    activateAppCheckIfConfigured(liveSyncState.firebaseApp);
    if (!liveSyncState.firebaseDb && !effectiveAppCheckForLiveRtdb()) {
      liveSyncState.firebaseDb = window.firebase.database(
        liveSyncState.firebaseApp,
      );
    }
  }
  return true;
}
function stopLiveSyncPolling() {
  if (liveSyncState.firebaseRef && liveSyncState.firebaseValueHandler) {
    liveSyncState.firebaseRef.off(
      "value",
      liveSyncState.firebaseValueHandler,
    );
  }
  liveSyncState.firebaseRef = null;
  liveSyncState.firebaseValueHandler = null;
}
async function startLiveSync(shareId) {
  stopLiveSyncPolling();
  liveSyncState.shareId = shareId;
  history.replaceState(null, "", buildLiveShareUrl(shareId));
  if (!isLiveSyncActive() || !ensureFirebaseReady()) return;

  const attachListener = () => {
    liveSyncState.firebaseRef = liveSyncState.firebaseDb.ref(
      `${RTDB_MAP_ROOT}/${shareId}`,
    );
    liveSyncState.firebaseValueHandler = (snapshot) => {
      const payload = snapshot.val();
      if (!payload || !payload.updatedAt) return;
      const updatedAt = Number(payload.updatedAt);
      if (!Number.isFinite(updatedAt)) return;
      if (updatedAt <= liveSyncState.lastSeenUpdatedAt) return;
      liveSyncState.lastSeenUpdatedAt = updatedAt;
      if (payload.updatedBy === liveSyncState.clientId) return;
      liveSyncState.applyingRemote = true;
      if (typeof applyLiveMapPayload === "function")
        applyLiveMapPayload(payload);
      liveSyncState.applyingRemote = false;
      liveSyncState.hadError = false;
    };
    liveSyncState.firebaseRef.on(
      "value",
      liveSyncState.firebaseValueHandler,
      (error) => {
        if (!liveSyncState.hadError) {
          setStatus &&
            setStatus(
              `Live sync read failed (${error?.code || "unknown"}). Check DB rules/URL/App Check.`,
              true,
            );
          liveSyncState.hadError = true;
        }
      },
    );
  };

  try {
    await ensureFirebaseDbReady();
    attachListener();
  } catch (e) {
    console.warn(`${MAP_LIVE_LOG} startLiveSync:`, e);
    stopLiveSyncPolling();
    setStatus &&
      setStatus(
        "Live sync could not start. Check firebase-config.js, App Check domain, and browser console.",
        true,
      );
  }
}
async function pushLiveMapState() {
  if (
    !isLiveSyncActive() ||
    !liveSyncState.shareId ||
    liveSyncState.applyingRemote
  )
    return;
  if (!ensureFirebaseReady()) return;
  try {
    await ensureFirebaseDbReady();
  } catch (e) {
    if (!liveSyncState.hadError) {
      setStatus &&
        setStatus(
          "Live sync write failed (Firebase not ready). Check App Check and console.",
          true,
        );
      liveSyncState.hadError = true;
    }
    return;
  }
  if (!liveSyncState.firebaseRef) return;
  const payload = getLiveMapPayload();
  try {
    await liveSyncState.firebaseRef.set(payload);
    liveSyncState.lastSeenUpdatedAt = Number(payload.updatedAt);
    liveSyncState.hadError = false;
  } catch {
    if (!liveSyncState.hadError) {
      setStatus &&
        setStatus(
          "Live sync write failed. Check DB rules/URL/App Check.",
          true,
        );
      liveSyncState.hadError = true;
    }
  }
}
function getLiveMapPayload() {
  // You may want to customize this to only sync the current tab's map data
  return {
    alliances: state.alliances,
    territories: state.territories,
    selectedAlliance: state.selectedAlliance,
    strategyPins: state.strategyPins,
    updatedAt: Date.now(),
    updatedBy: liveSyncState.clientId,
  };
}
function applyLiveMapPayload(payload) {
  if (!payload) return;
  if (Array.isArray(payload.alliances))
    state.alliances = payload.alliances;
  if (payload.territories && typeof payload.territories === "object")
    state.territories = payload.territories;
  if (typeof payload.selectedAlliance !== "undefined")
    state.selectedAlliance = payload.selectedAlliance;
  if (Array.isArray(payload.strategyPins))
    state.strategyPins = payload.strategyPins;
  if (typeof updateUI === "function") updateUI();
  if (typeof renderMap === "function") renderMap();
  if (
    window.LWStrategyPins &&
    typeof window.LWStrategyPins.updatePinsList === "function"
  ) {
    window.LWStrategyPins.updatePinsList();
  }
}
function setStatus(message, isError = false) {
  // Optionally show status in your UI
  if (window.allianceDebugContent) {
    window.allianceDebugContent.textContent = message;
    const dbg = document.getElementById("allianceDebugPanel");
    if (dbg) {
      if (window.SHOW_ALLIANCE_DEBUG_PANEL) {
        dbg.removeAttribute("hidden");
        dbg.setAttribute("aria-hidden", "false");
        dbg.style.cssText =
          "display:block;position:fixed;bottom:12px;right:12px;max-width:420px;z-index:10000;background:#222;color:#fff;padding:12px;border-radius:10px;border:2px solid #e74c3c;font-size:0.9em;word-break:break-all;";
      } else {
        dbg.setAttribute("hidden", "");
        dbg.setAttribute("aria-hidden", "true");
        dbg.style.cssText =
          "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0";
      }
    }
  }
}
async function copyMapLiveShareToClipboard() {
  resolveLiveSyncDbUrl();
  let url = window.location.href;
  if (isLiveSyncActive()) {
    const shareId = ensureHostMapShareId();
    const alreadyConnected =
      Boolean(liveSyncState.firebaseRef) &&
      liveSyncState.shareId === shareId;
    try {
      if (!alreadyConnected) {
        await startLiveSync(shareId);
      }
      await pushLiveMapState();
      url = buildLiveShareUrl(shareId);
    } catch (e) {
      console.warn("[Season 1 Map] copy live link:", e);
      setStatus(
        "Could not prepare live link. Check the browser console.",
        true,
      );
      return false;
    }
  } else {
    setStatus("Copied snapshot link (live sync is off).");
  }
  try {
    await navigator.clipboard.writeText(url);
    updateMapLiveSharePanel();
    return true;
  } catch {
    window.prompt("Copy this shareable link:", url);
    updateMapLiveSharePanel();
    return true;
  }
}
function initPersistedHostMapLiveSync() {
  const urlSid = sanitizeShareId(
    new URLSearchParams(window.location.search).get("shareId"),
  );
  if (urlSid) {
    updateMapLiveSharePanel();
    return;
  }
  resolveLiveSyncDbUrl();
  if (!isLiveSyncActive()) {
    updateMapLiveSharePanel();
    return;
  }
  ensureHostMapShareId();
  void startLiveSync(liveSyncState.shareId)
    .then(() => {
      setStatus("Live shared map connected");
      updateMapLiveSharePanel();
    })
    .catch((err) => {
      console.warn(`${MAP_LIVE_LOG} initPersistedHostMapLiveSync:`, err);
      updateMapLiveSharePanel();
    });
}
document.addEventListener("DOMContentLoaded", function () {
  resolveLiveSyncDbUrl();
  const liveSyncEnabledInput = document.getElementById(
    "liveSyncEnabledInput",
  );
  const mapLiveShareCopyBtn = document.getElementById(
    "mapLiveShareCopyBtn",
  );
  const mapLiveShareChangeBtn = document.getElementById(
    "mapLiveShareChangeBtn",
  );
  if (liveSyncEnabledInput) {
    liveSyncEnabledInput.checked = liveSyncState.enabled;
    liveSyncEnabledInput.addEventListener("change", function () {
      liveSyncState.enabled = liveSyncEnabledInput.checked;
      localStorage.setItem(
        "lastWarLiveSyncEnabled",
        liveSyncState.enabled ? "1" : "0",
      );
      if (!liveSyncState.enabled) {
        stopLiveSyncPolling();
        setStatus(
          "Live sync is off. Shared links will be snapshot links.",
        );
        updateMapLiveSharePanel();
        return;
      }
      resolveLiveSyncDbUrl();
      if (!isLiveSyncConfigured()) {
        liveSyncEnabledInput.checked = false;
        liveSyncState.enabled = false;
        localStorage.setItem("lastWarLiveSyncEnabled", "0");
        setStatus(
          "Live sync needs a configured DB URL. Set firebase-config.js (or LIVE_SYNC.defaultDatabaseUrl / ?db=).",
          true,
        );
        updateMapLiveSharePanel();
        return;
      }
      const sid = ensureHostMapShareId();
      void startLiveSync(sid)
        .then(() => {
          setStatus("Live sync is on.");
          updateMapLiveSharePanel();
        })
        .catch((err) => {
          console.warn(`${MAP_LIVE_LOG} liveSync toggle:`, err);
          liveSyncEnabledInput.checked = false;
          liveSyncState.enabled = false;
          localStorage.setItem("lastWarLiveSyncEnabled", "0");
          setStatus(
            "Live sync failed to start. Check the browser console.",
            true,
          );
          updateMapLiveSharePanel();
        });
    });
  }
  if (mapLiveShareCopyBtn) {
    mapLiveShareCopyBtn.addEventListener("click", async function () {
      const ok = await copyMapLiveShareToClipboard();
      if (ok) {
        const prev = mapLiveShareCopyBtn.textContent;
        mapLiveShareCopyBtn.textContent = "Copied!";
        setTimeout(() => {
          mapLiveShareCopyBtn.textContent = prev;
        }, 2000);
      }
    });
  }
  if (mapLiveShareChangeBtn) {
    mapLiveShareChangeBtn.addEventListener("click", function () {
      if (!isLiveSyncActive()) return;
      const newId = createShareId();
      setPersistedMapLiveShareId(newId);
      liveSyncState.shareId = newId;
      void startLiveSync(newId)
        .then(() => pushLiveMapState())
        .then(() => {
          updateMapLiveSharePanel();
          setStatus("New live link is ready — share it with your group.");
        })
        .catch((err) => {
          console.warn(`${MAP_LIVE_LOG} change live link:`, err);
          setStatus(
            "Could not switch to a new link. Check the browser console.",
            true,
          );
        });
    });
  }
  const params = new URLSearchParams(window.location.search);
  const shareId = sanitizeShareId(params.get("shareId"));
  if (shareId && isLiveSyncActive()) {
    void startLiveSync(shareId)
      .then(() => {
        setStatus("Live shared map connected");
        updateMapLiveSharePanel();
      })
      .catch((err) => {
        console.warn(`${MAP_LIVE_LOG} guest share init:`, err);
        updateMapLiveSharePanel();
      });
  }
  initPersistedHostMapLiveSync();
  updateMapLiveSharePanel();
});
// Call pushLiveMapState() after any local map change to sync
function syncLocalMapChanges() {
  if (isLiveSyncActive()) void pushLiveMapState();
}
// Example: after alliance/territory/pin changes, call syncLocalMapChanges()
// (You may need to add this call in your addAlliance, removeAlliance, assignTerritory, etc.)

    global.applyLiveMapPayload = applyLiveMapPayload;
    global.pushLiveMapState = pushLiveMapState;
    global.syncLocalMapChanges = syncLocalMapChanges;
    global.setStatus = setStatus;
  }

  global.initMapLiveSync = initMapLiveSync;
})(typeof window !== "undefined" ? window : globalThis);
