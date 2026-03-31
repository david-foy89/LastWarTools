/**
 * Tesseract LSTM WASM prints legacy "Parameter not found: …" during Init.
 * Emscripten may route that through console.log, warn, or error; arguments can be
 * split (e.g. format + substitution) or non-strings — collect text from all args.
 */
(function () {
  if (typeof console === "undefined") return;

  function argText(a) {
    if (a == null) return "";
    if (typeof a === "string") return a;
    if (typeof a === "number" || typeof a === "boolean") return String(a);
    if (a instanceof Error) return a.message || "";
    if (typeof a === "object" && a.message) return String(a.message);
    return "";
  }

  function isTesseractParamNoise(args) {
    var parts = [];
    for (var i = 0; i < args.length; i++) {
      var t = argText(args[i]);
      if (t) parts.push(t);
    }
    var s = parts.join(" ");
    if (/Parameter not found/i.test(s)) return true;
    try {
      return /Parameter not found/i.test(String(args[0]));
    } catch (e) {
      return false;
    }
  }

  function wrap(method) {
    var orig = console[method];
    if (typeof orig !== "function") return;
    console[method] = function () {
      if (isTesseractParamNoise(arguments)) return;
      orig.apply(console, arguments);
    };
  }

  wrap("log");
  wrap("info");
  wrap("debug");
  wrap("warn");
  wrap("error");
})();
