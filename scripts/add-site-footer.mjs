/**
 * Adds site footer (Contact us, Privacy, Home) to every HTML page.
 * Run: node scripts/add-site-footer.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

const cssLink = `    <link rel="stylesheet" href="/adsense.css" />\n`;
const footerScript = `    <script src="/site-legal-footer.js?v=4" defer></script>\n`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

let updated = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (!/<\/body>/i.test(html)) continue;

  let changed = false;

  if (!html.includes("adsense.css")) {
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, `${cssLink}  </head>`);
      changed = true;
    }
  }

  if (!html.includes("site-legal-footer.js")) {
    html = html.replace(/<\/body>/i, `${footerScript}  </body>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    updated++;
    console.log("Updated", path.relative(root, file));
  }
}

console.log(`Done. Updated ${updated} file(s).`);
