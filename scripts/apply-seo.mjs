/**
 * Apply canonical URLs, Open Graph, Twitter, and JSON-LD to root public HTML pages.
 * Run: node scripts/apply-seo.mjs
 */
import fs from "fs";
import path from "path";
import { applySeoToHtml, SITEMAP_EXCLUDE } from "./seo-lib.mjs";

const root = path.resolve(import.meta.dirname, "..");
const files = fs
  .readdirSync(root)
  .filter((name) => name.endsWith(".html"))
  .sort();

let updated = 0;
let unchanged = 0;

for (const file of files) {
  const full = path.join(root, file);
  const before = fs.readFileSync(full, "utf8");
  const { html, changed } = applySeoToHtml(before, file);

  if (!changed) {
    unchanged++;
    console.log("No changes", file);
    continue;
  }

  fs.writeFileSync(full, html);
  updated++;
  console.log("Updated", file, SITEMAP_EXCLUDE.has(file) ? "(noindex)" : "");
}

console.log(`Done. Updated ${updated}, unchanged ${unchanged}.`);
