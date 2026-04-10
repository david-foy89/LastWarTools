(function () {
  const LANGUAGE_STORAGE_KEY = "selectedLanguage";
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

  function savePreferredLanguage(languageCode) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch {
      // Ignore storage errors.
    }
  }

  function loadPreferredLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored) {
        return stored;
      }
    } catch {
      // Ignore storage errors.
    }

    const googTrans = getCookie("googtrans");
    const match = googTrans.match(/^\/en\/(.+)$/);
    return match ? match[1] : "en";
  }

  function buildLanguageOptions(select, preferredLanguage) {
    select.innerHTML = languageOptions
      .map((lang) => `<option value="${lang.code}">${lang.label}</option>`)
      .join("");
    select.value = languageOptions.some((lang) => lang.code === preferredLanguage)
      ? preferredLanguage
      : "en";
  }

  function applyGoogleLanguage(languageCode, retries) {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) {
      if (retries > 0) {
        window.setTimeout(function () {
          applyGoogleLanguage(languageCode, retries - 1);
        }, 200);
      }
      return;
    }

    combo.value = languageCode;
    combo.dispatchEvent(new Event("change"));
  }

  function initTranslate(languageSelect, preferredLanguage) {
    languageSelect.addEventListener("change", function () {
      const nextLanguage = languageSelect.value;
      savePreferredLanguage(nextLanguage);
      applyGoogleLanguage(nextLanguage, 25);
    });

    window.googleTranslateElementInit = function googleTranslateElementInit() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );

      applyGoogleLanguage(preferredLanguage, 25);
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

  /**
   * Google’s website translator rewrites the DOM in ways that break spreadsheet-style
   * inputs (even inside `notranslate` in some browsers). Skip loading/applying it on
   * those pages; language preference still saves for the rest of the site.
   */
  function isGoogleTranslateDisabledForThisPage() {
    try {
      return /rare-soil-war-tracker\.html$/i.test(
        window.location.pathname || "",
      );
    } catch {
      return false;
    }
  }

  function setupLanguageTranslate() {
    const languageSelect = document.getElementById("languageSelect");
    const translateHost = document.getElementById("google_translate_element");
    if (!languageSelect || !translateHost) {
      return;
    }

    const preferredLanguage = loadPreferredLanguage();
    buildLanguageOptions(languageSelect, preferredLanguage);

    if (isGoogleTranslateDisabledForThisPage()) {
      languageSelect.addEventListener("change", function () {
        savePreferredLanguage(languageSelect.value);
      });
      languageSelect.title =
        "Translation is turned off on this page so the table stays editable. It applies when you open other tools.";
      return;
    }

    initTranslate(languageSelect, preferredLanguage);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupLanguageTranslate);
  } else {
    setupLanguageTranslate();
  }
})();
