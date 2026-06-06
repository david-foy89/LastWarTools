/**
 * Verifies add + reflow battle plan scripts are idempotent and fix layout/CSS.
 * Run: node scripts/test-warzone-battle-plan-scripts.mjs
 */
import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  applyWarzoneBattlePlanLayout,
  hasCompactBattlePlanCss,
  hasCompactViewportCss,
  isBattlePlanCorrectlyPlaced,
} from "./warzone-battle-plan-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Old add-script layout: section after </aside></div>, outside the map column.
const afterAddOld = `<div class="fwplanner-wrap">\r\n          <div class="fwplanner-canvas-outer">\r\n            <div class="fwplanner-viewport" id="fwplannerViewport">\r\n              <div class="fwplanner-stage">\r\n                <div id="fwplannerPins" aria-label="Map labels"></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <aside class="fwplanner-panel sidebar"></aside>\r\n        </div>\r\n        <section class="fwplanner-battle-plan" aria-labelledby="fwplannerBattlePlanTitle">\r\n          <textarea id="fwplannerBattlePlan"></textarea>\r\n        </section>\r\n      </div>\r\n    </div>\r\n<style>\r\n      .fwplanner-viewport {\r\n        overflow: visible;\r\n      }\r\n            .fwplanner-battle-plan {\r\n        margin-top: 16px;\r\n        padding: 15px;\r\n      }\r\n      .fwplanner-battle-plan textarea {\r\n        min-height: 140px;\r\n      }\r\n      .fwplanner-legend {}\r\n</style>`;

const laidOut = applyWarzoneBattlePlanLayout(afterAddOld);

assert.ok(hasCompactBattlePlanCss(laidOut), "Bug 1: CSS should be compact after reflow");
assert.ok(hasCompactViewportCss(laidOut), "viewport CSS should be compact");
assert.ok(isBattlePlanCorrectlyPlaced(laidOut), "Bug 2: section should move under map");
assert.ok(!laidOut.includes("min-height: 140px"), "old CSS min-height should be gone");
assert.ok(laidOut.includes('id="fwplannerBattlePlan"'), "textarea id preserved");
assert.ok(!/aside[\s\S]*<section class="fwplanner-battle-plan"/.test(laidOut), "section must not stay after aside");

const again = applyWarzoneBattlePlanLayout(laidOut);
assert.strictEqual(again, laidOut, "second apply should be no-op on fixed layout");

const real = fs.readFileSync(path.join(root, "season-2-warzone-planner.html"), "utf8");
assert.ok(isBattlePlanCorrectlyPlaced(real), "committed planner already has correct layout");
const realAgain = applyWarzoneBattlePlanLayout(real);
assert.strictEqual(realAgain, real, "reflow must not change already-correct planner");

console.log("All tests passed.");
