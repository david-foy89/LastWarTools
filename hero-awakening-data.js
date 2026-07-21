/** Hero Awakening calculator data (community tables). */
window.LW_HERO_AWAKENING_DATA = {
  /** Per-tier shard costs: unlock, then star 1–5 tiers. */
  tierCosts: [
    50,
    20, 20, 20, 20,
    40, 40, 40, 40, 40,
    70, 70, 70, 70, 70,
    80, 80, 80, 80, 80,
    100, 100, 100, 100, 100,
  ],

  stages: [
    { id: "unlock", label: "Unlock (0 → Awakened)", shardsPerTier: 50, tiers: 1, runningTotal: 50, namedOnly: true },
    { id: "star1", label: "Toward Awakening ★1", shardsPerTier: 20, tiers: 4, runningTotal: 130 },
    { id: "star2", label: "Toward Awakening ★2", shardsPerTier: 40, tiers: 5, runningTotal: 330 },
    { id: "star3", label: "Toward Awakening ★3", shardsPerTier: 70, tiers: 5, runningTotal: 680 },
    { id: "star4", label: "Toward Awakening ★4", shardsPerTier: 80, tiers: 5, runningTotal: 1080 },
    { id: "star5", label: "Toward Awakening ★5", shardsPerTier: 100, tiers: 5, runningTotal: 1580 },
  ],

  milestones: [
    { id: "unlock", label: "Initial unlock", sub: "50 named shards", completedTiers: 1, total: 50, namedOnly: true },
    { id: "star1", label: "Awakening ★1", sub: "130 total shards", completedTiers: 5, total: 130 },
    { id: "star2", label: "Awakening ★2", sub: "330 total shards", completedTiers: 10, total: 330 },
    { id: "star3", label: "Awakening ★3", sub: "680 total shards", completedTiers: 15, total: 680 },
    { id: "star4", label: "Awakening ★4", sub: "1,080 total shards", completedTiers: 20, total: 1080 },
    { id: "star5", label: "Awakening ★5", sub: "1,580 total shards", completedTiers: 25, total: 1580 },
  ],

  heroes: [
    { id: "kimberly", name: "Kimberly", role: "Tank", unlockWeek: 1, bpShards: 70 },
    { id: "dva", name: "DVA", role: "Aircraft", unlockWeek: 4, bpShards: 70 },
    { id: "tesla", name: "Tesla", role: "Missile", unlockWeek: 7, bpShards: 70 },
  ],

  shardSources: [
    {
      id: "trial",
      name: "Awakening Trial",
      yield: 10,
      max: 10,
      shardType: "named",
      cost: "free",
      note: "Up to 10 named shards per hero across the season.",
    },
    {
      id: "expedition",
      name: "Global Expedition",
      yieldMin: 40,
      yieldMax: 60,
      shardType: "either",
      cost: "free",
      note: "PvE in weeks 2, 4, and 6 — primary free source.",
    },
    {
      id: "warMerit",
      name: "War Merit Shop",
      yieldMin: 0,
      yieldMax: 40,
      shardType: "either",
      cost: "currency",
      note: "Some weeks stock awakening shards; depends on earn rate.",
    },
    {
      id: "events",
      name: "Limited-time events",
      yieldMin: 0,
      yieldMax: 20,
      shardType: "either",
      cost: "free",
      note: "Occasional event rewards; varies by week.",
    },
  ],

  prerequisites: {
    heroStars: 5,
    exclusiveWeaponLevel: 20,
    urShardsToFiveStar: 975,
  },
};
