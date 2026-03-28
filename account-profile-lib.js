/**
 * User profile (Firestore) + localStorage keys for tools: timezone, alliance, server, alliance list, avatar.
 */
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export const PROFILE_COLLECTION = "userProfiles";

/** Synced to localStorage so calculators can read without Firestore */
export const LS_TIMEZONE = "lwProfileTimezone";
export const LS_ALLIANCE = "lwProfileAllianceName";
export const LS_SERVER = "lwProfileServerNumber";
export const LS_ALLIANCE_LIST = "lwAllianceListJson";
export const LS_USERNAME = "lwProfileUsername";

/** Max base64 length stored in Firestore (~220KB JPEG) */
export const MAX_AVATAR_DATA_URL_CHARS = 450000;

export const MAX_ALLIANCE_ROWS = 500;

function normalizeProfile(d) {
  if (!d || typeof d !== "object") {
    return emptyProfile();
  }
  const list = Array.isArray(d.allianceList) ? d.allianceList : [];
  return {
    username: typeof d.username === "string" ? d.username : "",
    timezone: typeof d.timezone === "string" ? d.timezone : "",
    allianceName: typeof d.allianceName === "string" ? d.allianceName : "",
    serverNumber: typeof d.serverNumber === "string" ? d.serverNumber : "",
    allianceList: list.slice(0, MAX_ALLIANCE_ROWS).map((row) => {
      if (row && typeof row === "object") return { ...row };
      return { name: String(row) };
    }),
    avatarDataUrl: typeof d.avatarDataUrl === "string" ? d.avatarDataUrl : "",
  };
}

export function emptyProfile() {
  return {
    username: "",
    timezone: "",
    allianceName: "",
    serverNumber: "",
    allianceList: [],
    avatarDataUrl: "",
  };
}

/**
 * One character for nav/promo account chips when no avatar: first char of username, else first
 * alphanumeric of the email local-part. Shared by account-nav-chip.js and account-auth-modal.js.
 */
export function accountChipInitialDisplay(username, email) {
  var u = String(username || "").trim();
  if (u) {
    var ch = u.charAt(0);
    return ch ? ch.toUpperCase() : "?";
  }
  var e = String(email || "").trim();
  var at = e.indexOf("@");
  var local = at >= 0 ? e.slice(0, at) : e;
  var m = local.match(/[a-zA-Z0-9]/);
  return m ? m[0].toUpperCase() : "?";
}

/**
 * Load profile from Firestore and write tool-facing keys to localStorage.
 */
export async function loadAndApplyUserProfile(user, db) {
  if (!user?.uid || !db) return null;
  try {
    const snap = await getDoc(doc(db, PROFILE_COLLECTION, user.uid));
    if (!snap.exists()) return null;
    const profile = normalizeProfile(snap.data());
    applyProfileToLocalStorage(profile);
    return profile;
  } catch (e) {
    console.warn("[Last War Tools] Profile load failed:", e);
    return null;
  }
}

export function applyProfileToLocalStorage(profile) {
  if (!profile) return;
  try {
    localStorage.setItem(LS_USERNAME, profile.username || "");
    localStorage.setItem(LS_TIMEZONE, profile.timezone || "");
    localStorage.setItem(LS_ALLIANCE, profile.allianceName || "");
    localStorage.setItem(LS_SERVER, profile.serverNumber || "");
    localStorage.setItem(LS_ALLIANCE_LIST, JSON.stringify(profile.allianceList || []));
  } catch (e) {
    console.warn("[Last War Tools] applyProfileToLocalStorage:", e);
  }
}

/**
 * @param {{ timezone?: string, allianceName?: string, serverNumber?: string, allianceList?: object[], avatarDataUrl?: string | null, removeAvatar?: boolean }} profileData
 */
export async function saveUserProfile(user, db, profileData) {
  if (!user?.uid || !db) throw new Error("Not signed in or database unavailable");
  if (!user.emailVerified) {
    throw new Error("Verify your email before saving profile.");
  }

  const ref = doc(db, PROFILE_COLLECTION, user.uid);
  const data = {
    timezone: String(profileData.timezone || "").slice(0, 128),
    allianceName: String(profileData.allianceName || "").slice(0, 200),
    serverNumber: String(profileData.serverNumber || "").slice(0, 64),
    allianceList: Array.isArray(profileData.allianceList)
      ? profileData.allianceList.slice(0, MAX_ALLIANCE_ROWS)
      : [],
    updatedAt: serverTimestamp(),
    client: "last-war-tools-account",
  };

  if (profileData.removeAvatar) {
    data.avatarDataUrl = deleteField();
  } else if (
    typeof profileData.avatarDataUrl === "string" &&
    profileData.avatarDataUrl.length > 0 &&
    profileData.avatarDataUrl.length <= MAX_AVATAR_DATA_URL_CHARS
  ) {
    data.avatarDataUrl = profileData.avatarDataUrl;
  }

  await setDoc(ref, data, { merge: true });

  const applied = {
    username: localStorage.getItem(LS_USERNAME) || "",
    timezone: data.timezone,
    allianceName: data.allianceName,
    serverNumber: data.serverNumber,
    allianceList: data.allianceList,
    avatarDataUrl: profileData.removeAvatar
      ? ""
      : typeof profileData.avatarDataUrl === "string"
        ? profileData.avatarDataUrl
        : "",
  };
  applyProfileToLocalStorage(applied);
}

