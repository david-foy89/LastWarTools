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
| `ds-tracker.html`                          | Desert Storm tracker/planner with OCR + map planning  |
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for all calculator pages            |
| `page-nav-dropdown.js`                     | Shared dropdown behavior for top navigation           |
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
    A lightweight set of browser-based tools for planning upgrades in Last War: Survival. The site includes a dedicated homepage plus HQ, troop planners, and Season 1 through Season 5 calculator pages with unified styling, navigation, and map layouts.
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
- Desert Storm Tracker/Planner:
  - Daily history with date picker and score-date navigation
  - Player roster import from CSV/TXT/Excel (`.xlsx`, `.xls`)
  - Screenshot OCR import and auto-matching to existing rows
  - Filter/sort controls for roster management
  - No-show tracking with persisted checkbox state
  - Team-based map planning and PNG export
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

## Features

- Unified interactive map tools for Seasons 1–5:
  - Consistent sidebar width and map area sizing across all seasons
  - "Export Map" feature for sharing plans (replaces "Export Plan")
  - Import feature removed for simplicity and reliability
  - Shared navigation, styling, and layout for all calculators
- HQ upgrade calculator with prerequisite tracking
- Troop planners:
  - T10 research path planner with quick actions and focus filters
  - T11 percentage-based research planner with prorated remaining totals
- Season calculators and planning tools:
  - Virus Research Institute
  - Squad Base

## How To Use

## Wireframes

See `wireframes/desktop-wireframe.txt` and `wireframes/mobile-wireframe.txt` for shared layout patterns. All interactive map and calculator pages now use a unified sidebar and map/grid sizing for a consistent experience across all seasons.

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

## Customization

- Shared style tokens, spacing, cards, grid, and navigation: edit `last-war-furnace-upgrade-calculator.css`.
- Calculator-specific labels, costs, output tables, and ETA logic: edit the relevant calculator HTML file.
- Navigation links are duplicated across pages; when adding/removing a calculator page, update the nav block in each HTML file.
- When adding/removing pages, also update `sitemap.xml` and ensure canonical URLs remain correct.
