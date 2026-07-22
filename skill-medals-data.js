/**
 * Skill medal costs by hero tier (Last War: Survival).
 * UR max 40 (levels 31–40 need Exclusive Weapon). SSR/SR max 30.
 * SSR ≈ 90% of UR, SR ≈ 80% of UR (community tables / Cpt Hedge / lastwar-guide).
 */
(function () {
  const urFromPrev = [
    0, // level 1 baseline
    200, 200, 400, 400, 600, 600, 800, 800, 1200, // →10
    1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200, 8000, 9200, // →20
    10400, 11600, 12800, 14000, 15200, 16400, 18000, 20000, 22000, 24000, // →30
    26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, // →40
  ];

  function buildLevels(fromPrev, maxLevel) {
    const levels = [];
    let cumulative = 0;
    for (let level = 1; level <= maxLevel; level += 1) {
      const medalsFromPrev = level === 1 ? 0 : fromPrev[level - 1];
      cumulative += medalsFromPrev;
      levels.push({ level: level, medalsFromPrev: medalsFromPrev, cumulative: cumulative });
    }
    return levels;
  }

  const urLevels = buildLevels(urFromPrev, 40);
  const ssrFromPrev = urFromPrev.map(function (n) { return Math.round(n * 0.9); });
  const srFromPrev = urFromPrev.map(function (n) { return Math.round(n * 0.8); });

  window.LW_SKILL_MEDALS_DATA = {
    tiers: {
      UR: {
        id: "UR",
        label: "UR",
        fullLabel: "UR (Ultra Rare)",
        maxLevel: 40,
        note: "Levels 31–40 require an Exclusive Weapon.",
        levels: urLevels,
      },
      SSR: {
        id: "SSR",
        label: "SSR",
        fullLabel: "SSR (Super Rare)",
        maxLevel: 30,
        note: "SSR skills cap at level 30.",
        levels: buildLevels(ssrFromPrev, 30),
      },
      SR: {
        id: "SR",
        label: "SR",
        fullLabel: "SR (Rare)",
        maxLevel: 30,
        note: "SR skills cap at level 30.",
        levels: buildLevels(srFromPrev, 30),
      },
    },
    presets: [
      { label: "→ 15", to: 15 },
      { label: "→ 25", to: 25 },
      { label: "→ 30", to: 30 },
      { label: "→ 40 (UR)", to: 40, tier: "UR" },
    ],
  };
})();
