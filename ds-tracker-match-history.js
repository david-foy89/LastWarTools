/**
 * Desert Storm tracker: Match history — our vs opponent lineup/plan + opponent intel per match date.
 * Stored in localStorage (dsMatchHistoryByWeekV1) keyed by calendar date (YYYY-MM-DD). Same sign-in gate as Desert Storm Mail.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfigOk } from "./account-sync-lib.js";

const LS_KEY = "dsMatchHistoryByWeekV1";
const OPPONENTS_LS_KEY = "dsSavedOpponentsV1";

const openBtn = document.getElementById("dsMatchHistoryBtn");
const modal = document.getElementById("dsMatchHistoryModal");
const closeBtn = document.getElementById("dsMatchHistoryModalCloseBtn");
const statusEl = document.getElementById("dsMatchHistoryStatus");
const weekInput = document.getElementById("dsMatchHistoryWeekStart");
const saveBtn = document.getElementById("dsMatchHistorySaveBtn");
const weekListEl = document.getElementById("dsMatchHistoryWeekList");
const searchOppEl = document.getElementById("dsMatchHistorySearchOpp");
const selectVisibleBtn = document.getElementById("dsMatchHistorySelectVisibleBtn");
const clearSelBtn = document.getElementById("dsMatchHistoryClearSelBtn");
const compareBtn = document.getElementById("dsMatchHistoryCompareBtn");
const addCompareBtn = document.getElementById("dsMatchHistoryAddCompareBtn");
const deleteSavedBtn = document.getElementById("dsMatchHistoryDeleteSavedBtn");
const comparePanel = document.getElementById("dsMatchHistoryComparePanel");
const compareTitle = document.getElementById("dsMatchHistoryCompareTitle");
const compareScroll = document.getElementById("dsMatchHistoryCompareScroll");
const compareHideBtn = document.getElementById("dsMatchHistoryCompareHideBtn");
const ourLineup = document.getElementById("dsMHOurLineup");
const ourPlan = document.getElementById("dsMHOurPlan");
const theirLineup = document.getElementById("dsMHTheirLineup");
const theirPlan = document.getElementById("dsMHTheirPlan");
const oppName = document.getElementById("dsMHOpponentName");
const oppServer = document.getElementById("dsMHOpponentServer");
const oppPower = document.getElementById("dsMHOpponentAlliancePower");
const matchResultWinCb = document.getElementById("dsMHResultWin");
const matchResultLossCb = document.getElementById("dsMHResultLoss");
const allianceRecordEl = document.getElementById("dsMHAllianceRecord");

var previousActiveElement = null;

function normalizeMatchResult(v) {
  var s = String(v || "").trim().toLowerCase();
  if (s === "win" || s === "loss") return s;
  return "";
}

function matchResultListSuffix(mr) {
  if (mr === "win") return " · W";
  if (mr === "loss") return " · L";
  return "";
}

function matchResultComparePrefix(mr) {
  if (mr === "win") return "Win · ";
  if (mr === "loss") return "Loss · ";
  return "";
}

function applyMatchResultCheckboxes(mr) {
  var v = normalizeMatchResult(mr);
  if (matchResultWinCb) matchResultWinCb.checked = v === "win";
  if (matchResultLossCb) matchResultLossCb.checked = v === "loss";
}

function readMatchResultFromCheckboxes() {
  if (matchResultWinCb && matchResultWinCb.checked) return "win";
  if (matchResultLossCb && matchResultLossCb.checked) return "loss";
  return "";
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatYmd(d) {
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

/** Validates YYYY-MM-DD and rejects impossible calendar dates (e.g. Feb 30). */
function normalizeMatchDateKey(ymd) {
  const s = String(ymd || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const d = new Date(s + "T12:00:00");
  if (!Number.isFinite(d.getTime())) return "";
  if (formatYmd(d) !== s) return "";
  return s;
}

function readStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const o = raw ? JSON.parse(raw) : {};
    return o && typeof o === "object" ? o : {};
  } catch (_) {
    return {};
  }
}

