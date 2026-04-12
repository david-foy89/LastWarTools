/**
 * Single Firestore instance per Firebase app. Prefer long polling so the realtime
 * Listen/WebChannel stream is less likely to return HTTP 400 on restrictive networks
 * (proxies, some localhost setups). See firebase-js-sdk issues #6181, #9028.
 *
 * When App Check is enforced for Firestore, requests must include a token. Initialize
 * App Check on the same app before `initializeFirestore` (same pattern as
 * `rare-soil-war-live-fs.js`).
 */
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-check.js";
import {
  getFirestore,
  initializeFirestore,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/** @type {WeakMap<import("firebase/app").FirebaseApp, import("firebase/firestore").Firestore>} */
const _dbByApp = new WeakMap();

/** @type {WeakMap<import("firebase/app").FirebaseApp, true>} */
const _appCheckInitialized = new WeakMap();

function ensureAppCheckBeforeFirestore(app) {
  if (!app || _appCheckInitialized.has(app)) return;
  const key =
    typeof window !== "undefined"
      ? String(window.__FIREBASE_APPCHECK_SITE_KEY__ || "").trim()
      : "";
  if (!key) return;
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(key),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (e) {
    const m = String((e && e.message) || e || "");
    if (!/already|initialized|exists/i.test(m)) {
      console.warn("[Last War Tools] App Check (before Firestore):", e);
    }
  }
  _appCheckInitialized.set(app, true);
}

/**
 * @param {import("firebase/app").FirebaseApp} app
 * @returns {import("firebase/firestore").Firestore}
 */
export function getSharedFirestore(app) {
  if (!app) throw new Error("getSharedFirestore: app required");
  const existing = _dbByApp.get(app);
  if (existing) return existing;
  ensureAppCheckBeforeFirestore(app);
  let db;
  try {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      /** Helps some browsers / networks where WebChannel Listen returns HTTP 400. */
      experimentalAutoDetectLongPolling: true,
    });
  } catch (e) {
    db = getFirestore(app);
  }
  _dbByApp.set(app, db);
  return db;
}
