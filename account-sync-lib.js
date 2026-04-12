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

/** Train Conductor schedule (`train-conductor-schedule.html`) — merge by `savedAt`, not raw assign order. */
export const TRAIN_CONDUCTOR_STORAGE_KEY = "lastWarTrainConductorV1";

/** Rare Soil War Tracker (`rare-soil-war-tracker.html`) — merge by `savedAt` on the stored JSON. */
export const RARE_SOIL_WAR_TRACKER_STORAGE_KEY = "lastwar-rare-soil-war-tracker-v1";

/** Spice War Tracker (`spice-war-tracker.html`) — merge by `savedAt` on the stored JSON. */
export const SPICE_WAR_TRACKER_STORAGE_KEY = "lastwar-spice-war-tracker-v1";

/** Copper War Tracker (`copper-war-tracker.html`) — merge by `savedAt` on the stored JSON. */
export const COPPER_WAR_TRACKER_STORAGE_KEY = "lastwar-copper-war-tracker-v1";

/**
 * When both devices have schedule data, prefer the payload with the newer `savedAt` (ms).
 * Legacy payloads without `savedAt` use length as a weak tie-break (richer schedule wins).
 * @param {string} localVal
 * @param {string} cloudVal
 */
export function pickNewerTrainConductorPayload(localVal, cloudVal) {
  const parse = (s) => {
    try {
      const o = JSON.parse(s);
      const t = Number(o.savedAt);
      return {
        raw: s,
        t: Number.isFinite(t) && t > 0 ? t : 0,
        len: String(s || "").length,
      };
    } catch {
      return { raw: s, t: 0, len: String(s || "").length };
    }
  };
  const a = parse(localVal);
  const b = parse(cloudVal);
  if (a.t !== b.t) return a.t > b.t ? a.raw : b.raw;
  return a.len >= b.len ? a.raw : b.raw;
}

/**
 * When both devices have Rare Soil data, prefer the payload with the newer `savedAt` (ms).
 * Legacy payloads without `savedAt` use length as a weak tie-break.
 * @param {string} localVal
 * @param {string} cloudVal
 */
export function pickNewerRareSoilWarTrackerPayload(localVal, cloudVal) {
  const parse = (s) => {
    try {
      const o = JSON.parse(s);
      const t = Number(o.savedAt);
      return {
        raw: s,
        t: Number.isFinite(t) && t > 0 ? t : 0,
        len: String(s || "").length,
      };
    } catch {
      return { raw: s, t: 0, len: String(s || "").length };
    }
  };
  const a = parse(localVal);
  const b = parse(cloudVal);
  if (a.t !== b.t) return a.t > b.t ? a.raw : b.raw;
  return a.len >= b.len ? a.raw : b.raw;
}

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

/** Sort keys so the same localStorage data stringifies identically on every browser. */
function sortStorageDataObject(obj) {
  const out = {};
  const keys = Object.keys(obj || {}).sort();
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    out[k] = obj[k];
  }
  return out;
}

export function buildCanonicalSyncPayloadString(merged) {
  const data =
    merged && typeof merged === "object" ? sortStorageDataObject(merged) : {};
  return JSON.stringify({ v: 1, data });
}

/** True if Firestore payload string matches merged data (ignores JSON key order). */
export function syncPayloadsAreEquivalent(storedPayloadStr, canonicalPayloadStr) {
  if (!storedPayloadStr || !canonicalPayloadStr) return false;
  if (storedPayloadStr === canonicalPayloadStr) return true;
  try {
    const a = JSON.parse(storedPayloadStr);
    const b = JSON.parse(canonicalPayloadStr);
    const ad = a?.data && typeof a.data === "object" ? a.data : null;
    const bd = b?.data && typeof b.data === "object" ? b.data : null;
    if (!ad || !bd) return false;
    const ka = Object.keys(ad).sort();
    const kb = Object.keys(bd).sort();
    if (ka.length !== kb.length) return false;
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return false;
      if (String(ad[ka[i]]) !== String(bd[kb[i]])) return false;
    }
    return true;
  } catch {
    return false;
  }
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

  if (local[TRAIN_CONDUCTOR_STORAGE_KEY] && cloudData[TRAIN_CONDUCTOR_STORAGE_KEY]) {
    merged[TRAIN_CONDUCTOR_STORAGE_KEY] = pickNewerTrainConductorPayload(
      local[TRAIN_CONDUCTOR_STORAGE_KEY],
      cloudData[TRAIN_CONDUCTOR_STORAGE_KEY],
    );
  }

  if (local[RARE_SOIL_WAR_TRACKER_STORAGE_KEY] && cloudData[RARE_SOIL_WAR_TRACKER_STORAGE_KEY]) {
    merged[RARE_SOIL_WAR_TRACKER_STORAGE_KEY] = pickNewerRareSoilWarTrackerPayload(
      local[RARE_SOIL_WAR_TRACKER_STORAGE_KEY],
      cloudData[RARE_SOIL_WAR_TRACKER_STORAGE_KEY],
    );
  }

  if (local[SPICE_WAR_TRACKER_STORAGE_KEY] && cloudData[SPICE_WAR_TRACKER_STORAGE_KEY]) {
    merged[SPICE_WAR_TRACKER_STORAGE_KEY] = pickNewerRareSoilWarTrackerPayload(
      local[SPICE_WAR_TRACKER_STORAGE_KEY],
      cloudData[SPICE_WAR_TRACKER_STORAGE_KEY],
    );
  }

  if (local[COPPER_WAR_TRACKER_STORAGE_KEY] && cloudData[COPPER_WAR_TRACKER_STORAGE_KEY]) {
    merged[COPPER_WAR_TRACKER_STORAGE_KEY] = pickNewerRareSoilWarTrackerPayload(
      local[COPPER_WAR_TRACKER_STORAGE_KEY],
      cloudData[COPPER_WAR_TRACKER_STORAGE_KEY],
    );
  }

  applyLocalStoragePayload(merged);
  const json = buildCanonicalSyncPayloadString(merged);
  if (json.length > MAX_PAYLOAD_CHARS) {
    onStatus(
      "Merged data is too large for one upload. Clear some tool data and try again.",
      "error",
    );
    return;
  }

  let existingPayloadStr = "";
  if (snap && snap.exists()) {
    const d = snap.data();
    if (d && typeof d.payload === "string") existingPayloadStr = d.payload;
  }
  if (existingPayloadStr && syncPayloadsAreEquivalent(existingPayloadStr, json)) {
    const ms = getCloudDocumentWriteMs(snap);
    // Always record uid + server time (or 0). Skipping when updatedAt was missing left
    // lastMergedUid unset so shouldPullCloudBeforeMerge always preferred cloud over local.
    writeLastMergedMeta(user.uid, ms || 0);
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
    writeLastMergedMeta(user.uid, newMs || 0);
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