function writeStore(o) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(o));
    return true;
  } catch (e) {
    if (statusEl) {
      statusEl.textContent =
        e && e.name === "QuotaExceededError" ? "Storage full — could not save." : "Could not save.";
    }
    return false;
  }
}

function readOpponentsStore() {
  try {
    const raw = localStorage.getItem(OPPONENTS_LS_KEY);
    const o = raw ? JSON.parse(raw) : {};
    return o && typeof o === "object" ? o : {};
  } catch (_) {
    return {};
  }
}

function writeOpponentsStore(o) {
  try {
    localStorage.setItem(OPPONENTS_LS_KEY, JSON.stringify(o));
    return true;
  } catch (e) {
    if (statusEl) {
      statusEl.textContent =
        e && e.name === "QuotaExceededError"
          ? "Storage full — could not save opponent."
          : "Could not save opponent.";
    }
    return false;
  }
}

function opponentKeyFromNameServer(name, server) {
  return String(name || "").trim().toLowerCase() + "|" + String(server || "").trim().toLowerCase();
}

function emptyWeekRecord() {
  return {
    opponentName: "",
    opponentServer: "",
    ourLineup: "",
    ourPlan: "",
    theirLineup: "",
    theirPlan: "",
    opponentAlliancePower: "",
    opponentTop5: [
      { name: "", power: "" },
      { name: "", power: "" },
      { name: "", power: "" },
      { name: "", power: "" },
      { name: "", power: "" },
    ],
    matchResult: "",
  };
}

function normalizeWeekRecord(d) {
  const e = emptyWeekRecord();
  if (!d || typeof d !== "object") return e;
  e.ourLineup = typeof d.ourLineup === "string" ? d.ourLineup : "";
  e.ourPlan = typeof d.ourPlan === "string" ? d.ourPlan : "";
  e.opponentName = typeof d.opponentName === "string" ? d.opponentName : "";
  e.opponentServer = typeof d.opponentServer === "string" ? d.opponentServer : "";
  e.theirLineup = typeof d.theirLineup === "string" ? d.theirLineup : "";
  e.theirPlan = typeof d.theirPlan === "string" ? d.theirPlan : "";
  e.opponentAlliancePower = typeof d.opponentAlliancePower === "string" ? d.opponentAlliancePower : "";
  e.matchResult = normalizeMatchResult(d.matchResult);
  const t5 = Array.isArray(d.opponentTop5) ? d.opponentTop5 : [];
  for (let i = 0; i < 5; i++) {
    const row = t5[i];
    if (row && typeof row === "object") {
      e.opponentTop5[i] = {
        name: row.name != null ? String(row.name) : "",
        power: row.power != null ? String(row.power) : "",
      };
    }
  }
  return e;
}

function readTop5FromDom() {
  const out = [];
  for (let i = 0; i < 5; i++) {
    const n = document.querySelector('.ds-mh-op-name[data-idx="' + i + '"]');
    const p = document.querySelector('.ds-mh-op-power[data-idx="' + i + '"]');
    out.push({
      name: n ? String(n.value || "") : "",
      power: p ? String(p.value || "") : "",
    });
  }
  return out;
}

function applyTop5ToDom(rows) {
  const arr = Array.isArray(rows) ? rows : [];
  for (let i = 0; i < 5; i++) {
    const r = arr[i] || {};
    const n = document.querySelector('.ds-mh-op-name[data-idx="' + i + '"]');
    const p = document.querySelector('.ds-mh-op-power[data-idx="' + i + '"]');
    if (n) n.value = r.name != null ? String(r.name) : "";
    if (p) p.value = r.power != null ? String(r.power) : "";
  }
}

