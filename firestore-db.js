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

let _badAppCheckKeyWarned = false;

/** reCAPTCHA Enterprise keys for Firebase App Check are short strings (e.g. 6L…). Reject pasted firebaseConfig JSON. */
function isPlausibleAppCheckSiteKey(sk) {
  const s = String(sk || "").trim();
  if (!s) return false;
  if (s.length > 120) return false;
  if (/[{[]|"apiKey"\s*:|'apiKey'\s*:|"projectId"\s*:|"databaseURL"\s*:/i.test(s)) {
    return false;
  }
  return /^6L[a-zA-Z0-9_-]{20,}$/.test(s);
}

function ensureAppCheckBeforeFirestore(app) {
  if (!app || _appCheckInitialized.has(app)) return;
  const key =
    typeof window !== "undefined"
      ? String(window.__FIREBASE_APPCHECK_SITE_KEY__ || "").trim()
      : "";
  if (!key) return;
  if (!isPlausibleAppCheckSiteKey(key)) {
    if (!_badAppCheckKeyWarned) {
      _badAppCheckKeyWarned = true;
      console.warn(
        "[Last War Tools] __FIREBASE_APPCHECK_SITE_KEY__ does not look like a reCAPTCHA Enterprise site key (expected a short 6L… string). It may be the Firebase web config JSON — fix GitHub secret FIREBASE_APPCHECK_SITE_KEY or firebase-config.js; paste only the App Check key from Firebase Console → App Check.",
      );
    }
    return;
  }
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
