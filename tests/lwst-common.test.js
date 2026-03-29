const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createLocalStorageMock() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(String(key)) ? store.get(String(key)) : null;
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
    removeItem(key) {
      store.delete(String(key));
    },
  };
}

function loadCommonForTest() {
  const source = fs.readFileSync(
    path.resolve(process.cwd(), "lwst-common.js"),
    "utf8",
  );

  const sandbox = {
    window: {
      localStorage: createLocalStorageMock(),
      document: {
        querySelector() {
          return null;
        },
        getElementById() {
          return null;
        },
        createElement() {
          return {};
        },
        body: {
          appendChild() {},
        },
      },
      setTimeout() {},
      Event: class Event {
        constructor(type) {
          this.type = type;
        }
      },
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { timeout: 1000 });
  return sandbox.window.LWSTCommon;
}

const common = loadCommonForTest();

test("LWSTCommon exports expected utility functions", () => {
  assert.ok(common);
  assert.equal(typeof common.isSupportedLanguage, "function");
  assert.equal(typeof common.resolveLanguageCode, "function");
  assert.equal(typeof common.clampNumber, "function");
  assert.equal(typeof common.formatRoundedNumber, "function");
  assert.equal(typeof common.storageGetJson, "function");
  assert.equal(typeof common.storageSetJson, "function");
});

test("isSupportedLanguage validates known and unknown language codes", () => {
  assert.equal(common.isSupportedLanguage("en"), true);
  assert.equal(common.isSupportedLanguage("zh-TW"), true);
  assert.equal(common.isSupportedLanguage("xx"), false);
  assert.equal(common.isSupportedLanguage(""), false);
});

test("resolveLanguageCode prefers primary then fallback then english", () => {
  assert.equal(common.resolveLanguageCode("fr", "en"), "fr");
  assert.equal(common.resolveLanguageCode("xx", "de"), "de");
  assert.equal(common.resolveLanguageCode("xx", "yy"), "en");
});

test("clampNumber handles bounds and fallback", () => {
  assert.equal(common.clampNumber(50, 0, 100, 0), 50);
  assert.equal(common.clampNumber(150, 0, 100, 0), 100);
  assert.equal(common.clampNumber(-5, 0, 100, 0), 0);
  assert.equal(common.clampNumber("bad", 0, 100, 12), 12);
});

test("formatRoundedNumber rounds numeric values", () => {
  assert.equal(common.formatRoundedNumber(1234.49), "1,234");
  assert.equal(common.formatRoundedNumber(1234.5), "1,235");
});

test("storage JSON helpers round-trip and fallback safely", () => {
  const key = "lwst-common-test-key";
  const payload = { a: 1, b: "two" };
  assert.equal(common.storageSetJson(key, payload), true);

  const loaded = common.storageGetJson(key, null);
  assert.equal(JSON.stringify(loaded), JSON.stringify(payload));

  const fallback = common.storageGetJson("missing-key", { ok: true });
  assert.equal(JSON.stringify(fallback), JSON.stringify({ ok: true }));
});

test("key pages include lwst-common.js script", () => {
  const pages = [
    "index.html",
    "t10-troops-calculator.html",
    "t11-troops-calculator.html",
    "hq-upgrade-calculator.html",
    "season-2-supplies-checklist.html",
  ];

  pages.forEach((page) => {
    const html = fs.readFileSync(path.resolve(process.cwd(), page), "utf8");
    assert.match(
      html,
      /<script src="lwst-common\.js"><\/script>/,
      `${page} should include lwst-common.js`,
    );
  });
});