function applyRecordToForm(rec) {
  const r = normalizeWeekRecord(rec);
  if (oppName) oppName.value = r.opponentName || "";
  if (oppServer) oppServer.value = r.opponentServer || "";
  if (ourLineup) ourLineup.value = r.ourLineup;
  if (ourPlan) ourPlan.value = r.ourPlan;
  if (theirLineup) theirLineup.value = r.theirLineup;
  if (theirPlan) theirPlan.value = r.theirPlan;
  if (oppPower) oppPower.value = r.opponentAlliancePower;
  applyMatchResultCheckboxes(r.matchResult);
  applyTop5ToDom(r.opponentTop5);
}

/** Fills opponent name, server, intel, and top 5 only—does not change our lineup/plan or match result. */
function applyOpponentIntelToForm(intel) {
  const r = normalizeWeekRecord(intel);
  if (oppName) oppName.value = r.opponentName || "";
  if (oppServer) oppServer.value = r.opponentServer || "";
  if (oppPower) oppPower.value = r.opponentAlliancePower || "";
  if (theirLineup) theirLineup.value = r.theirLineup || "";
  if (theirPlan) theirPlan.value = r.theirPlan || "";
  applyTop5ToDom(r.opponentTop5);
}

function readRecordFromForm() {
  return {
    ourLineup: ourLineup ? String(ourLineup.value || "") : "",
    ourPlan: ourPlan ? String(ourPlan.value || "") : "",
    opponentName: oppName ? String(oppName.value || "").trim() : "",
    opponentServer: oppServer ? String(oppServer.value || "").trim() : "",
    theirLineup: theirLineup ? String(theirLineup.value || "") : "",
    theirPlan: theirPlan ? String(theirPlan.value || "") : "",
    opponentAlliancePower: oppPower ? String(oppPower.value || "").trim() : "",
    matchResult: readMatchResultFromCheckboxes(),
    opponentTop5: readTop5FromDom(),
  };
}

/** Week keys checked for multi-compare (persists when the list is filtered). */
const selectedForCompare = new Set();

function searchQueryNormalized() {
  return String(searchOppEl ? searchOppEl.value || "" : "")
    .trim()
    .toLowerCase();
}

function sortedWeekKeysFromStore(store) {
  return Object.keys(store).filter(function (k) {
    return /^\d{4}-\d{2}-\d{2}$/.test(k);
  });
}

function winLossTotalsFromStore() {
  const store = readStore();
  let w = 0;
  let l = 0;
  sortedWeekKeysFromStore(store).forEach(function (k) {
    const mr = normalizeWeekRecord(store[k]).matchResult;
    if (mr === "win") w += 1;
    else if (mr === "loss") l += 1;
  });
  return { wins: w, losses: l };
}

function refreshAllianceRecord() {
  if (!allianceRecordEl) return;
  const t = winLossTotalsFromStore();
  allianceRecordEl.innerHTML =
    '<span class="ds-mh-alliance-record-w">' +
    t.wins +
    '</span>–<span class="ds-mh-alliance-record-l">' +
    t.losses +
    '</span> <span class="ds-mh-alliance-record-suffix">record</span>';
}

function refreshImportOpponentSelect() {
  if (!importOpponentSel) return;
  importOpponentSel.innerHTML = "";
  const opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = "— Import opponent intel —";
  importOpponentSel.appendChild(opt0);

  const saved = readOpponentsStore();
  const savedKeys = Object.keys(saved).sort(function (a, b) {
    var ea = saved[a];
    var eb = saved[b];
    var A = ea && typeof ea.opponentName === "string" ? ea.opponentName : a;
    var B = eb && typeof eb.opponentName === "string" ? eb.opponentName : b;
    return String(A).localeCompare(String(B), undefined, { sensitivity: "base" });
  });
  if (savedKeys.length) {
    const og = document.createElement("optgroup");
    og.label = "Saved opponents";
    savedKeys.forEach(function (key) {
      const entry = saved[key];
      if (!entry || typeof entry !== "object") return;
      const opt = document.createElement("option");
      opt.value = "saved:" + key;
      const name = String(entry.opponentName || "").trim() || "(unnamed)";
      const srv = String(entry.opponentServer || "").trim();
      opt.textContent = name + (srv ? " · S" + srv : "");
      og.appendChild(opt);
    });
    importOpponentSel.appendChild(og);
  }

  const weekStore = readStore();
  const histKeys = sortedWeekKeysFromStore(weekStore).sort().reverse();
  if (histKeys.length) {
    const og2 = document.createElement("optgroup");
    og2.label = "From match history";
    histKeys.forEach(function (k) {
      const rec = normalizeWeekRecord(weekStore[k]);
      const opp = String(rec.opponentName || "").trim() || "(no opponent name)";
      const opt = document.createElement("option");
      opt.value = "history:" + k;
      opt.textContent = k + " — " + opp + matchResultListSuffix(rec.matchResult);
      og2.appendChild(opt);
    });
    importOpponentSel.appendChild(og2);
  }
}

