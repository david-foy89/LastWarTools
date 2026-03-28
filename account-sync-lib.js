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

export function firebaseConfigOk(cfg) {
  if (!cfg || typeof cfg !== "object") return false;
  const k = String(cfg.apiKey || "");
  if (!k || k.includes("YOUR_")) return false;
  return true;
}

export function shouldSyncKey(key) {
  const k = String(key || "");
  if (!k) return false;
  if (k.startsWith("firebase:")) return false;
  if (k.startsWith("firebase.")) return false;
  if (k.toLowerCase().includes("firebaselocalstorage")) return false;
  if (k === "lwAccountBackgroundSyncAt") return false;
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
  Object.keys(obj).forEach((key) => {
    if (!shouldSyncKey(key)) return;
    try {
      localStorage.setItem(key, String(obj[key]));
      n += 1;
    } catch {
      // quota or private mode
    }
  });
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
  let cloudData = {};
  try {
    const snap = await getDoc(doc(db, SYNC_COLLECTION, user.uid));
    cloudData = parseCloudDataFromSnap(snap);
  } catch (e) {
    onStatus(
      (e && e.message ? e.message : "Could not read cloud data.") +
        " Check Firestore rules.",
      "error",
    );
    return;
  }

  const merged = Object.assign({}, cloudData, local);
  applyLocalStoragePayload(merged);
  const json = JSON.stringify({ v: 1, data: merged });
  if (json.length > MAX_PAYLOAD_CHARS) {
    onStatus(
      "Merged data is too large for one upload. Clear some tool data and try again.",
      "error",
    );
    return;
  }

  try {
    await setDoc(doc(db, SYNC_COLLECTION, user.uid), {
      payload: json,
      updatedAt: serverTimestamp(),
      client: "last-war-tools-account",
    });
    onStatus(
      `Synced ${Object.keys(merged).length} key(s). Cloud and this device match (this device wins on duplicate keys).`,
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
