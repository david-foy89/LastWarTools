# Last War Tools

A lightweight set of browser-based tools for planning upgrades in Last War: Survival. The site includes a dedicated homepage, HQ and troop planners, Season 1 through Season 5 calculators and maps, alliance utilities (Desert Storm / Versus / transfer tracking, hive map, train conductor, server search), and an optional account page for cross-device sync where Firebase is configured.

## Live Site

Hosted on GitHub Pages via `index.html`.

## Files

| File                                       | Purpose                                               |
| ------------------------------------------ | ----------------------------------------------------- |
| `index.html`                               | Homepage with calculator overview and grouped links   |
| `last-war-furnace-upgrade-calculator.html` | Furnace calculator (Season 2)                         |
| `season-2-tank-center-calculator.html`     | Season 2 Squad Base calculator                        |
| `season-2-supplies-checklist.html`         | Season 2 scattered supplies tracking checklist        |
| `season2_supplies_api.json`                | Static Season 2 supply coordinates (fetched from API) |
| `season-1-squad-base-calculator.html`      | Season 1 Squad Base calculator                        |
| `virus-research-institute-calculator.html` | Season 1 Virus Research Institute calculator          |
| `season-1-interactive-map.html`            | Interactive alliance territory planning map for S1    |
| `hq-upgrade-calculator.html`               | HQ upgrade calculator                                 |
| `curse-research-lab-calculator.html`       | Season 3 Curse Research Lab calculator                |
| `altar-calculator.html`                    | Season 3 Altar calculator                             |
| `protectors-field-calculator.html`         | Season 3 Protector's Field calculator                 |
| `optoelectronic-lab-calculator.html`       | Season 4 Optoelectronic Lab calculator                |
| `protectors-field-s4-calculator.html`      | Season 4 Protector's Field calculator                 |
| `lighthouse-s4-calculator.html`            | Season 4 Lighthouse calculator                        |
| `caffeine-institute-calculator.html`       | Season 5 Caffeine Institute calculator                |
| `protectors-field-s5-calculator.html`      | Season 5 Protector's Field calculator                 |
| `season-5-squad-base-calculator.html`      | Season 5 Squad Base calculator                        |
| `t10-troops-calculator.html`               | T10 troop research planner                            |
| `t11-troops-calculator.html`               | T11 troop research planner                            |
| `ds-tracker.html`                          | Desert Storm tracker/planner with OCR + map planning  |
| `verus-tracker.html`                       | Versus tracker: weekly Mon–Sat scores, VS total, OCR + paste-text import |
| `ds-tracker-match-history.js`              | Module: Desert Storm match history UI (loaded by DS)  |
| `ds-tracker-fight-plan.js`                 | Module: fight-plan helpers for DS tracker             |
| `verus-tracker-match-history.js`           | Module: Versus match history (loaded by tracker page) |
| `transfer-tracker.html`                    | Alliance transfer intake: shareable links + Firestore |
| `transfer-submit.html`                     | Public form target for generated transfer links       |
| `alliance-hive.html`                       | Hive Builder — 50×50 hive layout / planning           |
| `train-conductor-schedule.html`            | Train conductor schedule tool                         |
| `server-search.html`                       | Server search utility                                 |
| `account.html`                             | Optional account: profile, username, cloud sync       |
| `account-auth-modal.js`                    | Sign-in/up modal and promo-strip chip (ES module)   |
| `account-sync-global.js`                   | Background merge of local data when signed in         |
| `firebase-config.example.js`               | Template for Firebase web config (deploy as `firebase-config.js`) |
| `language-translate.js`                    | Google Translate widget wiring                        |
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for all calculator pages            |
| `page-nav-dropdown.js`                     | Dropdowns, Alliance Tools link injection, account modal load |
| `sitemap.xml`                              | SEO sitemap listing all public tool pages             |
| `robots.txt`                               | Search crawler directives and sitemap reference       |
| `media/lwst.png`                           | Site logo                                             |
| `media/lwst1.png`                          | Alternative logo asset                                |
| `wireframes/desktop-wireframe.txt`         | Shared desktop wireframe pattern for calculator pages |
| `wireframes/mobile-wireframe.txt`          | Shared mobile wireframe pattern for calculator pages  |

## Features

- HQ upgrade calculator with prerequisite tracking
- Troop planners:
  - T10 research path planner with quick actions and focus filters
  - T11 percentage-based research planner with prorated remaining totals
- Season 1 calculators and planning tools:
  - Virus Research Institute
  - Squad Base
  - Interactive Alliance Map (real-time territory planning; export map; import removed)
- Season 2 calculators:
  - Furnace (single resource + mine output ETA)
  - Squad Base (two resources + factory output ETA)
  - Supplies Checklist (coordinate tracker with level selector, filters, progress, and sharing)
- Season 3 calculators:
  - Curse Research Lab
  - Altar
  - Protector's Field
- Season 4 calculators:
  - Optoelectronic Lab
  - Protector's Field S4
  - Lighthouse S4
- Season 5 calculators:
  - Caffeine Institute
  - Protector's Field S5
  - Squad Base
