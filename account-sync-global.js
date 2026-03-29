/**
 * Optional background sync: when the user is signed in, merge localStorage with
 * Firestore. Runs immediately when the signed-in account changes (sign-in / switch user);
 * otherwise throttled on page reload. Subscribes to the cloud doc so updates from other
 * devices apply without reload. Loaded from page-nav-dropdown.js.
 * Silent — no UI. Retries boot briefly if firebase-config.js loads after this module.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  reload,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  firebaseConfigOk,
  mergeAndSyncToCloud,
  shouldPullCloudBeforeMerge,
  shouldSyncKey,
  SYNC_COLLECTION,
} from "./account-sync-lib.js";
import { loadAndApplyUserProfile } from "./account-profile-lib.js";

const THROTTLE_MS = 90_000;
const LAST_SYNC_KEY = "lwAccountBackgroundSyncAt";
/** Per-tab: last uid we attributed a “session” merge to — when uid changes, sync immediately */
const SESSION_SYNCED_UID_KEY = "lwAccountSessionSyncUid";
const BOOT_POLL_MS = 100;
const BOOT_POLL_MAX = 50;
const REMOTE_MERGE_DEBOUNCE_MS = 1200;
/** Fallback if snapshots are missed (mobile/background throttling, listener gaps). */
const PERIODIC_SYNC_MS = 45_000;

let syncStarted = false;
/** @type {import("firebase/auth").Auth | null} */
let authRef = null;
/** @type {import("firebase/firestore").Firestore | null} */
let dbRef = null;

let unsubFirestore = null;
let mergeInFlight = false;
/** If true, run at least one more merge after the current one (remote + local edits must not drop each other). */
let mergeQueued = false;
let remoteDebounceTimer = null;
/** @type {ReturnType<typeof setInterval> | null} */
let periodicSyncId = null;

/** After localStorage saves, upload is debounced so edits reach Firestore without waiting for the 90s page-load throttle. */
const LOCAL_EDIT_MERGE_DEBOUNCE_MS = 2000;
let localEditMergeTimer = null;
let localStorageSaveHookInstalled = false;

/**
 * Any tool that saves to localStorage should trigger a debounced upload. Only a few pages
 * called __lwScheduleAccountMergeAfterLocalChange; without this, cloud listeners can merge
 * while Firestore still has an older payload and overwrite fresh local data.
 */
function installLocalStorageSaveHook() {
  if (localStorageSaveHookInstalled) return;
  localStorageSaveHookInstalled = true;
  try {
    const proto = Storage.prototype;
    const origSet = proto.setItem;
    const origRemove = proto.removeItem;
    proto.setItem = function (key, value) {
      origSet.call(this, key, value);
      if (this === localStorage && shouldSyncKey(key)) {
        scheduleMergeAfterLocalEdit();
      }
    };
    proto.removeItem = function (key) {
      origRemove.call(this, key);
      if (this === localStorage && shouldSyncKey(key)) {
        scheduleMergeAfterLocalEdit();
      }
    };
  } catch (e) {
    console.warn("[Last War Tools] Could not hook localStorage for account sync:", e);
  }
}

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

function clearFirestoreListener() {
  if (remoteDebounceTimer) {
    clearTimeout(remoteDebounceTimer);
    remoteDebounceTimer = null;
  }
  if (unsubFirestore) {
    unsubFirestore();
    unsubFirestore = null;
  }
}

function stopPeriodicSync() {
  if (periodicSyncId != null) {
    clearInterval(periodicSyncId);
    periodicSyncId = null;
  }
}

function startPeriodicSync() {
  stopPeriodicSync();
  periodicSyncId = setInterval(function () {
    if (document.visibilityState !== "visible" || !authRef || !dbRef) return;
    const u = authRef.currentUser;
    if (!u || !u.emailVerified) return;
    void runMergeIfPossible(u);
  }, PERIODIC_SYNC_MS);
}

