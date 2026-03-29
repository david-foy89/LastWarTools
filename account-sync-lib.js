/**
 * Shared merge + upload logic for optional Last War Tools account sync.
 * Used by account.html and account-sync-global.js (background sync on other pages).
 */
import { reload } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export const SYNC_COLLECTION = "userLocalStorageSync";
export const MAX_PAYLOAD_CHARS = 900000;

/** Fired on `window` after cloud merge writes localStorage (same-tab; `storage` event does not run in the writer). */
export const LOCALSTORAGE_SYNCED_EVENT = "lw-localstorage-synced";

/** Device-local only (never uploaded) — used for cross-device merge tie-breaking */
export const LS_LAST_MERGED_CLOUD_MS = "lwLastMergedCloudDocMs";
export const LS_LAST_MERGED_UID = "lwAccountLastMergedUid";

export function firebaseConfigOk(cfg) {
  if (!cfg || typeof cfg !== "object") return false;
  const k = String(cfg.apiKey || "");
  const pid = String(cfg.projectId || "");
  if (!k || k.includes("YOUR_")) return false;
  if (!pid || pid.includes("YOUR_")) return false;
  return true;
}

export function shouldSyncKey(key) {
  const k = String(key || "");
  if (!k) return false;
  if (k.startsWith("firebase:")) return false;
  if (k.startsWith("firebase.")) return false;
  if (k.toLowerCase().includes("firebaselocalstorage")) return false;
  if (k === "lwAccountBackgroundSyncAt") return false;
  if (k === LS_LAST_MERGED_CLOUD_MS || k === LS_LAST_MERGED_UID) return false;
  return true;
}

export function collectSyncableLocalStorage() {
  const out = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !shouldSyncKey(key)) continue;
    const val = localStorage.getItem(key);
    if (val === null) continue;
    out[key] = val;
  }
  return out;
}

export function applyLocalStoragePayload(obj) {
  if (!obj || typeof obj !== "object") return 0;
  let n = 0;
  const changedKeys = [];
  Object.keys(obj).forEach((key) => {
    if (!shouldSyncKey(key)) return;
    try {
      localStorage.setItem(key, String(obj[key]));
      n += 1;
      changedKeys.push(key);
    } catch {
      // quota or private mode
    }
  });
  if (changedKeys.length > 0 && typeof window !== "undefined") {
    try {
      window.dispatchEvent(
        new CustomEvent(LOCALSTORAGE_SYNCED_EVENT, {
          detail: { keys: changedKeys },
        }),
      );
    } catch {
      /* ignore */
    }
  }
  return n;
}

export function parseCloudDataFromSnap(snap) {
  if (!snap || !snap.exists()) return {};
  const raw = snap.data();
  const payloadStr = raw && typeof raw.payload === "string" ? raw.payload : "";
  if (!payloadStr) return {};
  try {
    const parsed = JSON.parse(payloadStr);
    const blob =
      parsed && parsed.data && typeof parsed.data === "object" ? parsed.data : null;
    return blob || {};
  } catch {
    return {};
  }
}

/** Firestore server `updatedAt` in ms, or 0 if missing / no doc */
export function getCloudDocumentWriteMs(snap) {
  if (!snap || !snap.exists()) return 0;
  const u = snap.data()?.updatedAt;
  if (u && typeof u.toMillis === "function") return u.toMillis();
  return 0;
}

function readLastMergedMeta() {
  let lastMs = 0;
  let uid = "";
  try {
    lastMs = Number(localStorage.getItem(LS_LAST_MERGED_CLOUD_MS) || "0");
  } catch {
    lastMs = 0;
  }
  try {
    uid = String(localStorage.getItem(LS_LAST_MERGED_UID) || "");
  } catch {
    uid = "";
  }
  return { lastMs, uid };
}

function writeLastMergedMeta(uid, ms) {
  try {
    localStorage.setItem(LS_LAST_MERGED_UID, String(uid || ""));
    localStorage.setItem(LS_LAST_MERGED_CLOUD_MS, String(ms || 0));
  } catch {
    /* ignore */
  }
}

/**
 * True if background sync should run even when the 90s throttle would skip it
 * (another device uploaded, or this browser never applied this account’s cloud payload).
 * @param {object} [cloudDataAlreadyParsed] optional result of parseCloudDataFromSnap(snap)
 */
