import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const today = "2026-07-22";
const base = "https://lastwarsurvivaltools.com";

const skip = new Set([
  "transfer-submit.html",
  "image-guides.html",
  "tech-tools.html",
  "404.html",
]);

const priorityMap = {
  "index.html": 1.0,
  "hq-upgrade-calculator.html": 0.9,
  "t11-troops-calculator.html": 0.9,
  "warzone-planner.html": 0.9,
  "research-calculator.html": 0.9,
  "overlord-calculator.html": 0.9,
  "hero-exp-calculator.html": 0.9,
  "hero-awakening-calculator.html": 0.9,
  "exclusive-weapon-calculator.html": 0.9,
  "skill-medals-calculator.html": 0.9,
  "server-search.html": 0.85,
  "ds-tracker.html": 0.85,
  "transfer-tracker.html": 0.85,
  "verus-tracker.html": 0.85,
  "guides.html": 0.85,
  "tech-center-priority.html": 0.85,
  "privacy-policy.html": 0.3,
  "account.html": 0.4,
};

const changefreqMap = {
  "privacy-policy.html": "yearly",
  "account.html": "monthly",
};

const files = fs
  .readdirSync(root)
  .filter((name) => name.endsWith(".html") && !skip.has(name))
  .sort((a, b) => a.localeCompare(b));

function entry(file) {
  const loc = file === "index.html" ? `${base}/` : `${base}/${file}`;
  const priority = priorityMap[file] ?? 0.8;
  const changefreq = changefreqMap[file] ?? "weekly";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.map(entry).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
console.log(`Wrote sitemap with ${files.length} URLs`);
console.log(files.join("\n"));
