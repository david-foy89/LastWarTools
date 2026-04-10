/**
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

const APP_NAME = "lwst-rare-soil-live";
const COL = "rareSoilWarLive";

function getOrInitApp(cfg) {
  const apps = getApps();
  for (let i = 0; i < apps.length; i++) {
    if (apps[i].name === APP_NAME) return apps[i];
  }
  return initializeApp(cfg, APP_NAME);
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
