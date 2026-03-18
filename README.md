# Last War Furnace Upgrade Calculator

A lightweight, single-page calculator for planning furnace upgrades with titanium alloy requirements, mine output, ETA, and timezone-aware readiness tracking.

## Files

- `last-war-furnace-upgrade-calculator.html`: App markup and JavaScript logic
- `last-war-furnace-upgrade-calculator.css`: Styling
- `wireframes/desktop-wireframe.txt`: Desktop layout wireframe
- `wireframes/mobile-wireframe.txt`: Mobile layout wireframe

## Features

- Furnace level selector with level-based titanium alloy requirements
- Current titanium input and live remaining requirement
- Alliance tech discount support (RSS reduction)
- Up to 5 coal mine selectors with total hourly output
- ETA and Upgrade Ready At calculations
- Timezone selector with live Current Time tile
- Language selector integration via Google Translate
- Local state persistence with `localStorage`

## How To Run

1. Open `last-war-furnace-upgrade-calculator.html` in a browser.
2. Select current furnace level and enter your current titanium alloy.
3. Set alliance tech reduction and mine levels.
4. Review required titanium, time estimate, and ready time.

## Data Notes

- Titanium costs are configured in the `titaniumCosts` array inside the HTML script.
- Mine output values are configured in the `coalMineOutputs` array.

## Customization

- Update colors and spacing in `last-war-furnace-upgrade-calculator.css`.
- Update labels and tile positions in `last-war-furnace-upgrade-calculator.html`.
- Update cost values directly in the JS data array when game values change.