function clearLocalEditMergeTimer() {
  if (localEditMergeTimer) {
    clearTimeout(localEditMergeTimer);
    localEditMergeTimer = null;
  }
}

/**
 * Call after a tool writes to localStorage (e.g. saveState). Debounced merge+upload.
 * No-op if not signed in, email not verified, or sync not booted.
 */
function scheduleMergeAfterLocalEdit() {
  if (!syncStarted || !authRef) return;
  const u = authRef.currentUser;
  if (!u || !u.emailVerified) return;
  clearLocalEditMergeTimer();
  localEditMergeTimer = setTimeout(async function () {
    localEditMergeTimer = null;
    const u2 = authRef.currentUser;
    if (!u2) return;
    try {
      await reload(u2);
    } catch {
      /* ignore */
    }
    if (!u2.emailVerified) return;
    await runMergeIfPossible(u2);
  }, LOCAL_EDIT_MERGE_DEBOUNCE_MS);
}

/**
 * @param {import("firebase/auth").User} user
 */
async function runMergeIfPossible(user) {
  if (!user || !user.emailVerified || !dbRef) return;
  if (mergeInFlight) {
    mergeQueued = true;
    return;
  }
  mergeInFlight = true;
  try {
    do {
      mergeQueued = false;
      await mergeAndSyncToCloud(user, dbRef, {
        onStatus(msg, kind) {
          if (kind === "error") {
            console.error("[Last War Tools] Account sync:", msg);
            try {
              window.__lwLastAccountSyncError = String(msg || "");
              window.dispatchEvent(
                new CustomEvent("lw-account-sync-error", {
                  detail: { message: String(msg || "") },
                }),
              );
            } catch {
              /* ignore */
            }
          } else if (kind === "ok") {
            try {
              window.__lwLastAccountSyncError = "";
            } catch {
              /* ignore */
            }
          }
        },
      });
      markBackgroundSynced();
      if (mergeQueued) {
        user = authRef.currentUser;
        if (!user || !user.emailVerified) break;
      }
    } while (mergeQueued);
  } catch (e) {
    console.warn("[Last War Tools] Account merge failed:", e);
  } finally {
    mergeInFlight = false;
    mergeQueued = false;
  }
}

function scheduleMergeFromRemote(expectedUid) {
  if (!dbRef || !authRef) return;
  if (remoteDebounceTimer) clearTimeout(remoteDebounceTimer);
  remoteDebounceTimer = setTimeout(async function () {
    remoteDebounceTimer = null;
    const u = authRef.currentUser;
    if (!u || u.uid !== expectedUid || !u.emailVerified) return;
    await runMergeIfPossible(u);
  }, REMOTE_MERGE_DEBOUNCE_MS);
}

/**
 * @param {import("firebase/auth").User} user
 */
function attachFirestoreListener(user) {
  clearFirestoreListener();
  if (!user || !user.emailVerified || !dbRef) return;
  try {
    unsubFirestore = onSnapshot(
      doc(dbRef, SYNC_COLLECTION, user.uid),
      function (snap) {
        if (snap.metadata.hasPendingWrites) return;
        if (!shouldPullCloudBeforeMerge(snap, user.uid)) return;
        scheduleMergeFromRemote(user.uid);
      },
      function (err) {
        console.warn("[Last War Tools] Firestore sync listener:", err);
      },
    );
  } catch (e) {
    console.warn("[Last War Tools] Could not subscribe to cloud sync:", e);
  }
}

