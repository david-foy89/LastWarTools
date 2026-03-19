# Last War Tools

A lightweight set of browser-based calculators for planning upgrades in Last War: Survival. The site now includes HQ, Season 2, Season 3, and Season 4 calculator pages with shared styling and consistent navigation.

## Live Site

Hosted on GitHub Pages via `index.html`.

## Files

| File                                       | Purpose                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `index.html`                               | GitHub Pages entry point                                                        |
| `last-war-furnace-upgrade-calculator.html` | Furnace calculator (Season 2)                                                   |
| `season-2-tank-center-calculator.html`     | Season 2 Squad Base calculator                                                  |
| `hq-upgrade-calculator.html`               | HQ upgrade calculator                                                           |
| `curse-research-lab-calculator.html`       | Season 3 Curse Research Lab calculator                                          |
| `altar-calculator.html`                    | Season 3 Altar calculator                                                       |
| `protectors-field-calculator.html`         | Season 3 Protector's Field calculator                                           |
| `optoelectronic-lab-calculator.html`       | Season 4 Optoelectronic Lab calculator                                          |
| `protectors-field-s4-calculator.html`      | Season 4 Protector's Field calculator                                           |
| `lighthouse-s4-calculator.html`            | Season 4 Lighthouse calculator                                                  |
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for all calculator pages                                      |
| `media/lwst.png`                           | Site logo                                                                       |
| `media/lwst1.png`                          | Alternative logo asset                                                          |
| `wireframes/desktop-wireframe.txt`         | Shared desktop wireframe pattern for calculator pages                           |
| `wireframes/mobile-wireframe.txt`          | Shared mobile wireframe pattern for calculator pages                            |

## Features

- HQ upgrade calculator with prerequisite tracking
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
2. Use the top navigation to choose HQ, Season 2, Season 3, or Season 4 calculators.
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
