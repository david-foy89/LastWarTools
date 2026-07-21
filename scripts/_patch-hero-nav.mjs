import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const heroNav = `        <details class="page-nav-dropdown" name="hero-nav">
          <summary class="page-link page-nav-dropdown-toggle">Hero Tools</summary>
          <div class="page-nav-dropdown-menu">
            <a href="hero-awakening-calculator.html" class="page-link">Hero Awakening</a>
          </div>
        </details>
`;
const heroNavMultiline = `        <details class="page-nav-dropdown" name="hero-nav">
          <summary class="page-link page-nav-dropdown-toggle">
            Hero Tools
          </summary>
          <div class="page-nav-dropdown-menu">
            <a href="hero-awakening-calculator.html" class="page-link"
              >Hero Awakening</a
            >
          </div>
        </details>
`;

const skipDirs = new Set(["node_modules", ".git", "functions", "media", "research-trees", "scripts"]);

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!skipDirs.has(ent.name)) walk(p, files);
    } else if (ent.name.endsWith(".html") && ent.name !== "hero-awakening-calculator.html") {
      files.push(p);
    }
  }
  return files;
}

const troopBlock = /<details class="page-nav-dropdown(?: active)?" name="troop-nav">[\s\S]*?<\/details>/;

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('name="hero-nav"')) continue;
  if (!html.includes('name="troop-nav"')) continue;

  const useMultiline = html.includes(">\n            Troop Tools");
  const block = useMultiline ? heroNavMultiline : heroNav;
  const replaced = html.replace(troopBlock, (match) => `${match}\n${block}`);
  if (replaced !== html) {
    fs.writeFileSync(file, replaced);
    updated += 1;
  }
}

console.log(`Updated ${updated} files`);