function weekMatchesSearch(rec, q) {
  if (!q) return true;
  const r = normalizeWeekRecord(rec);
  const name = String(r.opponentName || "").toLowerCase();
  if (name.indexOf(q) !== -1) return true;
  const serv = String(r.opponentServer || "").toLowerCase();
  return serv.indexOf(q) !== -1;
}

function getFilteredSortedKeys() {
  const store = readStore();
  const q = searchQueryNormalized();
  const keys = sortedWeekKeysFromStore(store);
  const out = [];
  keys.forEach(function (k) {
    if (weekMatchesSearch(store[k], q)) out.push(k);
  });
  out.sort().reverse();
  return out;
}

function updateCompareButtonState() {
  if (!compareBtn) return;
  const n = selectedForCompare.size;
  compareBtn.textContent = n ? "Compare selected (" + n + ")" : "Compare selected";
  compareBtn.disabled = n === 0;
}

function renderWeekList() {
  if (!weekListEl || weekListEl.tagName !== "SELECT") return;
  const keys = getFilteredSortedKeys();
  const store = readStore();
  const cur = weekInput ? normalizeMatchDateKey(weekInput.value) : "";
  weekListEl.innerHTML = "";
  const opt0 = document.createElement("option");
  opt0.value = "";
  if (keys.length === 0) {
    opt0.disabled = true;
    opt0.textContent = searchQueryNormalized()
      ? "No saved matches match this search."
      : "No saved matches yet. Pick a date and save to build history.";
  } else {
    opt0.textContent = "— Select a saved match —";
  }
  weekListEl.appendChild(opt0);
  keys.forEach(function (k) {
    const opt = document.createElement("option");
    opt.value = k;
    const rec = normalizeWeekRecord(store[k]);
    const opp = String(rec.opponentName || "").trim() || "(no opponent name)";
    opt.textContent = k + " — " + opp + matchResultListSuffix(rec.matchResult);
    weekListEl.appendChild(opt);
  });
  if (cur && keys.indexOf(cur) !== -1) {
    weekListEl.value = cur;
  } else {
    weekListEl.value = "";
  }
  updateCompareButtonState();
}

function onSavedMatchesDropdownChange() {
  if (!weekListEl || weekListEl.tagName !== "SELECT") return;
  const k = weekListEl.value;
  if (!k || !/^\d{4}-\d{2}-\d{2}$/.test(k)) return;
  if (weekInput) weekInput.value = k;
  loadWeekIntoForm(k);
  if (statusEl) statusEl.textContent = "Loaded match " + k + ".";
}

function addDlField(dl, title, text) {
  const dt = document.createElement("dt");
  dt.textContent = title;
  const dd = document.createElement("dd");
  dd.textContent = text || "—";
  dl.appendChild(dt);
  dl.appendChild(dd);
}

function formatTop5Lines(rows) {
  const r = Array.isArray(rows) ? rows : [];
  const lines = [];
  for (let i = 0; i < 5; i++) {
    const row = r[i];
    if (!row) continue;
    const n = String(row.name || "").trim();
    const p = String(row.power || "").trim();
    if (!n && !p) continue;
    lines.push((n || "?") + (p ? " — " + p + " M" : ""));
  }
  return lines.length ? lines.join("\n") : "—";
}

