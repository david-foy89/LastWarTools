/**
 * Generate sitemap.xml from root public HTML pages.
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from "fs";
import path from "path";
import { SITEMAP_EXCLUDE, SITE_ORIGIN, pageUrl } from "./seo-lib.mjs";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "sitemap.xml");

const PRIORITY = {
  "index.html": "1.0",
  "hq-upgrade-calculator.html": "0.9",
  "warzone-planner.html": "0.9",
  "transfer-tracker.html": "0.85",
  "ds-tracker.html": "0.85",
  "verus-tracker.html": "0.85",
};

function formatLastmod(date) {
  return date.toISOString().slice(0, 10);
}

const files = fs
  .readdirSync(root)
  .filter((name) => name.endsWith(".html") && !SITEMAP_EXCLUDE.has(name))
  .sort((a, b) => {
    if (a === "index.html") return -1;
    if (b === "index.html") return 1;
    return a.localeCompare(b);
  });

const urls = files.map((file) => {
  const stat = fs.statSync(path.join(root, file));
  const priority = PRIORITY[file] || "0.8";
  return `  <url>
    <loc>${pageUrl(file)}</loc>
    <lastmod>${formatLastmod(stat.mtime)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync(out, xml);
console.log(`Wrote ${files.length} URLs to sitemap.xml`);
