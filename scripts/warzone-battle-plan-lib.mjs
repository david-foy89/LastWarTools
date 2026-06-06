/**
 * Shared battle-plan layout/CSS helpers for warzone planner maintenance scripts.
 */
export const BATTLE_PLAN_FILES = [
  "warzone-planner.html",
  "season-1-warzone-planner.html",
  "season-2-warzone-planner.html",
  "season-3-warzone-planner.html",
  "season-4-warzone-planner.html",
  "season-5-warzone-planner.html",
  "season-6-warzone-planner.html",
];

const NL = "\\r?\\n";

export const BATTLE_PLAN_CSS = `      .fwplanner-battle-plan {
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

export const VIEWPORT_CSS = `      .fwplanner-viewport {
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

export const BATTLE_PLAN_SECTION = `            <section class="fwplanner-battle-plan" aria-labelledby="fwplannerBattlePlanTitle">
              <h2 id="fwplannerBattlePlanTitle">Battle plan</h2>
              <p class="fwplanner-hint">
                Saved in this browser and included at the bottom of PNG exports.
              </p>
              <textarea
                id="fwplannerBattlePlan"
                rows="4"
                maxlength="4000"
                placeholder="ex: Phase 1- Port in to south side and secure cannons"
              ></textarea>
            </section>`;

const BATTLE_PLAN_CSS_RE = new RegExp(
  `      \\.fwplanner-battle-plan \\{[\\s\\S]*?      \\.fwplanner-battle-plan textarea \\{[\\s\\S]*?${NL}      \\}`,
);

const BATTLE_PLAN_CSS_LOOSE_RE = new RegExp(
  `\\s*\\.fwplanner-battle-plan \\{[\\s\\S]*?\\.fwplanner-battle-plan textarea \\{[\\s\\S]*?\\}`,
);

const VIEWPORT_CSS_RE = new RegExp(`      \\.fwplanner-viewport \\{[\\s\\S]*?${NL}      \\}`);

const BATTLE_PLAN_SECTION_RE =
  /<section class="fwplanner-battle-plan"[\s\S]*?<\/section>\s*/g;

const CORRECT_LAYOUT_RE = new RegExp(
  `<div id="fwplannerPins" aria-label="Map labels"><\\/div>${NL}\\s*<\\/div>${NL}\\s*<\\/div>${NL}\\s*<section class="fwplanner-battle-plan"[\\s\\S]*?<\\/section>${NL}\\s*<\\/div>${NL}\\s*${NL}\\s*<aside class="fwplanner-panel[^"]*"`,
);

/** Compact layout markers (idempotent check). */
export function hasCompactBattlePlanCss(html) {
  return (
    html.includes("max-height: 160px") &&
    html.includes(".fwplanner-battle-plan .fwplanner-hint")
  );
}

export function hasCompactViewportCss(html) {
  return html.includes("max-height: min(62vh, 720px)");
}

export function isBattlePlanCorrectlyPlaced(html) {
  return CORRECT_LAYOUT_RE.test(html);
}

export function replaceBattlePlanCss(html) {
  if (hasCompactBattlePlanCss(html) && BATTLE_PLAN_CSS_RE.test(html)) {
    return html;
  }
  if (BATTLE_PLAN_CSS_RE.test(html)) {
    return html.replace(BATTLE_PLAN_CSS_RE, BATTLE_PLAN_CSS);
  }
  if (BATTLE_PLAN_CSS_LOOSE_RE.test(html)) {
    return html.replace(BATTLE_PLAN_CSS_LOOSE_RE, `\n${BATTLE_PLAN_CSS}`);
  }
  if (!html.includes(".fwplanner-battle-plan {")) {
    return html.replace(".fwplanner-legend {", `${BATTLE_PLAN_CSS}\n      .fwplanner-legend {`);
  }
  return html;
}

export function replaceViewportCss(html) {
  if (hasCompactViewportCss(html) && VIEWPORT_CSS_RE.test(html)) {
    return html;
  }
  if (VIEWPORT_CSS_RE.test(html)) {
    return html.replace(VIEWPORT_CSS_RE, VIEWPORT_CSS);
  }
  return html;
}

/**
 * Move battle plan under the map (inside canvas-outer, after viewport).
 * Safe to run when section is missing, misplaced, or already correct.
 */
export function relocateBattlePlanSection(html) {
  if (isBattlePlanCorrectlyPlaced(html)) {
    return html;
  }

  html = html.replace(BATTLE_PLAN_SECTION_RE, "");

  // Viewport closed; canvas-outer close then aside (old add-script layout).
  const canvasThenAsideRe = new RegExp(
    `(<div id="fwplannerPins" aria-label="Map labels"><\\/div>${NL}\\s*<\\/div>${NL}\\s*<\\/div>${NL})(\\s*<\\/div>${NL}\\s*${NL}\\s*<aside class="fwplanner-panel[^"]*")`,
  );
  const withCanvasThenAside = html.replace(
    canvasThenAsideRe,
    `$1${BATTLE_PLAN_SECTION}\r\n$2`,
  );
  if (withCanvasThenAside !== html) {
    return withCanvasThenAside;
  }

  // Viewport closed; canvas-outer still open before aside.
  const viewportClosedRe = new RegExp(
    `(<div id="fwplannerPins" aria-label="Map labels"><\\/div>${NL}\\s*<\\/div>${NL}\\s*<\\/div>${NL})(\\s*${NL}\\s*<aside class="fwplanner-panel[^"]*")`,
  );
  const withViewportClosed = html.replace(
    viewportClosedRe,
    `$1${BATTLE_PLAN_SECTION}\r\n          </div>\r\n\r\n          $2`,
  );
  if (withViewportClosed !== html) {
    return withViewportClosed;
  }

  // Only stage closed — close viewport, add section, close canvas-outer.
  const stageClosedRe = new RegExp(
    `(<div id="fwplannerPins" aria-label="Map labels"><\\/div>${NL}\\s*<\\/div>${NL})(\\s*${NL}\\s*<aside class="fwplanner-panel[^"]*")`,
  );
  return html.replace(
    stageClosedRe,
    `$1            </div>\r\n${BATTLE_PLAN_SECTION}\r\n          </div>\r\n\r\n          $2`,
  );
}

export function applyWarzoneBattlePlanLayout(html) {
  html = replaceBattlePlanCss(html);
  html = replaceViewportCss(html);
  html = relocateBattlePlanSection(html);
  return html;
}
