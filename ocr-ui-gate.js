/**
 * When ?ocr=1 or ?lwstOcr=1 is in the URL, screenshot/recording import uses Claude
 * (Firebase proxy) instead of Tesseract. Persists for the browser tab in sessionStorage.
 * Paste-text import is unchanged and does not use Claude.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "lwstClaudeOcr";

  function claudeOcrEnabled() {
    try {
      var sp = new URLSearchParams(global.location.search || "");
      if (sp.get("ocr") === "1" || sp.get("lwstOcr") === "1") {
        try {
          global.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (_) {}
        return true;
      }
      return global.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  global.__lwstClaudeOcrEnabled = claudeOcrEnabled;
  /** @deprecated use __lwstClaudeOcrEnabled */
  global.__lwstOcrUiEnabled = claudeOcrEnabled;
})(typeof window !== "undefined" ? window : globalThis);
