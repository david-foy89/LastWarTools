/**
 * Ensures Google's AdSense head snippet is inside <head> on every HTML page.
 * https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const marker = "ca-pub-1014488780102797";

/** Exact format from Google AdSense setup instructions */
const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1014488780102797"
     crossorigin="anonymous"></script>`;

const adsenseScriptIndented = `    ${adsenseScript}\n`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

function stripExistingAdsenseScript(html) {
  return html.replace(
    /\s*<script\b[^>]*\bsrc=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1014488780102797["'][^>]*>\s*<\/script>/gi,
    "",
  );
}

function insertBeforeHeadClose(html) {
  const cleaned = stripExistingAdsenseScript(html);
  if (!/<\/head>/i.test(cleaned)) return null;
  if (cleaned.includes(adsenseScript)) return cleaned;
  return cleaned.replace(/<\/head>/i, `${adsenseScriptIndented}  </head>`);
}

let normalized = 0;
let skipped = 0;

for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  if (!/<head[\s>]/i.test(html) || !/<\/head>/i.test(html)) {
    skipped++;
    continue;
  }
  const next = insertBeforeHeadClose(html);
  if (!next || next === html) {
    skipped++;
    continue;
  }
  fs.writeFileSync(file, next);
  normalized++;
  console.log("Updated", path.relative(root, file));
}

console.log(
  `Done. Normalized ${normalized} file(s). Skipped ${skipped} (no <head> — run fix-redirect-stubs.mjs for redirect pages).`,
);
