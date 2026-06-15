/**
 * Inserts Google Analytics gtag.js into every HTML page <head>.
 * Run: node scripts/add-google-analytics.mjs
 */
import fs from "fs";
import path from "path";
import { buildGtagSnippet, GA_MEASUREMENT_ID } from "./analytics-lib.mjs";

const root = path.resolve(import.meta.dirname, "..");
const snippet = buildGtagSnippet("    ");

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

function stripExistingGtag(html) {
  return html
    .replace(
      /\s*<!-- Google tag \(gtag\.js\) -->\s*/gi,
      "\n",
    )
    .replace(
      /\s*<script\b[^>]*\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[^"']+["'][^>]*>\s*<\/script>/gi,
      "",
    )
    .replace(
      /\s*<script>\s*window\.dataLayer[\s\S]*?gtag\('config',\s*'G-[^']+'\);\s*<\/script>/gi,
      "",
    );
}

function insertGtag(html) {
  if (!/<head[\s>]/i.test(html) || !/<\/head>/i.test(html)) {
    return null;
  }
  const cleaned = stripExistingGtag(html);
  if (cleaned.includes(GA_MEASUREMENT_ID) && cleaned.includes("googletagmanager.com/gtag/js")) {
    return cleaned;
  }
  return cleaned.replace(/<head([^>]*)>/i, `<head$1>\n${snippet}`);
}

let updated = 0;
let skipped = 0;

for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  const next = insertGtag(html);
  if (!next) {
    skipped++;
    continue;
  }
  if (next === html) {
    skipped++;
    continue;
  }
  fs.writeFileSync(file, next);
  updated++;
  console.log("Updated", path.relative(root, file));
}

console.log(`Done. Updated ${updated}, skipped ${skipped}.`);
