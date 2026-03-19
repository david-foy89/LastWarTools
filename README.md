# Last War Tools

A lightweight set of browser-based calculators for planning upgrades in Last War: Survival, including furnace upgrades and Season 2 Squad Base upgrades.

## Live Site

Hosted on GitHub Pages via `index.html`.

## Files

| File                                       | Purpose                                                      |
| ------------------------------------------ | ------------------------------------------------------------ |
| `index.html`                               | GitHub Pages entry point (copy of the furnace calculator)    |
| `last-war-furnace-upgrade-calculator.html` | Furnace calculator — markup and JavaScript logic             |
| `season-2-tank-center-calculator.html`     | Season 2 Squad Base calculator — markup and JavaScript logic |
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for both calculator pages                  |
| `media/lwst.png`                           | Site logo (top-left header)                                  |
| `media/lwst1.png`                          | Alternative logo asset                                       |
| `wireframes/desktop-wireframe.txt`         | Desktop layout wireframe                                     |
| `wireframes/mobile-wireframe.txt`          | Mobile layout wireframe                                      |

## Features

- Furnace calculator with levels 1–30, titanium alloy costs, coal mine output tracking, and ETA calculation
- Season 2 Squad Base calculator with levels 1–30, coal and titanium alloy requirements, and dual-resource ETA calculation
- Level cost dropdowns showing the configured resource requirements for each tier
- Alliance tech discount support (RSS reduction %)
- Timezone selector with live Current Time display
- Multi-language support via Google Translate (persisted across sessions)
- Separate `localStorage` persistence for each calculator page
- Responsive layout with shared styling across both calculators
- Page navigation links between the furnace and Season 2 Squad Base calculators
- LWST logo displayed top-left; language selector top-right

## How To Use

1. Open `last-war-furnace-upgrade-calculator.html` or visit the GitHub Pages URL.
2. Use the page links near the top to switch between the Furnace and Season 2 Squad Base calculators.
3. Enter your current level, current resources, and any hourly income values needed for the selected calculator.
4. Set your alliance tech RSS reduction percentage.
5. Review the summary tiles for required resources, remaining deficit, ETA, and upgrade ready time.

## Data Notes

- Furnace titanium costs for levels 1–30 are in the `titaniumCosts` array inside the furnace HTML `<script>`.
- Furnace coal mine hourly output values are in the `coalMineOutputs` array.
- Season 2 Squad Base coal and titanium alloy values are in the `squadBaseCosts` array inside the Squad Base HTML `<script>`.
- Level 30 is the current maximum supported level on both calculators.

## Deployment

`index.html` must be kept in sync with `last-war-furnace-upgrade-calculator.html` for GitHub Pages. The root page links to the Squad Base calculator:

```powershell
Copy-Item -Path '.\last-war-furnace-upgrade-calculator.html' -Destination '.\index.html' -Force
```

## Customization

- Colors and spacing: edit `last-war-furnace-upgrade-calculator.css`.
- Furnace labels, tile layout, and titanium data: edit `last-war-furnace-upgrade-calculator.html`.
- Squad Base labels, tile layout, and cost data: edit `season-2-tank-center-calculator.html`.
