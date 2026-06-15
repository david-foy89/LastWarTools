/**
 * Shared SEO helpers for Last War Tools public pages.
 */
export const SITE_ORIGIN = "https://lastwarsurvivaltools.com";
export const SITE_NAME = "Last War Tools";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/media/lwst.png`;

/** Root HTML files excluded from the sitemap (utility / noindex). */
export const SITEMAP_EXCLUDE = new Set(["transfer-submit.html"]);

/** Better descriptions and social copy where pages are thin or outdated. */
export const SEO_OVERRIDES = {
  "index.html": {
    title: "Last War Tools — Free Calculators, Maps & Alliance Finders",
    description:
      "Free Last War: Survival tools — T11 armament calculator, HQ upgrade planner, season interactive maps, alliance finder by server, warzone planners, and troop research calculators. No signup required.",
  },
  "t11-troops-calculator.html": {
    title: "Last War T11 Calculator — Armament Cores & Materials",
    description:
      "Free Last War T11 calculator for Armament Institute research. Track remaining Armament Cores, Materials, and Oil by completion %. See how many armament cores you still need for T11 troops.",
    alternateName: [
      "Last War armament calculator",
      "T11 armament core calculator",
      "Last War T11 armament research calculator",
    ],
  },
  "t10-troops-calculator.html": {
    title: "Last War T10 Troops Calculator — Special Forces Path",
    description:
      "Plan Last War T10 troop research along the Special Forces path. Track remaining resources, prerequisite levels, and alliance tech reductions to reach Unit X.",
  },
  "server-search.html": {
    title: "Last War Alliance Finder by Server",
    description:
      "Free Last War alliance finder — search by server number to see active alliances, or look up which server an alliance tag belongs to. Live community registry.",
    alternateName: ["Last War alliance finder", "Last War server search"],
  },
  "ds-tracker.html": {
    title: "Desert Storm Tracker & Planner | Last War Tools",
    description:
      "Track Desert Storm player scores, import leaderboard screenshots with OCR, plan map pins, and export alliance DS data for Last War: Survival.",
  },
  "transfer-tracker.html": {
    title: "Alliance Transfer Tracker | Last War Tools",
    description:
      "Log and track Last War alliance resource transfers, donations, and exchanges with shareable links and leadership notes.",
  },
  "verus-tracker.html": {
    title: "Versus (VS) Tracker | Last War Tools",
    description:
      "Track Versus event scores by player and day, import screenshots with OCR, and monitor VS totals for Last War: Survival alliances.",
  },
  "account.html": {
    title: "Last War Tools Account — Optional Cloud Sync",
    description:
      "Optional free account to sync saved calculator and planner data across browsers. Every Last War tool works without signing in.",
  },
  "hq-upgrade-calculator.html": {
    title: "Last War HQ Upgrade Calculator — Costs to Level 35",
    description:
      "Plan Last War HQ upgrades to level 35 with resource costs, oil requirements, prerequisite buildings, mine output, construction speed bonuses, and ready-time estimates.",
  },
  "warzone-planner.html": {
    description:
      "Plan Warzone capitol battles on an interactive map. Place server tags, alliances, and player names, then export your strategy as PNG.",
  },
  "alliance-hive.html": {
    description:
      "Build and optimize your Last War alliance hive layout. Place buildings, compare layouts, and export hive plans as images.",
  },
  "season-1-interactive-map.html": {
    title: "Last War Season 1 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 1 map for The Crimson Plague. Plan alliance territories, cities, strongholds, and strategy pins with export and live sync.",
    alternateName: ["Last War season 1 map", "Last War Season 1 interactive map"],
  },
  "season-2-interactive-map.html": {
    title: "Last War Season 2 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 2 map for The Polar Storm. Coordinate alliance territory, cities, and battle plans on an interactive map with export.",
    alternateName: ["Last War season 2 map", "Last War Season 2 interactive map"],
  },
  "season-3-interactive-map.html": {
    title: "Last War Season 3 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 3 map for The Golden Realm. Coordinate cities, strongholds, and alliance territory with import and export.",
    alternateName: ["Last War season 3 map"],
  },
  "season-4-interactive-map.html": {
    title: "Last War Season 4 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 4 map for Evernight Isle. Plan territories, alliances, and battle strategy with exportable map layouts.",
    alternateName: ["Last War season 4 map"],
  },
  "season-5-interactive-map.html": {
    title: "Last War Season 5 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 5 map for Wild West. Manage cities, strongholds, and coordinated alliance plans with live sharing.",
    alternateName: ["Last War season 5 map"],
  },
  "season-6-interactive-map.html": {
    title: "Last War Season 6 Map — Interactive Alliance Planner",
    description:
      "Free Last War Season 6 map for Shadow Rainforest. Plan alliance territory, pins, and coordinated attacks with export tools.",
    alternateName: ["Last War season 6 map"],
  },
};

/** FAQ entries for rich results on high-intent search queries. */
export const SEO_FAQ = {
  "t11-troops-calculator.html": [
    {
      question: "How many Armament Cores do you need for T11 in Last War?",
      answer:
        "The full T11 Armament Research path in the Armament Institute requires 3,300 Armament Cores, along with Armament Materials and Oil across five research branches. Enter your current completion percentage in this calculator to see what you still need.",
    },
    {
      question: "What does the Last War T11 calculator do?",
      answer:
        "This free Armament Institute calculator tracks T11 troop research progress. Enter the completion percentage for each research item and it shows your remaining Armament Materials, Armament Cores, and Oil based on published totals.",
    },
  ],
  "server-search.html": [
    {
      question: "How do I find alliances on my server in Last War?",
      answer:
        "Enter your server number in the alliance finder to see alliances registered on that server. You can also search by alliance tag to find which server an alliance is on.",
    },
  ],
  "hq-upgrade-calculator.html": [
    {
      question: "How do I plan HQ upgrades to level 35 in Last War?",
      answer:
        "Set your current HQ level, enter your iron, food, gold, and oil, then add mine levels and construction speed bonuses. The calculator shows resource deficits, prerequisite building costs, and estimated ready time for the next upgrade through HQ 35.",
    },
  ],
};

const OG_IMAGE_BY_FILE = {
  "warzone-planner.html": `${SITE_ORIGIN}/media/warzone-capitol.png`,
  "season-1-warzone-planner.html": `${SITE_ORIGIN}/media/season-1-warzone-capitol.png`,
  "season-2-warzone-planner.html": `${SITE_ORIGIN}/media/season-2-faction-war-capitol.png`,
  "season-3-warzone-planner.html": `${SITE_ORIGIN}/media/season-3-warzone-capitol.png`,
  "season-4-warzone-planner.html": `${SITE_ORIGIN}/media/season-4-warzone-capitol.png`,
  "season-5-warzone-planner.html": `${SITE_ORIGIN}/media/season-5-warzone-capitol.png`,
  "season-6-warzone-planner.html": `${SITE_ORIGIN}/media/season-6-warzone-capitol.png`,
};

export function pageUrl(filename) {
  if (filename === "index.html") {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}/${filename}`;
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function extractTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : "";
}

