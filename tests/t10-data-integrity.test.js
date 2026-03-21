const test = require("node:test");
const assert = require("node:assert/strict");

const { extractInlineConstArray } = require("./extract-inline-const");

const treeRows = extractInlineConstArray("t10-troops-calculator.html", "treeRows");

test("T10 tree rows are defined", () => {
  assert.ok(Array.isArray(treeRows));
  assert.ok(treeRows.length > 0);
});

test("T10 rows and elements have stable IDs", () => {
  const rowIds = treeRows.map((row) => row.id);
  const uniqueRowIds = new Set(rowIds);
  assert.equal(uniqueRowIds.size, rowIds.length, "row IDs must be unique");

  const elementIds = treeRows.flatMap((row) => row.elements.map((el) => el.id));
  const uniqueElementIds = new Set(elementIds);
  assert.equal(
    uniqueElementIds.size,
    elementIds.length,
    "element IDs must be unique",
  );
});

test("T10 levels align with maxLevel and have valid costs", () => {
  const resourceKeys = ["iron", "food", "gold", "valor"];

  for (const row of treeRows) {
    assert.ok(Array.isArray(row.elements), `row ${row.id} elements must be array`);
    assert.ok(row.elements.length > 0, `row ${row.id} must include elements`);

    for (const element of row.elements) {
      assert.ok(Number.isInteger(element.maxLevel), `${element.id} maxLevel must be integer`);
      assert.ok(element.maxLevel >= 1, `${element.id} maxLevel must be >= 1`);
      assert.ok(Array.isArray(element.levels), `${element.id} levels must be array`);
      assert.equal(
        element.levels.length,
        element.maxLevel,
        `${element.id} levels length must match maxLevel`,
      );

      element.levels.forEach((levelData, index) => {
        const expectedLevel = index + 1;
        assert.equal(
          levelData.level,
          expectedLevel,
          `${element.id} level entry mismatch at index ${index}`,
        );

        for (const key of resourceKeys) {
          assert.ok(
            Number.isFinite(levelData[key]),
            `${element.id} L${expectedLevel} ${key} must be finite`,
          );
          assert.ok(
            levelData[key] >= 0,
            `${element.id} L${expectedLevel} ${key} must be non-negative`,
          );
        }
      });
    }
  }
});

test("T10 requirements reference existing elements and valid levels", () => {
  const elements = treeRows.flatMap((row) => row.elements);
  const elementMap = new Map(elements.map((element) => [element.id, element]));

  for (const element of elements) {
    for (const levelData of element.levels) {
      const requirements = levelData.requirements || [];
      assert.ok(
        Array.isArray(requirements),
        `${element.id} L${levelData.level} requirements must be an array`,
      );

      for (const requirement of requirements) {
        assert.ok(
          elementMap.has(requirement.elementId),
          `${element.id} L${levelData.level} requirement references unknown element: ${requirement.elementId}`,
        );

        const requiredElement = elementMap.get(requirement.elementId);
        assert.ok(
          Number.isInteger(requirement.minLevel),
          `${element.id} L${levelData.level} requirement minLevel must be integer`,
        );
        assert.ok(
          requirement.minLevel >= 1 &&
            requirement.minLevel <= requiredElement.maxLevel,
          `${element.id} L${levelData.level} requirement minLevel out of range`,
        );
      }
    }
  }
});
