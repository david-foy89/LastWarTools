/**
 * Relocate battle plan under map + apply compact layout CSS.
 * Idempotent — safe after add-warzone-battle-plan.mjs.
 * Run: node scripts/reflow-warzone-battle-plan.mjs
 */
import fs from "fs";
import path from "path";
import {
  BATTLE_PLAN_FILES,
  applyWarzoneBattlePlanLayout,
  hasCompactBattlePlanCss,
  hasCompactViewportCss,
  isBattlePlanCorrectlyPlaced,
} from "./warzone-battle-plan-lib.mjs";

const root = path.resolve(import.meta.dirname, "..");

for (const file of BATTLE_PLAN_FILES) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.warn("Skip missing", file);
    continue;
  }

  const before = fs.readFileSync(full, "utf8");
  const after = applyWarzoneBattlePlanLayout(before);

  if (after === before) {
    console.log("No changes", file);
    continue;
  }

  fs.writeFileSync(full, after);
  const notes = [];
  if (!hasCompactBattlePlanCss(before) && hasCompactBattlePlanCss(after)) {
    notes.push("css");
  }
  if (!hasCompactViewportCss(before) && hasCompactViewportCss(after)) {
    notes.push("viewport");
  }
  if (!isBattlePlanCorrectlyPlaced(before) && isBattlePlanCorrectlyPlaced(after)) {
    notes.push("relocated");
  }
  console.log("Updated", file, notes.length ? `(${notes.join(", ")})` : "");
}

console.log("Done.");
