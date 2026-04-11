(function () {
  const LANGUAGE_STORAGE_KEY = "selectedLanguage";
  /** Homepage historically used this key; keep read/write in sync with {@link LANGUAGE_STORAGE_KEY}. */
  const HOMEPAGE_LEGACY_LANGUAGE_KEY = "lastWarHomepageLanguageV1";
  const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "it", label: "Italian" },
    { code: "pt", label: "Portuguese" },
    { code: "ru", label: "Russian" },
    { code: "uk", label: "Ukrainian" },
    { code: "pl", label: "Polish" },
    { code: "tr", label: "Turkish" },
    { code: "ar", label: "Arabic" },
    { code: "fa", label: "Persian" },
    { code: "he", label: "Hebrew" },
    { code: "hi", label: "Hindi" },
    { code: "bn", label: "Bengali" },
    { code: "ur", label: "Urdu" },
    { code: "th", label: "Thai" },
    { code: "vi", label: "Vietnamese" },
    { code: "id", label: "Indonesian" },
    { code: "ms", label: "Malay" },
    { code: "fil", label: "Filipino" },
    { code: "ja", label: "Japanese" },
    { code: "ko", label: "Korean" },
    { code: "zh-CN", label: "Chinese (Simplified)" },
    { code: "zh-TW", label: "Chinese (Traditional)" },
    { code: "el", label: "Greek" },
    { code: "nl", label: "Dutch" },
    { code: "sv", label: "Swedish" },
    { code: "da", label: "Danish" },
    { code: "fi", label: "Finnish" },
    { code: "no", label: "Norwegian" },
    { code: "cs", label: "Czech" },
    { code: "ro", label: "Romanian" },
    { code: "hu", label: "Hungarian" },
    { code: "sk", label: "Slovak" },
    { code: "bg", label: "Bulgarian" },
    { code: "hr", label: "Croatian" },
    { code: "sr", label: "Serbian" },
    { code: "sl", label: "Slovenian" },
    { code: "lt", label: "Lithuanian" },
    { code: "lv", label: "Latvian" },
    { code: "et", label: "Estonian" },
  ];

  function getCookie(name) {
    const prefix = name + "=";
    const parts = document.cookie.split(";");
    for (const rawPart of parts) {
      const part = rawPart.trim();
      if (part.startsWith(prefix)) {
        return decodeURIComponent(part.slice(prefix.length));
      }
    }
    return "";
  }

  function isValidLanguageCode(code) {
    return (
      typeof code === "string" &&
      languageOptions.some(function (lang) {
        return lang.code === code;
      })
    );
  }

  function savePreferredLanguage(languageCode) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
      localStorage.setItem(
        HOMEPAGE_LEGACY_LANGUAGE_KEY,
        JSON.stringify({ language: languageCode }),
      );
    } catch {
      // Ignore storage errors.
    }
  }

  function loadPreferredLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && isValidLanguageCode(stored)) {
        return stored;
      }
    } catch {
      // Ignore storage errors.
    }

    try {
      const raw = localStorage.getItem(HOMEPAGE_LEGACY_LANGUAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        if (state && isValidLanguageCode(state.language)) {
          return state.language;
        }
      }
    } catch {
      // Ignore malformed or inaccessible stored state.
    }

    const googTrans = getCookie("googtrans");
    const match = googTrans && googTrans.match(/^\/en\/(.+)$/);
    if (match && isValidLanguageCode(match[1])) {
      return match[1];
    }
    return "en";
  }

  function buildLanguageOptions(select, preferredLanguage) {
    select.innerHTML = languageOptions
      .map((lang) => `<option value="${lang.code}">${lang.label}</option>`)
      .join("");
    select.value = languageOptions.some((lang) => lang.code === preferredLanguage)
      ? preferredLanguage
      : "en";
  }

  /** Google’s goog-te-combo uses different option values than our picker for some languages (e.g. Filipino → tl). */
  function toGoogleComboValue(ourCode) {
    const c = String(ourCode || "");
    if (c === "fil") {
      return "tl";
    }
    return c;
  }

  function findGoogleTeCombo() {
    const scoped = document.querySelector(
      "#google_translate_element .goog-te-combo",
    );
    if (scoped) {
      return scoped;
    }
    return document.querySelector(".goog-te-combo");
  }

  function isRareSoilWarTrackerPage() {
    try {
      if (document.body && document.body.classList.contains("rs-war-tracker-page")) {
        return true;
      }
      const p = (window.location.pathname || "").toLowerCase();
      return p.indexOf("rare-soil-war-tracker") !== -1;
    } catch {
      return false;
    }
  }

  /** Avoids repeat translate passes on the same language (major source of page “flashing”). */
  function googleComboMatchesLanguage(combo, ourLanguageCode) {
    const v = String(combo.value || "");
    const wantGt = toGoogleComboValue(ourLanguageCode);
    const want = String(ourLanguageCode || "");
    if (!want || want === "en") {
      return v === "" || v === "en" || v === wantGt;
    }
    return (
      v === wantGt ||
      v === want ||
      v.toLowerCase() === wantGt.toLowerCase() ||
      v.toLowerCase() === want.toLowerCase()
    );
  }

  function applyGoogleLanguage(languageCode, retries) {
    const combo = findGoogleTeCombo();
    if (!combo) {
      if (retries > 0) {
        window.setTimeout(function () {
          applyGoogleLanguage(languageCode, retries - 1);
        }, isRareSoilWarTrackerPage() ? 320 : 250);
      }
      return;
    }

    if (googleComboMatchesLanguage(combo, languageCode)) {
      return;
    }

    combo.value = toGoogleComboValue(languageCode);
    combo.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function buildTranslateElementOptions() {
    return {
      pageLanguage: "en",
      autoDisplay: false,
    };
  }

  let applyGoogleLanguageTimer = null;

  function scheduleApplyGoogleLanguage(languageCode, retries) {
    if (applyGoogleLanguageTimer) {
      window.clearTimeout(applyGoogleLanguageTimer);
      applyGoogleLanguageTimer = null;
    }
    applyGoogleLanguageTimer = window.setTimeout(function () {
      applyGoogleLanguageTimer = null;
      applyGoogleLanguage(languageCode, retries);
    }, 80);
  }

  function initTranslate(languageSelect, preferredLanguage) {
    languageSelect.addEventListener("change", function () {
      const nextLanguage = languageSelect.value;
      savePreferredLanguage(nextLanguage);
      scheduleApplyGoogleLanguage(nextLanguage, 20);
    });

    window.googleTranslateElementInit = function googleTranslateElementInit() {
      if (window._lwstGoogleTranslateMounted) {
        scheduleApplyGoogleLanguage(preferredLanguage, 20);
        return;
      }
      window._lwstGoogleTranslateMounted = true;
      try {
        new window.google.translate.TranslateElement(
          buildTranslateElementOptions(),
          "google_translate_element",
        );
      } catch (e) {
        window._lwstGoogleTranslateMounted = false;
        console.warn("[language-translate] TranslateElement failed:", e);
        return;
      }

      scheduleApplyGoogleLanguage(preferredLanguage, 20);
    };

    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
      return;
    }

    if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }

  function setupLanguageTranslate() {
    const languageSelect = document.getElementById("languageSelect");
    const translateHost = document.getElementById("google_translate_element");
    if (!languageSelect || !translateHost) {
      return;
    }

    const wrap = languageSelect.closest(".language-control");
    if (wrap) {
      wrap.classList.add("notranslate");
      wrap.setAttribute("translate", "no");
    } else {
      languageSelect.classList.add("notranslate");
      languageSelect.setAttribute("translate", "no");
    }

    const preferredLanguage = loadPreferredLanguage();
    buildLanguageOptions(languageSelect, preferredLanguage);

    initTranslate(languageSelect, preferredLanguage);

    /*
     * Rare Soil has a large DOM + live table; Google’s combo sometimes mounts late or needs a
     * second pass after notranslate sections settle.
     */
    if (isRareSoilWarTrackerPage()) {
      window.setTimeout(function () {
        scheduleApplyGoogleLanguage(preferredLanguage, 35);
      }, 550);
      window.setTimeout(function () {
        scheduleApplyGoogleLanguage(preferredLanguage, 25);
      }, 1800);
    }
  }

  let accountLanguageSyncTimer = null;

  function onAccountStorageSynced(ev) {
    const keys = ev.detail && ev.detail.keys;
    if (!keys || !keys.length) {
      return;
    }
    const syncKeys = [LANGUAGE_STORAGE_KEY, HOMEPAGE_LEGACY_LANGUAGE_KEY];
    const relevant = keys.some(function (k) {
      return syncKeys.indexOf(k) !== -1;
    });
    if (!relevant) {
      return;
    }

    if (accountLanguageSyncTimer) {
      window.clearTimeout(accountLanguageSyncTimer);
      accountLanguageSyncTimer = null;
    }

    accountLanguageSyncTimer = window.setTimeout(function () {
      accountLanguageSyncTimer = null;
      const languageSelect = document.getElementById("languageSelect");
      if (!languageSelect) {
        return;
      }

      const preferredLanguage = loadPreferredLanguage();
      /*
       * Changing language writes localStorage → account sync merges → lw-localstorage-synced
       * with the same keys. Rebuilding the select + re-applying Google here caused a loop
       * (repeated translate passes / “refresh” feel). Only sync UI when another device changed
       * the stored preference (select value out of date).
       */
      if (languageSelect.value === preferredLanguage) {
        return;
      }
      buildLanguageOptions(languageSelect, preferredLanguage);
      scheduleApplyGoogleLanguage(preferredLanguage, 20);
    }, 500);
  }

  window.addEventListener("lw-localstorage-synced", onAccountStorageSynced);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupLanguageTranslate);
  } else {
    setupLanguageTranslate();
  }
})();
