# Last War Tools

A lightweight set of browser-based calculators for planning upgrades in Last War: Survival. The site now includes HQ, troop planners, and Season 1 through Season 5 calculator pages with shared styling and consistent navigation.

## Live Site

Hosted on GitHub Pages via `index.html`.

## Files

| File                                       | Purpose                                               |
| ------------------------------------------ | ----------------------------------------------------- |
| `index.html`                               | GitHub Pages entry point                              |
| `last-war-furnace-upgrade-calculator.html` | Furnace calculator (Season 2)                         |
| `season-2-tank-center-calculator.html`     | Season 2 Squad Base calculator                        |
| `season-1-squad-base-calculator.html`      | Season 1 Squad Base calculator                        |
| `virus-research-institute-calculator.html` | Season 1 Virus Research Institute calculator          |
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
| `media/lwst.png`                           | Site logo                                             |
| `media/lwst1.png`                          | Alternative logo asset                                |
| `wireframes/desktop-wireframe.txt`         | Shared desktop wireframe pattern for calculator pages |
| `wireframes/mobile-wireframe.txt`          | Shared mobile wireframe pattern for calculator pages  |

## Features

- HQ upgrade calculator with prerequisite tracking
- Troop planners:
  - T10 research path planner with quick actions and focus filters
  - T11 percentage-based research planner with prorated remaining totals
- Season 1 calculators:
  - Virus Research Institute
  - Squad Base
- Season 2 calculators:
  - Furnace (single resource + mine output ETA)
  - Squad Base (two resources + factory output ETA)
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
- Quick Start guidance block at the top of each calculator input card
- Level cost dropdowns showing configured costs per tier
- Alliance tech discount support (RSS reduction %)
- Timezone selector with live current-time display
- Multi-language support via Google Translate (persisted)
- Separate `localStorage` persistence per calculator page
- Responsive layout with shared styling across calculator pages
- Shared top navigation with season-group dropdowns
- LWST logo in the header with language selector

## How To Use

1. Open `index.html` (or any calculator HTML file directly).
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

## Deployment

`index.html` is the GitHub Pages entry point. If you intentionally keep it as a copy of the furnace page, sync it with:

```powershell
Copy-Item -Path '.\last-war-furnace-upgrade-calculator.html' -Destination '.\index.html' -Force
```

## Customization

- Shared style tokens, spacing, cards, grid, and navigation: edit `last-war-furnace-upgrade-calculator.css`.
- Calculator-specific labels, costs, output tables, and ETA logic: edit the relevant calculator HTML file.
- Navigation links are duplicated across pages; when adding/removing a calculator page, update the nav block in each HTML file.
