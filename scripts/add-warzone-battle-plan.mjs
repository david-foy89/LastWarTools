/**
 * Adds battle plan section to all warzone planner pages.
 * Run: node scripts/add-warzone-battle-plan.mjs
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

const cssBlock = `      .fwplanner-battle-plan {
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
      }
`;

const htmlBlock = `        <section class="fwplanner-battle-plan" aria-labelledby="fwplannerBattlePlanTitle">
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

const scriptTag = `    <script src="warzone-planner-battle-plan.js"></script>\n`;

function patch(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.warn("Skip missing", file);
    return false;
  }
  let html = fs.readFileSync(full, "utf8");
  if (html.includes("fwplannerBattlePlan")) {
    console.log("Already patched", file);
    return false;
  }

  if (!html.includes(".fwplanner-legend {")) {
    console.warn("No legend CSS anchor in", file);
    return false;
  }
  html = html.replace(".fwplanner-legend {", cssBlock + "      .fwplanner-legend {");

  html = html.replace(
    /(\s*<\/aside>\s*\n\s*<\/div>\s*\n)(\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<script>)/,
    `$1${htmlBlock}$2`,
  );

  if (!html.includes("warzone-planner-battle-plan.js")) {
    html = html.replace(/\n\s*<script>\s*\n\s*\(function \(\) \{/, `\n${scriptTag}    <script>\n      (function () {`);
  }

  html = html.replace(
    /const state = \{\s*markers: \[\], nextId: 1, placeMode: false, scale: 1 \};/,
    "const state = { markers: [], nextId: 1, placeMode: false, scale: 1, battlePlan: \"\" };",
  );

  html = html.replace(
    /const state = \{\s*mapId: "nexus",\s*markersByMap: \{\},\s*markers: \[\],\s*nextId: 1,\s*placeMode: false,\s*scale: 1,\s*\};/,
    `const state = {
          mapId: "nexus",
          markersByMap: {},
          markers: [],
          nextId: 1,
          placeMode: false,
          scale: 1,
          battlePlan: "",
        };`,
  );

  html = html.replace(
    /const modeBtn = \$\("fwplannerModeBtn"\);/,
    `const modeBtn = $("fwplannerModeBtn");
        const battlePlanInput = $("fwplannerBattlePlan");`,
  );

  html = html.replace(
    /JSON\.stringify\(\{ markers: state\.markers, nextId: state\.nextId \}\)/,
    "JSON.stringify({ markers: state.markers, nextId: state.nextId, battlePlan: state.battlePlan || \"\" })",
  );

  html = html.replace(
    /JSON\.stringify\(\{\s*mapId: state\.mapId,\s*markersByMap: state\.markersByMap,\s*\}\)/,
    "JSON.stringify({ mapId: state.mapId, markersByMap: state.markersByMap, battlePlan: state.battlePlan || \"\" })",
  );

  html = html.replace(
    /if \(Number\.isFinite\(data\.nextId\) && data\.nextId > state\.nextId\) \{\s*state\.nextId = data\.nextId;\s*\}/,
    `if (Number.isFinite(data.nextId) && data.nextId > state.nextId) {
              state.nextId = data.nextId;
            }
            if (typeof data.battlePlan === "string") {
              state.battlePlan = data.battlePlan;
            }`,
  );

  html = html.replace(
    /syncActiveMarkersFromPack\(\);\s*\} catch \(e\) \{\s*\/\* ignore \*\/\s*\}\s*\}/,
    `syncActiveMarkersFromPack();
            if (typeof data.battlePlan === "string") {
              state.battlePlan = data.battlePlan;
            }
          } catch (e) {
            /* ignore */
          }
        }`,
  );

  const exportAppend = `          let exportCanvas = c;
          const battlePlanText = battlePlanInput
            ? battlePlanInput.value
            : state.battlePlan || "";
          const bpMod = window.__lwWarzoneBattlePlan;
          if (bpMod && bpMod.measureHeight && bpMod.draw) {
            const extraH = bpMod.measureHeight(xctx, battlePlanText, W, scaleW);
            if (extraH > 0) {
              const full = document.createElement("canvas");
              full.width = W;
              full.height = H + extraH;
              const fctx = full.getContext("2d");
              if (fctx) {
                fctx.drawImage(c, 0, 0);
                bpMod.draw(fctx, battlePlanText, W, H, scaleW);
                exportCanvas = full;
              }
            }
          }
          exportCanvas.toBlob(`;

  html = html.replace(/\s*c\.toBlob\(\s*function \(blob\) \{/, `\n          ${exportAppend}\n            function (blob) {`);

  html = html.replace(
    /\$\("fwplannerExportPngBtn"\)\.addEventListener\("click", function \(\) \{\s*exportToPng\(\);\s*\}\);/,
    `$("fwplannerExportPngBtn").addEventListener("click", function () {
          exportToPng();
        });

        function syncBattlePlanFromInput() {
          if (!battlePlanInput) return;
          state.battlePlan = battlePlanInput.value;
          save();
        }

        if (battlePlanInput) {
          battlePlanInput.addEventListener("input", syncBattlePlanFromInput);
        }`,
  );

  html = html.replace(
    /load\(\);\s*\n\s*render\(\);/,
    `load();
        if (battlePlanInput) {
          battlePlanInput.value = state.battlePlan || "";
        }
        render();`,
  );

  fs.writeFileSync(full, html);
  console.log("Patched", file);
  return true;
}

let n = 0;
for (const f of files) {
  if (patch(f)) n++;
}
console.log(`Done. Patched ${n} file(s).`);
