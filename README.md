# Last War Tools

A lightweight, single-page calculator for planning furnace upgrades in Last War: Survival — tracking titanium alloy requirements, coal mine output, ETA, and timezone-aware readiness.

## Live Site

Hosted on GitHub Pages via `index.html`.

## Files

| File                                       | Purpose                                       |
| ------------------------------------------ | --------------------------------------------- |
| `index.html`                               | GitHub Pages entry point (copy of calculator) |
| `last-war-furnace-upgrade-calculator.html` | Main app — markup and JavaScript logic        |
| `last-war-furnace-upgrade-calculator.css`  | Shared stylesheet for both HTML files         |
| `media/lwst.png`                           | Site logo (top-left header)                   |
| `media/lwst1.png`                          | Alternative logo asset                        |
| `wireframes/desktop-wireframe.txt`         | Desktop layout wireframe                      |
| `wireframes/mobile-wireframe.txt`          | Mobile layout wireframe                       |

## Features

- Furnace level selector (levels 1–30) with titanium alloy costs per level
- Level / Titanium Alloy dropdown showing cost for each tier
- Current titanium input with live remaining requirement calculation
- Alliance tech discount support (RSS reduction %)
- Up to 5 coal mine selectors with combined hourly output display
- ETA calculation and Upgrade Ready At time (full-width summary tile)
- Timezone selector with live Current Time display
- Multi-language support via Google Translate (persisted across sessions)
- Full state persistence via `localStorage` (key: `lastWarFurnaceCalcStateV1`)
- Responsive layout — desktop two-column, single-column on mobile
- LWST logo displayed top-left; language selector top-right

## How To Use

1. Open `last-war-furnace-upgrade-calculator.html` in a browser (or visit the GitHub Pages URL).
2. Select your current furnace level.
3. Enter your current titanium alloy stockpile.
4. Set your alliance tech RSS reduction percentage.
5. Select the output level for each active coal mine.
6. Review the summary tiles: titanium still needed, estimated time, and when the upgrade will be ready.

## Data Notes

- Titanium costs for levels 1–30 are in the `titaniumCosts` array inside the HTML `<script>`.
- Coal mine hourly output values are in the `coalMineOutputs` array.
- Level 30 is the current maximum supported level.

## Deployment

`index.html` must be kept in sync with `last-war-furnace-upgrade-calculator.html` for GitHub Pages:

```powershell
Copy-Item -Path '.\last-war-furnace-upgrade-calculator.html' -Destination '.\index.html' -Force
```

## Customization

- Colors and spacing: edit `last-war-furnace-upgrade-calculator.css`.
- Tile layout or labels: edit the HTML file.
- Titanium cost data: update the `titaniumCosts` array in the `<script>` block when game values change.
