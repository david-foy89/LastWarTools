/**
 * Optional background sync: when the user is signed in, merge localStorage with
 * Firestore. Runs immediately when the signed-in account changes (sign-in / switch user);
 * otherwise throttled on page reload. Loaded from page-nav-dropdown.js.
 * Silent — no UI. Requires firebase-config scripts to run first.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, reload } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  firebaseConfigOk,
  mergeAndSyncToCloud,
  shouldPullCloudBeforeMerge,
  SYNC_COLLECTION,
} from "./account-sync-lib.js";
import { loadAndApplyUserProfile } from "./account-profile-lib.js";

const THROTTLE_MS = 90_000;
const LAST_SYNC_KEY = "lwAccountBackgroundSyncAt";
/** Per-tab: last uid we attributed a “session” merge to — when uid changes, sync immediately */
const SESSION_SYNCED_UID_KEY = "lwAccountSessionSyncUid";

function shouldRunBackgroundSync() {
  const now = Date.now();
  var last = 0;
  try {
    last = Number(localStorage.getItem(LAST_SYNC_KEY) || "0");
  } catch {
    /* private mode / storage disabled — skip throttle so sync can still run */
    return true;
  }
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
      if (!user) {
        try {
          sessionStorage.removeItem(SESSION_SYNCED_UID_KEY);
        } catch {
          /* ignore */
        }
        return;
      }
      try {
        await reload(user);
      } catch (e) {
        console.warn("[Last War Tools] reload in account-sync-global:", e);
      }
      var sessionUid = "";
      try {
        sessionUid = sessionStorage.getItem(SESSION_SYNCED_UID_KEY) || "";
      } catch {
        sessionUid = "";
      }
      /** True when this tab has not yet recorded a successful merge for this uid (includes sign-in). */
      var accountJustChanged = sessionUid !== user.uid;
      var needsPullFromCloud = false;
      if (user.emailVerified) {
        try {
          var cloudSnap = await getDoc(doc(db, SYNC_COLLECTION, user.uid));
          needsPullFromCloud = shouldPullCloudBeforeMerge(cloudSnap, user.uid);
        } catch (peekErr) {
          needsPullFromCloud = true;
        }
      }
      if (
        user.emailVerified &&
        (accountJustChanged || needsPullFromCloud || shouldRunBackgroundSync())
      ) {
        try {
          await mergeAndSyncToCloud(user, db, {});
          markBackgroundSynced();
          try {
            sessionStorage.setItem(SESSION_SYNCED_UID_KEY, user.uid);
          } catch {
            /* ignore */
          }
        } catch (e) {
          console.warn("[Last War Tools] Background account sync failed:", e);
        }
      } else if (user && !user.emailVerified) {
        console.info(
          "[Last War Tools] Cloud sync skipped: verify your email to merge data across devices.",
        );
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
