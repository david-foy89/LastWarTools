/**
 * Inserts Google AdSense head script into all HTML pages that have <head>.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const marker = "ca-pub-1014488780102797";
const snippet = `    <link rel="stylesheet" href="/adsense.css" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1014488780102797"
     crossorigin="anonymous"></script>
`;

const footerSnippet = `    <script src="/site-legal-footer.js?v=3" defer></script>
`;

const bodySnippet = `    <script src="/adsense-config.js"></script>
    <script src="/site-legal-footer.js?v=3" defer></script>
    <script src="/adsense-placements.js" defer></script>
`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

let updated = 0;
let skipped = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(marker)) {
    skipped++;
    continue;
  }
  if (!/<head[\s>]/i.test(html) || !/<\/head>/i.test(html)) {
    skipped++;
    continue;
  }
  html = html.replace(/<\/head>/i, `${snippet}  </head>`);
  if (!html.includes("site-legal-footer.js") && /<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `${bodySnippet}  </body>`);
  }
  fs.writeFileSync(file, html);
  updated++;
  console.log("Updated", path.relative(root, file));
}

console.log(`Done. Updated ${updated}, skipped ${skipped}.`);