function renderComparePanel() {
  if (!compareScroll || !comparePanel) return;
  const keys = Array.from(selectedForCompare).filter(function (k) {
    return /^\d{4}-\d{2}-\d{2}$/.test(k);
  });
  keys.sort();
  compareScroll.innerHTML = "";
  if (keys.length === 0) {
    if (statusEl) {
      statusEl.textContent =
        "Add matches with Add to compare or Select visible, then try again.";
    }
    return;
  }
  const store = readStore();
  keys.forEach(function (k) {
    const rec = normalizeWeekRecord(store[k]);
    const card = document.createElement("article");
    card.className = "ds-mh-compare-card";

    const head = document.createElement("header");
    head.className = "ds-mh-compare-card-h";
    const strong = document.createElement("strong");
    strong.textContent = "Match " + k;
    const sub = document.createElement("span");
    const on = String(rec.opponentName || "").trim();
    const os = String(rec.opponentServer || "").trim();
    sub.textContent =
      matchResultComparePrefix(rec.matchResult) +
      (on || "Unnamed opponent") +
      (os ? " · S" + os : "") +
      (rec.opponentAlliancePower ? " · " + rec.opponentAlliancePower + " M" : "");
    head.appendChild(strong);
    head.appendChild(sub);

    const body = document.createElement("dl");
    body.className = "ds-mh-compare-card-body";

    addDlField(
      body,
      "Result",
      rec.matchResult === "win" ? "Win" : rec.matchResult === "loss" ? "Loss" : "—",
    );
    addDlField(body, "Our lineup", rec.ourLineup);
    addDlField(body, "Our plan", rec.ourPlan);
    addDlField(body, "Their lineup", rec.theirLineup);
    addDlField(body, "Their plan", rec.theirPlan);
    addDlField(body, "Alliance power (M)", rec.opponentAlliancePower);
    addDlField(body, "Top 5", formatTop5Lines(rec.opponentTop5));

    card.appendChild(head);
    card.appendChild(body);
    compareScroll.appendChild(card);
  });

  if (compareTitle) {
    compareTitle.textContent =
      keys.length === 1 ? "1 match selected" : "Comparing " + keys.length + " matches";
  }
  comparePanel.removeAttribute("hidden");
  comparePanel.setAttribute("aria-hidden", "false");
  if (statusEl) statusEl.textContent = "Showing comparison for " + keys.length + " match(es).";
}

function hideComparePanel() {
  if (!comparePanel) return;
  comparePanel.setAttribute("hidden", "");
  comparePanel.setAttribute("aria-hidden", "true");
  if (compareScroll) compareScroll.innerHTML = "";
  if (compareTitle) compareTitle.textContent = "Comparison";
}

function loadWeekIntoForm(weekStart) {
  const key = normalizeMatchDateKey(weekStart);
  if (!key) return;
  const store = readStore();
  const rec = store[key];
  applyRecordToForm(rec || emptyWeekRecord());
  if (weekInput) weekInput.value = key;
}

function deleteMatchWeek(keyRaw) {
  const k = normalizeMatchDateKey(keyRaw);
  if (!k) return;
  const store = readStore();
  if (!Object.prototype.hasOwnProperty.call(store, k)) return;
  const rec = normalizeWeekRecord(store[k]);
  const opp = String(rec.opponentName || "").trim();
  const msg =
    "Delete saved match for " + k + (opp ? " vs " + opp : "") + "? This cannot be undone.";
  if (!window.confirm(msg)) return;
  delete store[k];
  if (!writeStore(store)) return;
  selectedForCompare.delete(k);
  hideComparePanel();
  if (weekInput && normalizeMatchDateKey(weekInput.value) === k) {
    loadWeekIntoForm(k);
  }
  refreshWeekJumpSelect();
  if (statusEl) statusEl.textContent = "Deleted match " + k + ".";
}

