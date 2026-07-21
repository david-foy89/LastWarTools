import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const skip = new Set(["node_modules", ".git", "functions", "media", "research-trees", "scripts"]);

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!skip.has(ent.name)) walk(p, files);
    } else if (ent.name.endsWith(".html")) {
      files.push(p);
    }
  }
  return files;
}

/**
 * Fix: Hero Tools was inserted before Troop Tools' closing </details>,
 * nesting it inside troop-nav. Move it out as a sibling.
 */
const nestedPattern =
  /(<details class="page-nav-dropdown(?: active)?" name="troop-nav">[\s\S]*?<\/div>\s*)(<details class="page-nav-dropdown(?: active)?" name="hero-nav">[\s\S]*?<\/details>)\s*(<\/details>)/g;

let fixed = 0;
const files = [];
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  if (!nestedPattern.test(html)) continue;
  nestedPattern.lastIndex = 0;
  const next = html.replace(nestedPattern, "$1$3\n$2");
  if (next !== html) {
    fs.writeFileSync(file, next);
    fixed += 1;
    files.push(path.relative(root, file).replace(/\\/g, "/"));
  }
}

console.log(`Fixed ${fixed} files`);
console.log(files.join("\n"));
