/**
 * Exclusive weapon shard costs (Last War: Survival).
 * Unlock: 50 named shards. Levels 2–30: named or universal shards.
 * 
 */
window.LW_EXCLUSIVE_WEAPON_DATA = {
  maxLevel: 30,
  unlockShards: 50,
  unlockNamedOnly: true,
  milestones: [
    { level: 10, label: "Lv 10", note: "Second ability / early visual" },
    { level: 20, label: "Lv 20", note: "Competitive baseline · awakening gate" },
    { level: 30, label: "Lv 30", note: "Full weapon · ultimate ability" },
  ],
  presets: [
    { label: "→ 10", from: 1, to: 10, includeUnlock: false },
    { label: "→ 20", from: 1, to: 20, includeUnlock: false },
    { label: "→ 30", from: 1, to: 30, includeUnlock: false },
    { label: "Unlock + 20", from: 1, to: 20, includeUnlock: true },
    { label: "Unlock + 30", from: 1, to: 30, includeUnlock: true },
  ],
  bands: [
    { from: 0, to: 1, shardsPerLevel: 50, namedOnly: true, label: "0 → 1 (unlock)" },
    { from: 1, to: 5, shardsPerLevel: 20, label: "1 → 5" },
    { from: 5, to: 10, shardsPerLevel: 40, label: "5 → 10" },
    { from: 10, to: 15, shardsPerLevel: 60, label: "10 → 15" },
    { from: 15, to: 20, shardsPerLevel: 100, label: "15 → 20" },
    { from: 20, to: 25, shardsPerLevel: 150, label: "20 → 25" },
    { from: 25, to: 30, shardsPerLevel: 200, label: "25 → 30" },
  ],
  /** shardsFromPrev = cost to reach this level from previous (upgrade path only). */
  levels: [
    { level: 1, shardsFromPrev: 0, cumulative: 0 },
    { level: 2, shardsFromPrev: 20, cumulative: 20 },
    { level: 3, shardsFromPrev: 20, cumulative: 40 },
    { level: 4, shardsFromPrev: 20, cumulative: 60 },
    { level: 5, shardsFromPrev: 20, cumulative: 80 },
    { level: 6, shardsFromPrev: 40, cumulative: 120 },
    { level: 7, shardsFromPrev: 40, cumulative: 160 },
    { level: 8, shardsFromPrev: 40, cumulative: 200 },
    { level: 9, shardsFromPrev: 40, cumulative: 240 },
    { level: 10, shardsFromPrev: 40, cumulative: 280 },
    { level: 11, shardsFromPrev: 60, cumulative: 340 },
    { level: 12, shardsFromPrev: 60, cumulative: 400 },
    { level: 13, shardsFromPrev: 60, cumulative: 460 },
    { level: 14, shardsFromPrev: 60, cumulative: 520 },
    { level: 15, shardsFromPrev: 60, cumulative: 580 },
    { level: 16, shardsFromPrev: 100, cumulative: 680 },
    { level: 17, shardsFromPrev: 100, cumulative: 780 },
    { level: 18, shardsFromPrev: 100, cumulative: 880 },
    { level: 19, shardsFromPrev: 100, cumulative: 980 },
    { level: 20, shardsFromPrev: 100, cumulative: 1080 },
    { level: 21, shardsFromPrev: 150, cumulative: 1230 },
    { level: 22, shardsFromPrev: 150, cumulative: 1380 },
    { level: 23, shardsFromPrev: 150, cumulative: 1530 },
    { level: 24, shardsFromPrev: 150, cumulative: 1680 },
    { level: 25, shardsFromPrev: 150, cumulative: 1830 },
    { level: 26, shardsFromPrev: 200, cumulative: 2030 },
    { level: 27, shardsFromPrev: 200, cumulative: 2230 },
    { level: 28, shardsFromPrev: 200, cumulative: 2430 },
    { level: 29, shardsFromPrev: 200, cumulative: 2630 },
    { level: 30, shardsFromPrev: 200, cumulative: 2830 },
  ],
};