- Unified interactive map tools for Seasons 1–5:
  - Consistent sidebar width and map area sizing
  - "Export Map" for sharing plans
  - Shared navigation, styling, and layout with calculator pages
- **Alliance Tools** (dropdown in the top nav; `page-nav-dropdown.js` ensures Transfer, Versus, Desert Storm, and Hive Builder links are present alongside any links authored in HTML):
  - Desert Storm Tracker/Planner: day history, score-date navigation, roster import (CSV/TXT/Excel), screenshot/video OCR, filter/sort, no-show checkboxes, team map + PNG export
  - Versus Tracker: weekly Mon–Sat scores and VS total (Desert Storm server-day timing), CSV/Excel import/export, in-browser screenshot/recording OCR (Tesseract), **Paste leaderboard text** (same parsers, no image OCR), optional match history when wired to DS (`verus-tracker-match-history.js`)
  - Transfer Tracker: generate shareable applicant links (and leadership link), Excel/CSV import, Firestore-backed table when `firebase-config.js` is set
  - Hive Builder, Train Conductor, Server Search (as linked from the dropdown)
- Optional **account** strip on many pages: local tools work without sign-in; `account.html` + Firebase enable profile and cross-device sync where implemented
- Dedicated homepage describing major tools
- Buy Me a Coffee support link at the top of every page
- Quick Start guidance on calculator input cards
- Level cost dropdowns, alliance tech RSS reduction, and timezone + live clock on calculators that use them
- Multi-language support via Google Translate (persisted)
- Separate `localStorage` persistence per calculator page (unless a page uses cloud storage)
- Season 2 Supplies Checklist:
  - Coordinates from `season2_supplies_api.json`
  - Level selector, search, hide completed, per-level and overall progress


## How To Use

1. Open `index.html` to view the homepage and calculator overview.
2. Use the top navigation for **HQ Upgrade**, **Troop Tools**, **Season 1–5** dropdowns, and **Alliance Tools** (Desert Storm, Versus, Transfer, Hive, Train Conductor, Server Search—exact set may include HTML-authored links plus injected links from `page-nav-dropdown.js`).
3. On standard calculators, enter your current level and resource values; set workshop/mine/factory levels where the page models income.
4. Set alliance tech RSS reduction and timezone when those controls appear.
5. Review summary tiles for deficits, ETA, and ready-time estimates.
6. For alliance trackers and transfer tools, follow each page’s hero text and controls (week/day pickers, import buttons, or Firebase setup banners as applicable).

## Wireframes

ASCII wireframes live in:

- `wireframes/desktop-wireframe.txt` — shared two-column calculator layout, Season 2 supplies checklist, Desert Storm tracker, **Versus Tracker** (OCR + paste-text dialog), **Transfer Tracker**.
- `wireframes/mobile-wireframe.txt` — stacked-card layouts for the same page types.

Interactive maps use a unified sidebar and map area across seasons; tracker pages follow the shared header, nav, and hero pattern from the main stylesheet. Versus wireframes reflect the Mon–Sat + VS Total + Delete column table (no separate Tech column).

## Data Notes

- **Versus / OCR:** Rank-based fill uses leading rank tokens parsed from OCR or pasted text; ranks are accepted up to **999** (three-digit capture). Reorder table rows to match in-game list order when using rank mapping; name matches override when both rank and name are present.
- Pages that use Firebase (for example `transfer-tracker.html`, `account.html`) expect `firebase-config.js` beside the HTML; copy from `firebase-config.example.js` and supply real project values where documented in-repo.
- Calculator cost data and hourly output tables are stored as JavaScript arrays inside each page's `<script>` block.
- Examples include `titaniumCosts`, `squadBaseCosts`, `quartzCosts`, `protectorsFieldS4Costs`, and `lighthouseS4Costs`.
- Output tables are page-specific (mine/workshop/factory arrays), and are used to compute ETA and ready-time displays.
- Most calculators include level data through 35 where source data is available.
- `season2_supplies_api.json` contains the full Season 2 scattered supply coordinate dataset fetched from `https://cpt-hedge.com/api/coordinates?season=2`. Schema: `{ strongholds: [{ level, color, label, coordinates: [{x, y}] }], cities: [] }`. Refresh it by re-running the fetch command to pick up any upstream coordinate changes.

## Deployment

`index.html` is the GitHub Pages entry point and is maintained as the dedicated homepage.

## Customization

- Shared style tokens, spacing, cards, grid, and navigation: edit `last-war-furnace-upgrade-calculator.css`.
- Calculator-specific labels, costs, output tables, and ETA logic: edit the relevant calculator HTML file.
- Navigation links are duplicated across pages; when adding/removing a calculator page, update the nav block in each HTML file. The **Alliance Tools** menu also gets **Transfer Tracker**, **Versus Tracker**, **Desert Storm Tracker/Planner**, and **Hive Builder** appended at runtime if missing—see `ensureAllianceToolsLinks` in `page-nav-dropdown.js`.
- When adding/removing public pages, update `sitemap.xml` and keep canonical URLs correct.
