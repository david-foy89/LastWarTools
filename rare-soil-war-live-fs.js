/**
 * Legacy / unused: rare-soil-war-tracker.html uses Realtime Database only for live sync.
 * Modular Firestore live sync for rare-soil-war-tracker.html (matches transfer-tracker pattern).
 * Compat FieldValue.serverTimestamp() inside object literals can throw "Unsupported field value";
 * modular serverTimestamp() avoids that.
 */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  initializeFirestore,
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-check.js";

const APP_NAME = "lwst-rare-soil-live";
const COL = "rareSoilWarLive";

/** @type {WeakMap<import("firebase/app").FirebaseApp, true>} */
const _appCheckReady = new WeakMap();

function getOrInitApp(cfg) {
  const apps = getApps();
  for (let i = 0; i < apps.length; i++) {
    if (apps[i].name === APP_NAME) return apps[i];
  }
  return initializeApp(cfg, APP_NAME);
}

function ensureModularAppCheck(app) {
  if (_appCheckReady.has(app)) return;
  try {
    var sk =
      typeof window !== "undefined" && window.__FIREBASE_APPCHECK_SITE_KEY__;
    var key = String(sk || "").trim();
    if (
      !key ||
      key.length > 120 ||
      /[{[]|"apiKey"\s*:|"projectId"\s*:/i.test(key) ||
      !/^6L[a-zA-Z0-9_-]{20,}$/.test(key)
    ) {
      return;
    }
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(key),
      isTokenAutoRefreshEnabled: true,
    });
    _appCheckReady.set(app, true);
  } catch (e) {
    console.warn("[Rare Soil] App Check (Firestore module):", e);
  }
}

function getDb(app) {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
      experimentalAutoDetectLongPolling: true,
    });
  } catch (_) {
    return getFirestore(app);
  }
}

/**
 * @param {import("firebase/app").FirebaseOptions} cfg
 * @param {string} shareId
 * @param {{ onSnapshot: (snap: import("firebase/firestore").DocumentSnapshot) => void, onError: (e: import("firebase/firestore").FirestoreError) => void }} handlers
 */
export function startRareSoilFirestoreLive(cfg, shareId, handlers) {
  const app = getOrInitApp(cfg);
  ensureModularAppCheck(app);
  const db = getDb(app);
  const dref = doc(db, COL, shareId);
  const unsub = onSnapshot(dref, handlers.onSnapshot, handlers.onError);
  return {
    unsubscribe: unsub,
    push: function (days, rows, clientId) {
      return setDoc(dref, {
        v: 1,
        days: days,
        rows: rows,
        updatedBy: clientId,
        updatedAt: serverTimestamp(),
      });
    },
  };
}
