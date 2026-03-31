/**
 * Single Firestore instance per Firebase app. Prefer long polling so the realtime
 * Listen/WebChannel stream is less likely to return HTTP 400 on restrictive networks
 * (proxies, some localhost setups). See firebase-js-sdk issues #6181, #9028.
 */
import {
  getFirestore,
  initializeFirestore,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/** @type {WeakMap<import("firebase/app").FirebaseApp, import("firebase/firestore").Firestore>} */
const _dbByApp = new WeakMap();

/**
 * @param {import("firebase/app").FirebaseApp} app
 * @returns {import("firebase/firestore").Firestore}
 */
export function getSharedFirestore(app) {
  if (!app) throw new Error("getSharedFirestore: app required");
  const existing = _dbByApp.get(app);
  if (existing) return existing;
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