function refreshWeekJumpSelect() {
  renderWeekList();
  refreshImportOpponentSelect();
  refreshAllianceRecord();
}

function saveCurrentWeek() {
  if (!weekInput) return;
  var key = normalizeMatchDateKey(weekInput.value);
  if (!key) {
    if (statusEl) statusEl.textContent = "Choose a valid match date.";
    return;
  }
  if (weekInput && weekInput.value !== key) weekInput.value = key;
  const store = readStore();
  store[key] = readRecordFromForm();
  if (!writeStore(store)) return;
  refreshWeekJumpSelect();
  if (statusEl) statusEl.textContent = "Saved match for " + key + ".";
}

function setOpenButtonVisible(signedIn) {
  if (!openBtn) return;
  openBtn.hidden = !signedIn;
}

function isModalOpen() {
  return modal && modal.classList.contains("open");
}

function openModal() {
  if (!modal) return;
  previousActiveElement = document.activeElement;
  hideComparePanel();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  var pageDay = "";
  if (typeof window.__lwDsGetSelectedDay === "function") {
    try {
      pageDay = String(window.__lwDsGetSelectedDay() || "");
    } catch (_) {
      pageDay = "";
    }
  }
  var mon = normalizeMatchDateKey(pageDay) || normalizeMatchDateKey(formatYmd(new Date()));
  if (weekInput) weekInput.value = mon;
  loadWeekIntoForm(mon);
  refreshWeekJumpSelect();
  window.setTimeout(function () {
    ourLineup?.focus();
  }, 0);
}

function closeModal() {
  if (!modal || !isModalOpen()) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (previousActiveElement && typeof previousActiveElement.focus === "function") {
    try {
      previousActiveElement.focus();
    } catch (_) {
      /* ignore */
    }
  }
  previousActiveElement = null;
}

matchResultWinCb?.addEventListener("change", function () {
  if (matchResultWinCb.checked && matchResultLossCb) matchResultLossCb.checked = false;
});
matchResultLossCb?.addEventListener("change", function () {
  if (matchResultLossCb.checked && matchResultWinCb) matchResultWinCb.checked = false;
});

openBtn?.addEventListener("click", openModal);
closeBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", function (ev) {
  if (ev.target === modal) closeModal();
});
saveBtn?.addEventListener("click", saveCurrentWeek);

weekInput?.addEventListener("change", function () {
  var raw = String(weekInput.value || "").trim();
  if (!raw) return;
  var key = normalizeMatchDateKey(raw);
  if (!key) {
    if (statusEl) statusEl.textContent = "Invalid date.";
    return;
  }
  if (key !== raw) weekInput.value = key;
  loadWeekIntoForm(key);
  renderWeekList();
  if (statusEl) statusEl.textContent = "";
});

searchOppEl?.addEventListener("input", function () {
  renderWeekList();
});

weekListEl?.addEventListener("change", onSavedMatchesDropdownChange);

addCompareBtn?.addEventListener("click", function () {
  let k = weekListEl && weekListEl.value;
  if (!k || !/^\d{4}-\d{2}-\d{2}$/.test(k)) {
    k = weekInput ? normalizeMatchDateKey(weekInput.value) : "";
    const store = readStore();
    if (!k || !Object.prototype.hasOwnProperty.call(store, k)) {
      if (statusEl) {
        statusEl.textContent =
          "Choose a saved match in the dropdown (or a match date that has saved data), then add to compare.";
      }
      return;
    }
  }
  selectedForCompare.add(k);
  updateCompareButtonState();
  if (statusEl) {
    statusEl.textContent = "Added " + k + " to compare (" + selectedForCompare.size + " total).";
  }
});

