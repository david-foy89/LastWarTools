/**
 * Wires AdSense support files into every HTML page that already has the AdSense head script.
 * Run: node scripts/prepare-adsense-site.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const adsMarker = "ca-pub-1014488780102797";
const bundleMarker = "site-legal-footer.js";

const headLink = `    <link rel="stylesheet" href="/adsense.css" />\n`;

const bodyBundle = `    <script src="/adsense-config.js"></script>
    <script src="/site-legal-footer.js" defer></script>
    <script src="/adsense-placements.js" defer></script>
`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

let headLinks = 0;
let bodyScripts = 0;
let skipped = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes(adsMarker)) {
    skipped++;
    continue;
  }

  let changed = false;

  if (!html.includes("adsense.css")) {
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, `${headLink}  </head>`);
      headLinks++;
      changed = true;
    }
  }

  if (!html.includes(bundleMarker)) {
    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, `${bodyBundle}  </body>`);
      bodyScripts++;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log("Updated", path.relative(root, file));
  }
}

console.log(
  `Done. Head CSS: ${headLinks}, body scripts: ${bodyScripts}, skipped (no AdSense): ${skipped}.`,
);
