/**
 * Desert Storm tracker: "Desert Storm Mail" button (signed-in only) opens a modal with mail day,
 * Template, Team A / B tabs, and mail history (localStorage).
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfigOk } from "./account-sync-lib.js";

const openBtn = document.getElementById("dsFightPlanBtn");
const modal = document.getElementById("dsFightPlanModal");
const modalCloseBtn = document.getElementById("dsFightPlanModalCloseBtn");
const statusEl = document.getElementById("dsFightPlanStatus");
const mailDayInput = document.getElementById("dsFightPlanMailDay");
const historySelect = document.getElementById("dsFightPlanHistorySelect");
const saveHistoryBtn = document.getElementById("dsFightPlanSaveHistoryBtn");
const textareaTemplate = document.getElementById("dsFightPlanTextareaTemplate");
const textareaA = document.getElementById("dsFightPlanTextareaA");
const textareaB = document.getElementById("dsFightPlanTextareaB");
const saveTemplateBtn = document.getElementById("dsFightPlanSaveTemplateBtn");
const genBtn = document.getElementById("dsFightPlanGenerateBtn");
const copyBtn = document.getElementById("dsFightPlanCopyBtn");

const tabTemplate = document.getElementById("dsFightPlanTabTemplate");
const tabA = document.getElementById("dsFightPlanTabA");
const tabB = document.getElementById("dsFightPlanTabB");
const panelTemplate = document.getElementById("dsFightPlanPanelTemplate");
const panelA = document.getElementById("dsFightPlanPanelA");
const panelB = document.getElementById("dsFightPlanPanelB");

const TAB_TEMPLATE = "template";
const TAB_A = "A";
const TAB_B = "B";

const LS_TEMPLATE_KEY = "dsFightPlanTemplateTextV1";
const LS_MAIL_DAY_PREF = "dsFightPlanMailDayPreferenceV1";
const LS_MAIL_HISTORY = "dsFightPlanMailHistoryV1";
const MAX_MAIL_HISTORY = 50;

var previousActiveElement = null;
/** @type {"template"|"A"|"B"} */
var activeTab = TAB_TEMPLATE;

var templateSaveTimer = null;

function isModalOpen() {
  return modal && modal.classList.contains("open");
}

function setOpenButtonVisible(signedIn) {
  if (!openBtn) return;
  openBtn.hidden = !signedIn;
}

function loadTemplateFromStorage() {
  if (!textareaTemplate) return;
  try {
    var v = localStorage.getItem(LS_TEMPLATE_KEY);
    textareaTemplate.value = v != null ? v : "";
  } catch (_) {
    textareaTemplate.value = "";
  }
}

function applyMailDayToWindow(ymd) {
  if (ymd && /^\d{4}-\d{2}-\d{2}$/.test(String(ymd))) {
    window.__lwDsFightPlanMailDay = String(ymd);
  } else if (typeof window !== "undefined") {
    try {
      delete window.__lwDsFightPlanMailDay;
    } catch (_) {
      window.__lwDsFightPlanMailDay = undefined;
    }
  }
}

function tryPersistMailDayPreference(ymd) {
  if (!ymd || !/^\d{4}-\d{2}-\d{2}$/.test(String(ymd))) return;
  try {
    localStorage.setItem(LS_MAIL_DAY_PREF, String(ymd));
  } catch (_) {
    /* ignore */
  }
}

function syncMailDayOnOpen() {
  var pageDay = "";
  if (typeof window.__lwDsGetSelectedDay === "function") {
    try {
      pageDay = String(window.__lwDsGetSelectedDay() || "");
    } catch (_) {
      pageDay = "";
    }
  }
  var pref = "";
  try {
    pref = localStorage.getItem(LS_MAIL_DAY_PREF) || "";
  } catch (_) {
    pref = "";
  }
  var initial =
    pref && /^\d{4}-\d{2}-\d{2}$/.test(pref) ? pref : pageDay && /^\d{4}-\d{2}-\d{2}$/.test(pageDay) ? pageDay : "";
  if (!initial && pageDay) initial = pageDay;
  if (mailDayInput) mailDayInput.value = initial || "";
  applyMailDayToWindow(initial || (mailDayInput && mailDayInput.value) || "");
}

