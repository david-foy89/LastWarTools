/**
 * Tesseract LSTM WASM logs "Warning: Parameter not found: …" for legacy-only
 * engine variables during Init. Harmless; Tesseract.setLogging does not affect WASM.
 * This filters only that message pattern so the console stays readable.
 */
(function () {
  if (typeof console === "undefined" || typeof console.warn !== "function") return;
  var orig = console.warn;
  console.warn = function () {
    var m = arguments[0];
    if (
      typeof m === "string" &&
      /^Warning: Parameter not found:/.test(m)
    ) {
      return;
    }
    orig.apply(console, arguments);
  };
})();
