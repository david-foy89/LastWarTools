(function (global) {
  const LANGUAGE_OPTIONS = [
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

  function safeJsonParse(raw, fallbackValue) {
    if (typeof raw !== "string" || raw.trim() === "") {
      return fallbackValue;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return fallbackValue;
    }
  }

  function storageGetJson(key, fallbackValue) {
    try {
      return safeJsonParse(global.localStorage.getItem(key), fallbackValue);
    } catch {
      return fallbackValue;
    }
  }

  function storageSetJson(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function buildLanguageOptions(selectEl, preferredLanguage) {
    if (!selectEl) return;
    selectEl.innerHTML = LANGUAGE_OPTIONS.map(
      (lang) => `<option value="${lang.code}">${lang.label}</option>`,
    ).join("");

    const exists = LANGUAGE_OPTIONS.some(
      (lang) => lang.code === preferredLanguage,
    );
    selectEl.value = exists ? preferredLanguage : "en";
  }

  function applyGoogleLanguage(languageCode, retries) {
    const attemptsRemaining = Number.isFinite(retries) ? retries : 25;
    const combo = global.document.querySelector(".goog-te-combo");
    if (!combo) {
      if (attemptsRemaining > 0) {
        global.setTimeout(function () {
          applyGoogleLanguage(languageCode, attemptsRemaining - 1);
        }, 200);
      }
      return;
    }
    combo.value = languageCode;
    combo.dispatchEvent(new Event("change"));
  }

  function initGoogleTranslate(preferredLanguage) {
    global.googleTranslateElementInit = function googleTranslateElementInit() {
      new global.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
      applyGoogleLanguage(preferredLanguage, 25);
    };

    if (global.google && global.google.translate) {
      global.googleTranslateElementInit();
      return;
    }

    const existingScript = global.document.getElementById(
      "lwst-google-translate",
    );
    if (existingScript) {
      return;
    }

    const script = global.document.createElement("script");
    script.id = "lwst-google-translate";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    global.document.body.appendChild(script);
  }

  global.LWSTCommon = {
    LANGUAGE_OPTIONS,
    storageGetJson,
    storageSetJson,
    buildLanguageOptions,
    applyGoogleLanguage,
    initGoogleTranslate,
  };
})(window);