function bootAccountSync() {
  if (syncStarted) return true;
  const cfg = window.__FIREBASE_CONFIG__;
  if (!firebaseConfigOk(cfg)) return false;

  try {
    const app = getApps().length ? getApp() : initializeApp(cfg);
    authRef = getAuth(app);
    dbRef = getFirestore(app);
    installLocalStorageSaveHook();

    window.__lwForceAccountMerge = async function () {
      const u = authRef && authRef.currentUser;
      if (!u || !u.emailVerified) {
        throw new Error("Not signed in or email not verified");
      }
      if (!dbRef) throw new Error("Firestore not ready");
      for (var w = 0; w < 40 && mergeInFlight; w++) {
        await new Promise(function (r) {
          setTimeout(r, 50);
        });
      }
      return mergeAndSyncToCloud(u, dbRef, {});
    };

    window.__lwScheduleAccountMergeAfterLocalChange = scheduleMergeAfterLocalEdit;

    document.addEventListener("pagehide", function () {
      if (!syncStarted || !authRef) return;
      if (!localEditMergeTimer) return;
      clearLocalEditMergeTimer();
      const u = authRef.currentUser;
      if (u && u.emailVerified) {
        void runMergeIfPossible(u);
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible" || !syncStarted || !authRef || !dbRef) {
        return;
      }
      const u0 = authRef.currentUser;
      if (!u0) return;
      void (async function () {
        try {
          await reload(u0);
        } catch {
          return;
        }
        const u = authRef.currentUser;
        if (!u || !u.emailVerified) return;
        try {
          const snap = await getDoc(doc(dbRef, SYNC_COLLECTION, u.uid));
          if (shouldPullCloudBeforeMerge(snap, u.uid)) {
            await runMergeIfPossible(u);
          }
        } catch (e) {
          console.warn("[Last War Tools] Visibility sync check failed:", e);
        }
      })();
    });

    onAuthStateChanged(authRef, async function (user) {
      clearFirestoreListener();
      clearLocalEditMergeTimer();
      stopPeriodicSync();
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
      var accountJustChanged = sessionUid !== user.uid;
      var needsPullFromCloud = false;
      if (user.emailVerified) {
        try {
          var cloudSnap = await getDoc(doc(dbRef, SYNC_COLLECTION, user.uid));
          needsPullFromCloud = shouldPullCloudBeforeMerge(cloudSnap, user.uid);
        } catch (peekErr) {
          needsPullFromCloud = true;
        }
      }
      if (
        user.emailVerified &&
        (accountJustChanged || needsPullFromCloud || shouldRunBackgroundSync())
      ) {
        await runMergeIfPossible(user);
        try {
          sessionStorage.setItem(SESSION_SYNCED_UID_KEY, user.uid);
        } catch {
          /* ignore */
        }
      } else if (user && !user.emailVerified) {
        console.info(
          "[Last War Tools] Cloud sync skipped: verify your email to merge data across devices.",
        );
      }
      attachFirestoreListener(user);
      if (user.emailVerified) {
        startPeriodicSync();
      }
      try {
        await loadAndApplyUserProfile(user, dbRef);
      } catch (e) {
        console.warn("[Last War Tools] Profile load failed:", e);
      }
    });

    window.__lwAccountSyncDiagnostics = function () {
      const u = authRef && authRef.currentUser;
      return {
        configOk: firebaseConfigOk(window.__FIREBASE_CONFIG__),
        syncStarted,
        uid: u ? u.uid : null,
        emailVerified: !!(u && u.emailVerified),
        lastError: (function () {
          try {
            return window.__lwLastAccountSyncError || null;
          } catch {
            return null;
          }
        })(),
      };
    };

    syncStarted = true;
    return true;
  } catch (e) {
    console.warn("[Last War Tools] Account sync could not start:", e);
    authRef = null;
    dbRef = null;
    return false;
  }
}

(function startBootRetry() {
  if (bootAccountSync()) return;
  var n = 0;
  var id = setInterval(function () {
    n++;
    if (bootAccountSync()) {
      clearInterval(id);
      return;
    }
    if (n >= BOOT_POLL_MAX) {
      clearInterval(id);
      if (!firebaseConfigOk(window.__FIREBASE_CONFIG__)) {
        console.warn(
          "[Last War Tools] Account sync disabled: deploy firebase-config.js (copy from firebase-config.example.js) with a real apiKey and projectId. Without it, data will not sync across devices.",
        );
      }
    }
  }, BOOT_POLL_MS);
})();
