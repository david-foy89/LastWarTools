const fs = require("fs");

const insertBlock = `            <a href="season-3-desert-artifacts-checklist.html" class="page-link"
              >Desert Artifacts</a
            >
`;

function addDesertLink(html) {
  if (html.includes("season-3-desert-artifacts-checklist.html")) return html;
  const idx = html.indexOf('href="season-3-interactive-map.html"');
  if (idx === -1) return html;
  const fieldIdx = html.lastIndexOf("Protector's Field", idx);
  if (fieldIdx === -1) return html;
  return html.slice(0, idx) + insertBlock + html.slice(idx);
}

let updated = 0;
for (const file of fs.readdirSync(".").filter((f) => f.endsWith(".html"))) {
  if (file === "season-3-desert-artifacts-checklist.html") continue;
  const before = fs.readFileSync(file, "utf8");
  const after = addDesertLink(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    updated += 1;
  }
}

console.log(`Nav updated in ${updated} files`);

const checklist = "season-3-desert-artifacts-checklist.html";
let html = fs.readFileSync(checklist, "utf8");
html = html
  .replace("Total Supplies", "Total Artifacts")
  .replace(
    "No supplies match the current filters for Level",
    "No artifacts match the current filters for Level",
  )
  .replace(
    'count === 1 ? "supply" : "supplies"',
    'count === 1 ? "artifact" : "artifacts"',
  )
  .replace(
    "`Failed to load supplies (${escapeHtml(error.message)})`",
    "`Failed to load artifacts (${escapeHtml(error.message)})`",
  )
  .replace(
    '<div class="checklist-root" id="checklistRoot"></motion>',
    '<div class="checklist-root" id="checklistRoot"><p class="empty-state">Loading artifacts...</p></div>',
  );

html = html.replace(
  '<div class="checklist-root" id="checklistRoot"></div>',
  '<div class="checklist-root" id="checklistRoot"><p class="empty-state">Loading artifacts...</p></div>',
);

fs.writeFileSync(checklist, html);
console.log("Checklist labels updated");