function readMailHistory() {
  try {
    var raw = localStorage.getItem(LS_MAIL_HISTORY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

function writeMailHistory(arr) {
  try {
    localStorage.setItem(LS_MAIL_HISTORY, JSON.stringify(arr.slice(0, MAX_MAIL_HISTORY)));
  } catch (_) {
    /* ignore */
  }
}

function refreshHistorySelect() {
  if (!historySelect) return;
  var entries = readMailHistory().sort(function (a, b) {
    return (Number(b.savedAt) || 0) - (Number(a.savedAt) || 0);
  });
  historySelect.innerHTML = "";
  var opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = "— Select —";
  historySelect.appendChild(opt0);
  entries.forEach(function (e) {
    if (!e || !e.id) return;
    var opt = document.createElement("option");
    opt.value = String(e.id);
    var when = "";
    if (e.savedAt) {
      try {
        when = new Date(
          Number(e.savedAt),
        ).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
      } catch (_) {
        when = "";
      }
    }
    opt.textContent = (e.day || "?") + (when ? " · " + when : "");
    historySelect.appendChild(opt);
  });
}

function saveMailToHistory() {
  flushTemplateToStorageSilent();
  var day = mailDayInput ? String(mailDayInput.value || "").trim() : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    if (statusEl) statusEl.textContent = "Choose a valid mail day before saving to history.";
    return;
  }
  var entry = {
    id: String(Date.now()),
    day: day,
    template: String(textareaTemplate ? textareaTemplate.value : ""),
    teamA: String(textareaA ? textareaA.value : ""),
    teamB: String(textareaB ? textareaB.value : ""),
    savedAt: Date.now(),
  };
  var arr = readMailHistory();
  arr.unshift(entry);
  writeMailHistory(arr);
  refreshHistorySelect();
  if (statusEl) statusEl.textContent = "Saved to mail history.";
}

function loadMailFromHistory() {
  if (!historySelect || !historySelect.value) return;
  var id = historySelect.value;
  var entry = readMailHistory().find(function (e) {
    return e && String(e.id) === id;
  });
  historySelect.value = "";
  if (!entry) return;
  if (mailDayInput) mailDayInput.value = entry.day || "";
  applyMailDayToWindow(entry.day);
  tryPersistMailDayPreference(entry.day);
  if (textareaTemplate) textareaTemplate.value = entry.template != null ? String(entry.template) : "";
  try {
    localStorage.setItem(LS_TEMPLATE_KEY, String(textareaTemplate ? textareaTemplate.value : ""));
  } catch (_) {
    /* ignore */
  }
  if (textareaA) textareaA.value = entry.teamA != null ? String(entry.teamA) : "";
  if (textareaB) textareaB.value = entry.teamB != null ? String(entry.teamB) : "";
  if (statusEl) statusEl.textContent = "Loaded from mail history.";
}

function scheduleSaveTemplate() {
  if (!textareaTemplate) return;
  try {
    if (templateSaveTimer) window.clearTimeout(templateSaveTimer);
    templateSaveTimer = window.setTimeout(function () {
      templateSaveTimer = null;
      try {
        localStorage.setItem(LS_TEMPLATE_KEY, String(textareaTemplate.value || ""));
      } catch (_) {
        /* ignore */
      }
      if (isModalOpen()) runGenerate();
    }, 400);
  } catch (_) {
    /* ignore */
  }
}

/** Immediate save + user-visible confirmation (also clears pending debounced write). */
function saveTemplateNow() {
  if (!textareaTemplate) return;
  if (templateSaveTimer) {
    window.clearTimeout(templateSaveTimer);
    templateSaveTimer = null;
  }
  var v = String(textareaTemplate.value || "");
  try {
    localStorage.setItem(LS_TEMPLATE_KEY, v);
    if (statusEl) statusEl.textContent = "Template saved in this browser.";
    runGenerate();
  } catch (e) {
    if (statusEl) {
      statusEl.textContent =
        e && e.name === "QuotaExceededError"
          ? "Could not save — storage is full."
          : "Could not save template (browser blocked storage).";
    }
  }
}

/** Write template textarea to localStorage without changing status (used before regenerating A/B). */
function flushTemplateToStorageSilent() {
  if (!textareaTemplate) return;
  if (templateSaveTimer) {
    window.clearTimeout(templateSaveTimer);
    templateSaveTimer = null;
  }
  try {
    localStorage.setItem(LS_TEMPLATE_KEY, String(textareaTemplate.value || ""));
  } catch (_) {
    /* ignore */
  }
}

function getActiveTextarea() {
  if (activeTab === TAB_A) return textareaA;
  if (activeTab === TAB_B) return textareaB;
  return textareaTemplate;
}

/**
 * @param {"template"|"A"|"B"} tab
 */
function setActiveTab(tab) {
  activeTab = tab;
  var isT = tab === TAB_TEMPLATE;
  var isA = tab === TAB_A;
  var isB = tab === TAB_B;

  if (tabTemplate) tabTemplate.setAttribute("aria-selected", isT ? "true" : "false");
  if (tabA) tabA.setAttribute("aria-selected", isA ? "true" : "false");
  if (tabB) tabB.setAttribute("aria-selected", isB ? "true" : "false");

  if (panelTemplate) panelTemplate.hidden = !isT;
  if (panelA) panelA.hidden = !isA;
  if (panelB) panelB.hidden = !isB;
  if (saveTemplateBtn) saveTemplateBtn.hidden = !isT;
}

function openFightPlanModal() {
  if (!modal) return;
  previousActiveElement = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  loadTemplateFromStorage();
  syncMailDayOnOpen();
  refreshHistorySelect();
  setActiveTab(TAB_TEMPLATE);
  runGenerate();
  window.setTimeout(function () {
    getActiveTextarea()?.focus();
  }, 0);
}

function closeFightPlanModal() {
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

function runGenerate() {
  var fnTeam =
    typeof window.__lwDsBuildFightPlanTeamText === "function" ? window.__lwDsBuildFightPlanTeamText : null;
  if (!fnTeam || !textareaA || !textareaB) {
    if (statusEl) statusEl.textContent = "Planner data is not ready yet.";
    return;
  }
  try {
    flushTemplateToStorageSilent();
    if (mailDayInput && /^\d{4}-\d{2}-\d{2}$/.test(String(mailDayInput.value || "").trim())) {
      applyMailDayToWindow(String(mailDayInput.value).trim());
    } else {
      applyMailDayToWindow("");
    }
    textareaA.value = fnTeam("A");
    textareaB.value = fnTeam("B");
    if (statusEl) {
      statusEl.textContent =
        "Team A and Team B updated from mail day, template, current table, and map pins for that day.";
    }
  } catch (e) {
    if (statusEl) statusEl.textContent = e && e.message ? String(e.message) : "Could not build text.";
  }
}

async function runCopy() {
  var ta = getActiveTextarea();
  var t = ta ? String(ta.value || "") : "";
  if (!t.trim()) {
    if (statusEl) statusEl.textContent = "Nothing to copy in this tab.";
    return;
  }
  try {
    await navigator.clipboard.writeText(t);
    if (statusEl) statusEl.textContent = "Copied to clipboard.";
  } catch {
    if (statusEl) statusEl.textContent = "Copy failed — select the text and copy manually.";
    if (ta) {
      ta.focus();
      ta.select();
    }
  }
}

function tabIndexForKey(key) {
  if (key === "Home") return 0;
  if (key === "End") return 2;
  return -1;
}

openBtn?.addEventListener("click", function () {
  openFightPlanModal();
});

modalCloseBtn?.addEventListener("click", function () {
  closeFightPlanModal();
});

modal?.addEventListener("click", function (ev) {
  if (ev.target === modal) closeFightPlanModal();
});

textareaTemplate?.addEventListener("input", scheduleSaveTemplate);

tabTemplate?.addEventListener("click", function () {
  setActiveTab(TAB_TEMPLATE);
  textareaTemplate?.focus();
});
tabA?.addEventListener("click", function () {
  setActiveTab(TAB_A);
  textareaA?.focus();
});
tabB?.addEventListener("click", function () {
  setActiveTab(TAB_B);
  textareaB?.focus();
});

document.querySelector(".ds-fight-plan-tabs")?.addEventListener("keydown", function (ev) {
  if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight" && ev.key !== "Home" && ev.key !== "End") return;
  var tabs = [tabTemplate, tabA, tabB].filter(Boolean);
  var idx = tabs.findIndex(function (el) {
    return el.getAttribute("aria-selected") === "true";
  });
  if (idx < 0) idx = 0;
  var next = idx;
  if (ev.key === "ArrowLeft") next = (idx + tabs.length - 1) % tabs.length;
  else if (ev.key === "ArrowRight") next = (idx + 1) % tabs.length;
  else {
    var j = tabIndexForKey(ev.key);
    if (j >= 0) next = j;
  }
  if (next === idx) return;
  ev.preventDefault();
  tabs[next]?.click();
});

mailDayInput?.addEventListener("change", function () {
  var v = String(mailDayInput.value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    applyMailDayToWindow(v);
    tryPersistMailDayPreference(v);
  } else {
    applyMailDayToWindow("");
  }
  runGenerate();
});

historySelect?.addEventListener("change", function () {
  if (historySelect.value) loadMailFromHistory();
});

saveHistoryBtn?.addEventListener("click", saveMailToHistory);

genBtn?.addEventListener("click", runGenerate);
copyBtn?.addEventListener("click", runCopy);

document.addEventListener("keydown", function (ev) {
  if (isModalOpen() && (ev.ctrlKey || ev.metaKey) && String(ev.key || "").toLowerCase() === "s") {
    ev.preventDefault();
    if (activeTab === TAB_TEMPLATE) saveTemplateNow();
    return;
  }
  if (ev.key !== "Escape") return;
  if (isModalOpen()) {
    closeFightPlanModal();
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
    console.warn("[Last War Tools] ds-tracker-fight-plan:", e);
    setOpenButtonVisible(false);
  }
}
