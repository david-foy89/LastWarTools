const test = require("node:test");
const assert = require("node:assert/strict");

const { extractInlineConstArray } = require("./extract-inline-const");

const t11Research = extractInlineConstArray("t11-troops-calculator.html", "t11Research");

test("T11 research rows are defined", () => {
  assert.ok(Array.isArray(t11Research));
  assert.ok(t11Research.length > 0);
});

test("T11 IDs stay unique and include expected baseline set", () => {
  const ids = t11Research.map((row) => row.id);
  assert.equal(new Set(ids).size, ids.length, "T11 IDs must be unique");

  const expectedIds = ["helmet", "body-armor", "accessories", "weapon", "unlock"];
  for (const expectedId of expectedIds) {
    assert.ok(ids.includes(expectedId), `Missing expected T11 item: ${expectedId}`);
  }
});

test("T11 totals are finite non-negative numbers", () => {
  for (const item of t11Research) {
    assert.ok(item.totals, `${item.id} totals must exist`);
    for (const key of ["materials", "cores", "oil"]) {
      assert.ok(
        Number.isFinite(item.totals[key]),
        `${item.id} totals.${key} must be finite`,
      );
      assert.ok(item.totals[key] >= 0, `${item.id} totals.${key} must be >= 0`);
    }
  }
});

test("T11 stage cost labels exist for UI rendering", () => {
  const stageKeys = ["early", "mid", "final", "total"];
  for (const item of t11Research) {
    assert.ok(item.stageCosts, `${item.id} stageCosts must exist`);
    for (const key of stageKeys) {
      assert.equal(
        typeof item.stageCosts[key],
        "string",
        `${item.id} stageCosts.${key} must be a string`,
      );
      assert.ok(
        item.stageCosts[key].trim().length > 0,
        `${item.id} stageCosts.${key} must not be empty`,
      );
    }
  }
});