/** Resize image to JPEG data URL for Firestore storage */
export function resizeImageFileToDataUrl(file, maxDim, maxChars) {
  return new Promise(function (resolve, reject) {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      reject(new Error("Choose an image file."));
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = function () {
      URL.revokeObjectURL(url);
      let w = img.naturalWidth || img.width;
      let h = img.naturalHeight || img.height;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      w = Math.max(1, Math.round(w * scale));
      h = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not read image."));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      let q = 0.82;
      let dataUrl = canvas.toDataURL("image/jpeg", q);
      let guard = 0;
      while (dataUrl.length > maxChars && q > 0.35 && guard < 25) {
        q -= 0.06;
        dataUrl = canvas.toDataURL("image/jpeg", q);
        guard += 1;
      }
      if (dataUrl.length > maxChars) {
        reject(new Error("Image is still too large. Try a smaller photo."));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image."));
    };
    img.src = url;
  });
}

/** Simple CSV line split (RFC 4180-style: commas inside "...", "" → literal ") */
function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let i = 0;
  let inQuotes = false;
  while (i < line.length) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cur += c;
      i++;
    } else {
      if (c === '"') {
        inQuotes = true;
        i++;
      } else if (c === "," || c === "\t") {
        out.push(cur.trim());
        cur = "";
        i++;
      } else {
        cur += c;
        i++;
      }
    }
  }
  out.push(cur.trim());
  return out;
}

/**
 * Parse CSV text into an array of row objects (first row = headers).
 */
export function parseAllianceCsv(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];
  const headers = splitCsvLine(lines[0]).map(function (h, idx) {
    return h || "col" + idx;
  });
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const row = {};
    headers.forEach(function (h, j) {
      row[h] = cells[j] != null ? String(cells[j]) : "";
    });
    rows.push(row);
  }
  return rows.slice(0, MAX_ALLIANCE_ROWS);
}

/** Requires global XLSX (SheetJS) */
export function parseAllianceXlsxArrayBuffer(buf) {
  const XLSX = typeof window !== "undefined" ? window.XLSX : null;
  if (!XLSX || !XLSX.read) {
    throw new Error("Spreadsheet library not loaded.");
  }
  const wb = XLSX.read(buf, { type: "array" });
  const name = wb.SheetNames[0];
  if (!name) return [];
  const sheet = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
  if (!Array.isArray(rows)) return [];
  return rows.slice(0, MAX_ALLIANCE_ROWS);
}

function escapeCsvField(field) {
  const v = field != null ? String(field) : "";
  if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}

export function allianceListToCsv(rows) {
  if (!rows || rows.length === 0) return "name,server\n";
  const keys = Object.keys(rows[0]);
  const header = keys.map(function (k) {
    return escapeCsvField(k);
  }).join(",");
  const lines = [header];
  rows.forEach(function (row) {
    lines.push(
      keys
        .map(function (k) {
          return escapeCsvField(row[k]);
        })
        .join(","),
    );
  });
  return lines.join("\n") + "\n";
}

export function downloadTextFile(filename, text, mime) {
  const blob = new Blob([text], { type: mime || "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/** Requires global XLSX */
export function downloadAllianceXlsx(rows, filename) {
  const XLSX = typeof window !== "undefined" ? window.XLSX : null;
  if (!XLSX || !XLSX.utils) {
    throw new Error("Spreadsheet library not loaded.");
  }
  const safeName = filename || "last-war-alliance-list.xlsx";
  const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ name: "", server: "" }]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Alliance list");
  XLSX.writeFile(wb, safeName);
}

/** Build <option> list for timezones */
export function getTimezoneOptionElements(doc) {
  const d = doc || document;
  let zones = [];
  try {
    if (typeof Intl !== "undefined" && Intl.supportedValuesOf) {
      zones = Intl.supportedValuesOf("timeZone");
    }
  } catch (_) {
    zones = [];
  }
  if (!zones.length) {
    zones = [
      "UTC",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Australia/Sydney",
    ];
  }
  const frag = d.createDocumentFragment();
  const opt0 = d.createElement("option");
  opt0.value = "";
  opt0.textContent = "— Select timezone —";
  frag.appendChild(opt0);
  zones.sort().forEach(function (z) {
    const opt = d.createElement("option");
    opt.value = z;
    opt.textContent = z;
    frag.appendChild(opt);
  });
  return frag;
}
