const fs = require("fs");
const path = require("path");

const srcPath = path.join(process.env.TEMP || "/tmp", "lwv-7051.js");
const js = fs.readFileSync(srcPath, "utf8");

const ids = [
  ...js.matchAll(
    /\{id:"([a-z0-9-]+)",name:"([^"]+)",category:"([^"]+)",nodes:\[/g
  ),
].map((m) => ({
  id: m[1],
  name: m[2],
  category: m[3],
  index: m.index,
}));

console.log("tree count", ids.length);
ids.forEach((t) => console.log(t.id, "|", t.name, "|", t.category));

if (!ids.length) process.exit(1);

const start = ids[0].index;
// Find enclosing array start: walk back to '['
let arrStart = start;
while (arrStart > 0 && js[arrStart] !== "[") arrStart--;

let depth = 0;
let end = -1;
for (let i = arrStart; i < js.length; i++) {
  const ch = js[i];
  if (ch === "[") depth++;
  else if (ch === "]") {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}

if (end < 0) {
  console.error("Could not find array end");
  process.exit(1);
}

const arrSrc = js.slice(arrStart, end);
let trees;
try {
  trees = new Function("return " + arrSrc)();
} catch (e) {
  console.error("parse fail", e.message);
  process.exit(1);
}

console.log("parsed trees", trees.length);

const outDir = path.join(__dirname, "..", "research-trees");
fs.mkdirSync(outDir, { recursive: true });

const groupMap = {
  "Economy & Growth": "core",
  Squad: "squad",
  "Combat & Defense": "combat",
  "Troop Mastery": "mastery",
};

const catalogOrder = [
  "development",
  "economy",
  "hero",
  "intercity-truck",
  "the-age-of-oil",
  "squad-1",
  "squad-2",
  "squad-3",
  "squad-4",
  "alliance-duel",
  "siege-to-seize",
  "defense-fortifications",
  "special-forces",
  "units",
  "tank-mastery",
  "missile-mastery",
  "aircraft-mastery",
  "tactical-weapon",
];

const byId = Object.create(null);
trees.forEach((t) => {
  byId[t.id] = t;
});

const catalog = catalogOrder
  .filter((id) => byId[id])
  .map((id) => {
    const t = byId[id];
    return {
      id: t.id,
      slug: t.id,
      name: t.name,
      description: t.category + " Tech Center research tree.",
      group: groupMap[t.category] || "advanced",
    };
  });

fs.writeFileSync(
  path.join(outDir, "catalog.js"),
  "/** Tech Center research tree catalog (structure from community calculators). */\n" +
    "window.LW_RESEARCH_CATALOG = " +
    JSON.stringify(catalog, null, 2) +
    ";\n"
);

function convertTree(t) {
  const byRow = {};
  (t.nodes || []).forEach((node) => {
    const row = node.row || 1;
    if (!byRow[row]) byRow[row] = [];
    byRow[row].push(node);
  });

  const treeRows = Object.keys(byRow)
    .map(Number)
    .sort((a, b) => a - b)
    .map((row) => ({
      id: "row-" + row,
      title: "Tier " + row,
      elements: byRow[row].map((node) => ({
        id: node.id,
        name: node.name,
        maxLevel: node.maxLevel,
        levels: (node.levels || []).map((lv) => ({
          level: lv.level,
          iron: lv.iron || 0,
          food: lv.food || 0,
          gold: lv.gold || 0,
          valor: lv.valor || 0,
          requirements: (lv.requirements && lv.requirements.length
            ? lv.requirements
            : node.requirements || []
          ).map((r) => ({
            elementId: r.elementId,
            minLevel: r.minLevel,
          })),
        })),
      })),
    }));

  const hasCosts = treeRows.some((row) =>
    row.elements.some((el) =>
      el.levels.some((lv) => lv.iron || lv.food || lv.gold || lv.valor)
    )
  );

  return {
    id: t.id,
    name: t.name,
    slug: t.id,
    description: t.category + " — Iron, Food, Gold" + (hasCosts ? ", and Valor where used." : "."),
    resources: ["iron", "food", "gold", "valor"],
    hasCosts: !!hasCosts,
    treeRows: treeRows,
  };
}

const loaderLines = [
  "/** Auto-generated research tree loader from community-sourced Tech Center data. */",
  "window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};",
];

trees.forEach((t) => {
  const converted = convertTree(t);
  const file = path.join(outDir, t.id + ".js");
  const body =
    "/** " +
    converted.name +
    " research tree. */\n" +
    "window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};\n" +
    'window.LW_RESEARCH_TREES["' +
    t.id +
    '"] = ' +
    JSON.stringify(converted, null, 2) +
    ";\n";
  fs.writeFileSync(file, body);
  loaderLines.push(
    '// loaded via <script src="research-trees/' + t.id + '.js"></script>'
  );
  console.log(
    "wrote",
    t.id,
    "nodes",
    (t.nodes || []).length,
    "hasCosts",
    converted.hasCosts
  );
});

fs.writeFileSync(
  path.join(outDir, "load-all.js"),
  loaderLines.join("\n") + "\n"
);

console.log("done");
