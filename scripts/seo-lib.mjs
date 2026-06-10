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
    title: "Last War Tools - Free Calculators & Planners",
    description:
      "Free Last War: Survival calculators and planners for HQ upgrades, troop research, seasonal buildings, warzone maps, alliance trackers, and readiness timing — all in your browser.",
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
  "season-2-interactive-map.html": {
    description:
      "Season 2 interactive alliance map for Last War: Survival. Plan territories, strongholds, cities, and strategy pins with live sync and export.",
  },
  "season-3-interactive-map.html": {
    description:
      "Season 3 interactive alliance map for Last War: Survival. Coordinate cities, strongholds, and alliance territory with import and export.",
  },
  "season-4-interactive-map.html": {
    description:
      "Season 4 interactive alliance map for Last War: Survival. Plan territories, alliances, and battle strategy with exportable map layouts.",
  },
  "season-5-interactive-map.html": {
    description:
      "Season 5 interactive alliance map for Last War: Survival. Manage cities, strongholds, and coordinated alliance plans with live sharing.",
  },
  "season-6-interactive-map.html": {
    description:
      "Season 6 interactive alliance map for Last War: Survival. Plan alliance territory, pins, and coordinated attacks with export tools.",
  },
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
  if (filename === "index.html") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: "Last War Survival Tools",
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

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title.replace(/\s*\|\s*Last War Tools\s*$/i, "").trim(),
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
