# Last War Tools

A lightweight set of browser-based tools for planning upgrades in Last War: Survival. The site includes a dedicated homepage plus HQ, troop planners, and Season 1 through Season 5 calculator pages with shared styling and consistent navigation.

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
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for all calculator pages            |
| `page-nav-dropdown.js`                     | Shared dropdown behavior for top navigation           |
| `lwst-common.js`                           | Shared language/translate + safe storage helpers      |
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
  - Interactive Alliance Map (real-time territory planning, import/export)
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
- Dedicated homepage describing what each calculator is used for
- Buy Me a Coffee support link at the top of every page
- Quick Start guidance block at the top of each calculator input card
- Level cost dropdowns showing configured costs per tier
- Alliance tech discount support (RSS reduction %)
- Timezone selector with live current-time display
- Multi-language support via Google Translate dropdown on every page (persisted)
- Separate `localStorage` persistence per calculator page
- Season 2 Supplies Checklist:
  - Tracks all scattered supply coordinates by level (data from `season2_supplies_api.json`)
  - Level dropdown selector with colored dot indicator
  - Text search by coordinate or supply code
  - Hide completed toggle
  - Per-level and overall progress bars
  - Shareable link encoding completed state in the URL (merge or replace on open)
  - Export options: shareable link copy, CSV download, Print/PDF, PNG screenshot
  - Progress persisted in `localStorage`
- Responsive layout with shared styling across calculator pages
- Shared top navigation with season-group dropdowns
- LWST logo in the header that links back to homepage
- SEO metadata per page (description, canonical, Open Graph, Twitter, JSON-LD)

## How To Use

1. Open `index.html` to view the homepage and calculator overview.
2. Use the top navigation to choose Troop, Season 1, Season 2, Season 3, Season 4, or Season 5 calculators.
3. Enter your current level and current resource values.
4. For calculators with income modeling, set workshop/mine/factory levels.
5. Set alliance tech RSS reduction and timezone.
6. Review the summary tiles for deficits, ETA, and ready-time estimates.

## Data Notes

- Calculator cost data and hourly output tables are stored as JavaScript arrays inside each page's `<script>` block.
- Examples include `titaniumCosts`, `squadBaseCosts`, `quartzCosts`, `protectorsFieldS4Costs`, and `lighthouseS4Costs`.
- Output tables are page-specific (mine/workshop/factory arrays), and are used to compute ETA and ready-time displays.
- Most calculators include level data through 35 where source data is available.
- `season2_supplies_api.json` contains the full Season 2 scattered supply coordinate dataset fetched from `https://cpt-hedge.com/api/coordinates?season=2`. Schema: `{ strongholds: [{ level, color, label, coordinates: [{x, y}] }], cities: [] }`. Refresh it by re-running the fetch command to pick up any upstream coordinate changes.

## Deployment

`index.html` is the GitHub Pages entry point and is maintained as the dedicated homepage.

## Tests

Regression checks are included for inline troop planner data so updates to levels/costs/dependencies are validated automatically.

### Run tests

1. Ensure Node.js 18+ is installed.
2. From the repo root, run:

```bash
npm test
```

### What the tests verify

- `tests/t10-data-integrity.test.js`
  - `treeRows` structure exists and is non-empty
  - row IDs and element IDs are unique
  - `levels` count matches `maxLevel`
  - level numbering is sequential
  - resource fields (`iron`, `food`, `gold`, `valor`) are finite and non-negative
  - requirement references point to valid elements and in-range levels
- `tests/t11-data-integrity.test.js`
  - `t11Research` structure exists and is non-empty
  - IDs are unique and include baseline entries (`helmet`, `body-armor`, `accessories`, `weapon`, `unlock`)
  - totals (`materials`, `cores`, `oil`) are finite and non-negative
  - stage cost labels (`early`, `mid`, `final`, `total`) exist and are non-empty strings

## Customization

- Shared style tokens, spacing, cards, grid, and navigation: edit `last-war-furnace-upgrade-calculator.css`.
- Shared language + localStorage helper logic: edit `lwst-common.js`.
- Calculator-specific labels, costs, output tables, and ETA logic: edit the relevant calculator HTML file.
- Navigation links are duplicated across pages; when adding/removing a calculator page, update the nav block in each HTML file.
- When adding/removing pages, also update `sitemap.xml` and ensure canonical URLs remain correct.
