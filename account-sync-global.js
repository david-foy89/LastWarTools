/**
 * Optional background sync: when the user is signed in, merge localStorage with
 * Firestore on each page load (throttled). Loaded from page-nav-dropdown.js.
 * Silent — no UI. Requires firebase-config scripts to run first.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfigOk, mergeAndSyncToCloud } from "./account-sync-lib.js";
import { loadAndApplyUserProfile } from "./account-profile-lib.js";

const THROTTLE_MS = 90_000;
const LAST_SYNC_KEY = "lwAccountBackgroundSyncAt";

function shouldRunBackgroundSync() {
  const now = Date.now();
  const last = Number(localStorage.getItem(LAST_SYNC_KEY) || "0");
  if (now - last < THROTTLE_MS) return false;
  return true;
}

function markBackgroundSynced() {
  try {
    localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

const cfg = window.__FIREBASE_CONFIG__;
if (!firebaseConfigOk(cfg)) {
  // Missing or placeholder config — tools work locally without sync.
} else {
  try {
    const app = getApps().length ? getApp() : initializeApp(cfg);
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      if (shouldRunBackgroundSync() && user.emailVerified) {
        try {
          await mergeAndSyncToCloud(user, db, {});
          markBackgroundSynced();
        } catch (e) {
          console.warn("[Last War Tools] Background account sync failed:", e);
        }
      }
      try {
        await loadAndApplyUserProfile(user, db);
      } catch (e) {
        console.warn("[Last War Tools] Profile load failed:", e);
      }
    });
  } catch (e) {
    console.warn("[Last War Tools] Account sync could not start:", e);
  }
}