export function extractDescription(html) {
  const match = html.match(
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  );
  return match ? match[1].trim() : "";
}

export function extractOgImage(html, filename) {
  const match = html.match(
    /<meta\s+property="og:image"\s+content="([^"]*)"/i,
  );
  if (match?.[1]) return match[1].trim();
  return OG_IMAGE_BY_FILE[filename] || DEFAULT_OG_IMAGE;
}

export function resolvePageMeta(filename, html) {
  const override = SEO_OVERRIDES[filename] || {};
  const title = override.title || extractTitle(html) || SITE_NAME;
  const description =
    override.description ||
    extractDescription(html) ||
    `Free ${title} tool for Last War: Survival players.`;
  const url = pageUrl(filename);
  const image = extractOgImage(html, filename);
  const noindex = SITEMAP_EXCLUDE.has(filename);
  return { title, description, url, image, noindex };
}

export function buildJsonLd(filename, meta) {
  const override = SEO_OVERRIDES[filename] || {};
  const appName = meta.title.replace(/\s*\|\s*Last War Tools\s*$/i, "").trim();

  const webApp = {
    "@type": "WebApplication",
    name: appName,
    description: meta.description,
    url: meta.url,
    image: meta.image,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN + "/",
    },
  };

  if (override.alternateName?.length) {
    webApp.alternateName = override.alternateName;
  }

  if (filename === "index.html") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: [
        "Last War Survival Tools",
        "Last War calculators",
        "Last War alliance finder",
      ],
      url: SITE_ORIGIN + "/",
      description: meta.description,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_ORIGIN + "/",
        logo: {
          "@type": "ImageObject",
          url: DEFAULT_OG_IMAGE,
        },
      },
    };
  }

  const faq = SEO_FAQ[filename];
  if (faq?.length) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        webApp,
        {
          "@type": "FAQPage",
          mainEntity: faq.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          })),
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    ...webApp,
  };
}

export function buildSeoBlock(meta) {
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";
  const jsonLd = JSON.stringify(buildJsonLd(meta.filename, meta), null, 2)
    .replace(/</g, "\\u003c");

  return `    <meta
      name="description"
      content="${escapeHtml(meta.description)}"
    />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${meta.url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta
      property="og:description"
      content="${escapeHtml(meta.description)}"
    />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:image" content="${meta.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta
      name="twitter:description"
      content="${escapeHtml(meta.description)}"
    />
    <meta name="twitter:image" content="${meta.image}" />
    <script type="application/ld+json">
${jsonLd}
    </script>
`;
}

export function buildFaviconBlock() {
  return `    <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
`;
}

export function stripSeoTags(html) {
  return html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<!--\s*Open Graph Tags\s*-->\s*/gi, "")
    .replace(/<!--\s*Twitter Card Tags\s*-->\s*/gi, "")
    .replace(/<!--\s*JSON-LD Structured Data\s*-->\s*/gi, "");
}

export function applySeoToHtml(html, filename) {
  const meta = { ...resolvePageMeta(filename, html), filename };
  let next = stripSeoTags(html);

  if (!next.includes('rel="icon"')) {
    if (/<meta\s+name="viewport"/i.test(next)) {
      next = next.replace(
        /(<meta\s+name="viewport"[^>]*>\s*)/i,
        `$1${buildFaviconBlock()}`,
      );
    } else {
      next = next.replace(
        /(<meta\s+charset="[^"]*"\s*\/?>)\s*/i,
        `$1\n${buildFaviconBlock()}`,
      );
    }
  }

  const seoBlock = buildSeoBlock(meta);
  const titleMatch = next.match(/<title>[^<]*<\/title>\s*/i);
  if (!titleMatch) {
    return { html: next, changed: false, meta };
  }

  const newTitle = `<title>${escapeHtml(meta.title)}</title>\n`;
  next = next.replace(/<title>[^<]*<\/title>\s*/i, `${newTitle}${seoBlock}`);

  return { html: next, changed: next !== html, meta };
}