export function shouldPullCloudBeforeMerge(snap, userUid, cloudDataAlreadyParsed) {
  const cloudData =
    cloudDataAlreadyParsed && typeof cloudDataAlreadyParsed === "object"
      ? cloudDataAlreadyParsed
      : parseCloudDataFromSnap(snap);
  const cloudWriteMs = getCloudDocumentWriteMs(snap);
  const { lastMs: lastMergedRaw, uid: lastMergedUid } = readLastMergedMeta();
  const lastMergedMs = Number.isFinite(lastMergedRaw) ? lastMergedRaw : 0;
  const hasCloudPayload =
    snap && snap.exists() && Object.keys(cloudData).length > 0;

  if (!snap || !snap.exists()) {
    return false;
  }
  if (lastMergedUid && lastMergedUid !== userUid) {
    return true;
  }
  if (!hasCloudPayload || cloudWriteMs <= 0) {
    return false;
  }
  if (!lastMergedUid) {
    return true;
  }
  if (!Number.isFinite(lastMergedRaw)) {
    return true;
  }
  /**
   * Prefer cloud only when Firestore updatedAt is strictly newer than our last
   * recorded merge. Do not use "lastMergedMs <= 0" as "never pulled" — that
   * trapped devices into always preferring cloud so the other device could
   * never win on overlapping keys (one-way sync).
   */
  return cloudWriteMs > lastMergedMs;
}

/**
 * @param {object} user Firebase user (must have uid)
 * @param {import("https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js").Firestore} db
 * @param {{ onStatus?: (msg: string, kind?: string) => void }} [options]
 */
export async function mergeAndSyncToCloud(user, db, options) {
  const opts = options || {};
  const onStatus =
    typeof opts.onStatus === "function"
      ? opts.onStatus
      : function () {
          /* silent */
        };

  if (!db || !user || !user.uid) return;

  try {
    await reload(user);
  } catch (e) {
    console.warn("[Last War Tools] reload before merge:", e);
  }
  if (!user.emailVerified) {
    onStatus("Verify your email to sync. Check your inbox for the verification link.", "error");
    return;
  }

  onStatus("Syncing (merge cloud + this device)…", "progress");

  const local = collectSyncableLocalStorage();
  let snap = null;
  let cloudData = {};
  try {
    snap = await getDoc(doc(db, SYNC_COLLECTION, user.uid));
    cloudData = parseCloudDataFromSnap(snap);
  } catch (e) {
    onStatus(
      (e && e.message ? e.message : "Could not read cloud data.") +
        " Check Firestore rules.",
      "error",
    );
    return;
  }

  const preferCloud = shouldPullCloudBeforeMerge(snap, user.uid, cloudData);

  let merged;
  if (preferCloud) {
    merged = Object.assign({}, local, cloudData);
  } else {
    merged = Object.assign({}, cloudData, local);
  }

  applyLocalStoragePayload(merged);
  const json = JSON.stringify({ v: 1, data: merged });
  if (json.length > MAX_PAYLOAD_CHARS) {
    onStatus(
      "Merged data is too large for one upload. Clear some tool data and try again.",
      "error",
    );
    return;
  }

  const existingPayloadStr =
    snap && snap.exists() && typeof snap.data()?.payload === "string"
      ? snap.data().payload
      : "";
  if (existingPayloadStr && existingPayloadStr === json) {
    const ms = getCloudDocumentWriteMs(snap);
    if (ms) {
      writeLastMergedMeta(user.uid, ms);
    }
    onStatus("In sync with cloud (no upload needed).", "ok");
    return;
  }

  try {
    await setDoc(doc(db, SYNC_COLLECTION, user.uid), {
      payload: json,
      updatedAt: serverTimestamp(),
      client: "last-war-tools-account",
    });
    let verify = await getDoc(doc(db, SYNC_COLLECTION, user.uid));
    let newMs = getCloudDocumentWriteMs(verify);
    for (let attempt = 0; attempt < 12 && !newMs; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, 250 + attempt * 150));
      }
      verify = await getDoc(doc(db, SYNC_COLLECTION, user.uid));
      newMs = getCloudDocumentWriteMs(verify);
    }
    if (newMs) {
      writeLastMergedMeta(user.uid, newMs);
    }
    const note = preferCloud
      ? "Cloud data was merged into this device (then saved back)."
      : "This device’s data was merged up (local wins when cloud was not newer).";
    onStatus(
      `Synced ${Object.keys(merged).length} key(s). ${note}`,
      "ok",
    );
  } catch (e) {
    onStatus(
      (e && e.message ? e.message : "Upload failed.") +
        " Check Firestore rules and Authentication.",
      "error",
    );
  }
}
