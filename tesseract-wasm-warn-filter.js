/**
 * Tesseract LSTM WASM prints legacy "Parameter not found: …" lines during Init.
 * They may go through console.warn or console.error; the first argument is not always
 * a plain string. Filter any log line that looks like this noise.
 */
(function () {
  if (typeof console === "undefined") return;

  function isTesseractParamNoise(args) {
    var parts = [];
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      if (typeof a === "string") parts.push(a);
      else if (a != null && typeof a !== "object") parts.push(String(a));
    }
    var s = parts.join(" ");
    return /Parameter not found/i.test(s);
  }

  function wrap(method) {
    var orig = console[method];
    if (typeof orig !== "function") return;
    console[method] = function () {
      if (isTesseractParamNoise(arguments)) return;
      orig.apply(console, arguments);
    };
  }

  wrap("warn");
  wrap("error");
})();