selectVisibleBtn?.addEventListener("click", function () {
  if (!weekListEl || weekListEl.tagName !== "SELECT") return;
  getFilteredSortedKeys().forEach(function (k) {
    selectedForCompare.add(k);
  });
  renderWeekList();
  updateCompareButtonState();
  if (statusEl) statusEl.textContent = "Selected all visible matches for compare.";
});

clearSelBtn?.addEventListener("click", function () {
  selectedForCompare.clear();
  renderWeekList();
  if (statusEl) statusEl.textContent = "Cleared compare selection.";
});

deleteSavedBtn?.addEventListener("click", function () {
  if (!weekListEl || weekListEl.tagName !== "SELECT") return;
  const k = weekListEl.value;
  if (!k || !/^\d{4}-\d{2}-\d{2}$/.test(k)) {
    if (statusEl) {
      statusEl.textContent = "Choose a saved match in the dropdown, then click Delete selected.";
    }
    return;
  }
  deleteMatchWeek(k);
});

compareBtn?.addEventListener("click", function () {
  renderComparePanel();
});

compareHideBtn?.addEventListener("click", function () {
  hideComparePanel();
});

saveOpponentBtn?.addEventListener("click", function () {
  const rec = readRecordFromForm();
  const name = String(rec.opponentName || "").trim();
  if (!name) {
    if (statusEl) statusEl.textContent = "Enter an opponent alliance name before saving to roster.";
    return;
  }
  const key = opponentKeyFromNameServer(rec.opponentName, rec.opponentServer);
  const roster = readOpponentsStore();
  roster[key] = {
    opponentName: rec.opponentName,
    opponentServer: rec.opponentServer,
    opponentAlliancePower: rec.opponentAlliancePower,
    opponentTop5: rec.opponentTop5,
    theirLineup: rec.theirLineup,
    theirPlan: rec.theirPlan,
    updatedAt: new Date().toISOString(),
  };
  if (!writeOpponentsStore(roster)) return;
  refreshImportOpponentSelect();
  if (statusEl) statusEl.textContent = "Saved \"" + name + "\" to opponent roster.";
});

importOpponentSel?.addEventListener("change", function () {
  const v = importOpponentSel.value;
  if (!v) return;
  const m = /^([^:]+):(.*)$/.exec(v);
  importOpponentSel.value = "";
  if (!m) return;
  const kind = m[1];
  const rest = m[2];
  if (kind === "saved") {
    const roster = readOpponentsStore();
    const entry = roster[rest];
    if (entry) applyOpponentIntelToForm(entry);
  } else if (kind === "history") {
    var wk = rest;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(wk)) return;
    const store = readStore();
    applyOpponentIntelToForm(store[wk] || {});
  }
  if (statusEl) statusEl.textContent = "Imported opponent intel (your lineup/plan unchanged).";
});

document.addEventListener("keydown", function (ev) {
  if (ev.key !== "Escape") return;
  if (isModalOpen()) closeModal();
});

window.addEventListener("lw-localstorage-synced", function (ev) {
  var keys = ev.detail && ev.detail.keys;
  var mine = new Set([LS_KEY, OPPONENTS_LS_KEY]);
  if (keys && keys.length && !keys.some(function (k) { return mine.has(k); })) return;
  refreshWeekJumpSelect();
  if (isModalOpen() && weekInput) {
    var k = normalizeMatchDateKey(weekInput.value);
    if (k) loadWeekIntoForm(k);
  }
  if (comparePanel && !comparePanel.hasAttribute("hidden")) {
    renderComparePanel();
  }
});

const cfg = window.__FIREBASE_CONFIG__;
if (!firebaseConfigOk(cfg)) {
  setOpenButtonVisible(false);
} else {
  try {
    const app = getApps().length ? getApp() : initializeApp(cfg);
    const auth = getAuth(app);
    onAuthStateChanged(auth, function (user) {
      setOpenButtonVisible(!!user);
    });
  } catch (e) {
    console.warn("[Last War Tools] ds-tracker-match-history:", e);
    setOpenButtonVisible(false);
  }
}
