/**
 * Relocate battle plan under map + compact layout for warzone planners.
 * Run: node scripts/reflow-warzone-battle-plan.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const files = [
  "warzone-planner.html",
  "season-1-warzone-planner.html",
  "season-2-warzone-planner.html",
  "season-3-warzone-planner.html",
  "season-4-warzone-planner.html",
  "season-5-warzone-planner.html",
  "season-6-warzone-planner.html",
];

const battlePlanBlock = `            <section class="fwplanner-battle-plan" aria-labelledby="fwplannerBattlePlanTitle">
              <h2 id="fwplannerBattlePlanTitle">Battle plan</h2>
              <p class="fwplanner-hint">
                Saved in this browser and included at the bottom of PNG exports.
              </p>
              <textarea
                id="fwplannerBattlePlan"
                rows="4"
                maxlength="4000"
                placeholder="e.g. Phase 1 — secure north shield. Phase 2 — rotate alliances to cannons..."
              ></textarea>
            </section>
`;

const oldCss = `            .fwplanner-battle-plan {
        margin-top: 16px;
        background: linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
        border: 1px solid var(--line-soft);
        border-radius: 12px;
        padding: 15px;
      }
      .fwplanner-battle-plan h2 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--accent, #4dabf7);
        margin: 0 0 8px;
        font-weight: 700;
      }
      .fwplanner-battle-plan textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 140px;
        padding: 10px 12px;
        background: rgba(8, 16, 25, 0.7);
        border: 1px solid var(--line, #1e3a4d);
        border-radius: 8px;
        color: var(--text, #d9f0ff);
        font: inherit;
        font-size: 0.9rem;
        line-height: 1.45;
        resize: vertical;
      }`;

const newCss = `      .fwplanner-battle-plan {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--line-soft);
      }
      .fwplanner-battle-plan h2 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--accent, #4dabf7);
        margin: 0 0 6px;
        font-weight: 700;
      }
      .fwplanner-battle-plan .fwplanner-hint {
        margin: 0 0 8px;
        font-size: 0.72rem;
      }
      .fwplanner-battle-plan textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 88px;
        max-height: 160px;
        padding: 8px 10px;
        background: rgba(8, 16, 25, 0.7);
        border: 1px solid var(--line, #1e3a4d);
        border-radius: 8px;
        color: var(--text, #d9f0ff);
        font: inherit;
        font-size: 0.88rem;
        line-height: 1.4;
        resize: vertical;
      }`;

const viewportCssOld = `      .fwplanner-viewport {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-height: 0;
        /* Image sets height; grows the column so no inner scroll at 100% (pins may extend into page) */
        overflow: visible;
        border: 1px solid var(--line, #1e3a4d);
        border-radius: 8px;
        background: #0a1218;
        -webkit-overflow-scrolling: touch;
        touch-action: auto;
      }`;

const viewportCssNew = `      .fwplanner-viewport {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-height: 0;
        max-height: min(62vh, 720px);
        overflow: auto;
        border: 1px solid var(--line, #1e3a4d);
        border-radius: 8px;
        background: #0a1218;
        -webkit-overflow-scrolling: touch;
        touch-action: auto;
      }`;

const oldSection = `        <section class="fwplanner-battle-plan" aria-labelledby="fwplannerBattlePlanTitle">
          <h2 id="fwplannerBattlePlanTitle">Battle plan</h2>
          <p class="fwplanner-hint">
            Type your strategy here. Saved in this browser and included at the bottom of PNG exports.
          </p>
          <textarea
            id="fwplannerBattlePlan"
            rows="6"
            maxlength="4000"
            placeholder="e.g. Phase 1 — secure north shield. Phase 2 — rotate alliances to cannons..."
          ></textarea>
        </section>
`;

for (const file of files) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");

  if (html.includes(oldSection)) {
    html = html.replace(oldSection, "");
  }

  if (!html.includes('class="fwplanner-battle-plan"')) {
    html = html.replace(
      /(\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<aside class="fwplanner-panel)/,
      `\n${battlePlanBlock}          </div>\n\n          <aside class="fwplanner-panel`,
    );
  }

  html = html.replace(oldCss, newCss);
  html = html.replace(viewportCssOld, viewportCssNew);

  fs.writeFileSync(full, html);
  console.log("Updated", file);
}

console.log("Done.");
