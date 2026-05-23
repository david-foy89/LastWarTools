const fs = require("fs");

function parseAmount(value) {
  const raw = String(value).trim().replace(/,/g, "");
  if (!raw || raw === "0") return 0;
  const match = raw.match(/^([\d.]+)\s*([kKmM])?$/);
  if (!match) return Number(raw.replace(/[^\d.]/g, "")) || 0;
  const num = Number(match[1]);
  const suffix = (match[2] || "").toLowerCase();
  if (suffix === "k") return Math.round(num * 1000);
  if (suffix === "m") return Math.round(num * 1000000);
  return Math.round(num);
}

const rows = [
  ["1", "2.31M", "00:00:06", "40.50k", "300", "0.5"],
  ["2", "2.42M", "00:18:45", "46.60k", "600", "1"],
  ["3", "2.54M", "00:28:08", "53.00k", "900", "1.5"],
  ["4", "2.65M", "00:42:12", "61.60k", "1.30k", "2"],
  ["5", "2.77M", "01:03:17", "70.80k", "1.80k", "2.5"],
  ["6", "2.88M", "01:34:56", "81.50k", "2.50k", "3"],
  ["7", "3.00M", "02:22:23", "93.70k", "3.40k", "3.5"],
  ["8", "3.11M", "03:33:35", "107.70k", "4.60k", "4"],
  ["9", "3.23M", "05:20:22", "123.90k", "6.10k", "4.5"],
  ["10", "3.35M", "08:00:33", "142.50k", "8.00k", "5"],
  ["11", "3.46M", "08:48:36", "156.70k", "10.10k", "5.5"],
  ["12", "3.58M", "09:41:28", "172.40k", "12.40k", "6"],
  ["13", "3.69M", "10:39:37", "189.60k", "15.00k", "6.5"],
  ["14", "3.81M", "11:43:34", "208.60k", "17.90k", "7"],
  ["15", "3.92M", "12:53:56", "229.50k", "21.10k", "7.5"],
  ["16", "4.04M", "14:11:19", "252.40k", "24.50k", "8"],
  ["17", "4.15M", "15:36:27", "0", "28.10k", "8.5"],
  ["18", "4.27M", "17:10:06", "0", "31.90k", "9"],
  ["19", "4.38M", "18:53:06", "0", "35.90k", "9.5"],
  ["20", "4.50M", "20:46:25", "0", "40.10k", "10"],
  ["21", "0", "22:51:03", "0", "44.60k", "10.5"],
  ["22", "0", "1d 01:08:09", "0", "49.30k", "11"],
  ["23", "0", "1d 03:38:58", "0", "54.30k", "11.5"],
  ["24", "0", "1d 06:24:52", "0", "59.60k", "12"],
  ["25", "0", "1d 09:27:21", "0", "65.20k", "12.5"],
  ["26", "0", "1d 12:48:05", "0", "71.10k", "13"],
  ["27", "0", "1d 16:28:54", "0", "77.40k", "13.5"],
  ["28", "0", "1d 20:31:47", "0", "84.00k", "14"],
  ["29", "0", "2d 00:58:58", "0", "91.00k", "14.5"],
  ["30", "0", "2d 05:52:51", "0", "98.40k", "15"],
];

const bearTotemCosts = rows.map((row, index) => ({
  level: Number(row[0]),
  spore: index === 0 ? 0 : parseAmount(row[1]),
  time: index === 0 ? "0" : row[2],
  seasonXp: parseAmount(row[3]),
  power: parseAmount(row[4]),
  tankDamage: Number(row[5]),
}));

const sporeFactoryOutputs = Array.from({ length: 30 }, (_, index) => ({
  level: index + 1,
  output: (index + 1) * 720,
}));

let html = fs.readFileSync("season-6-squad-base-calculator.html", "utf8");

const pairs = [
  ["Season 5 Tanker Bar", "Season 6 Squad Base"],
  ["season-5-squad-base-calculator.html", "season-6-squad-base-calculator.html"],
  ["Tanker Bar Calculator (Season 5)", "Bear Totem Calculator (Season 6)"],
  ["Current Tanker Bar Level", "Current Bear Totem Level"],
  ["Tanker Bar", "Bear Totem"],
  ["tankerBarCosts", "bearTotemCosts"],
  ["getTankerBarMaxLevel", "getBearTotemMaxLevel"],
  ["currentCoffee", "currentSpore"],
  ["Current Coffee", "Current Spore"],
  ["Coffee Required", "Spore Required"],
  ["coffeeFactoryOutputs", "sporeFactoryOutputs"],
  ["Coffee Workshop", "Spore Factory"],
  ["Coffee Factories", "Spore Factories"],
  ["Coffee Factory", "Spore Factory"],
  ["Need more coffee", "Need more Spore"],
  ["Level / Coffee", "Level / Spore / Tank Hero Damage"],
  ["lastWarSeason5SquadBaseCalcStateV1", "lastWarSeason6SquadBaseCalcStateV1"],
  [
    "Estimate Season 5 Tanker Bar coffee requirements",
    "Estimate Season 6 Bear Totem Spore requirements",
  ],
  ["Last War Season 5 Tanker Bar Calculator", "Last War Season 6 Squad Base Calculator"],
];

for (const [from, to] of pairs) {
  html = html.split(from).join(to);
}

html = html.replace(/\bcoffee\b/g, "spore");
html = html.replace(/\bCoffee\b/g, "Spore");

html = html.replace(
  /const bearTotemCosts = \[[\s\S]*?\n      \];/,
  `const bearTotemCosts = ${JSON.stringify(bearTotemCosts, null, 8).replace(/^/gm, "      ")};`,
);

html = html.replace(
  /const sporeFactoryOutputs = Array\.from[\s\S]*?\n      \}\)\);/,
  `const sporeFactoryOutputs = ${JSON.stringify(sporeFactoryOutputs, null, 8).replace(/^/gm, "      ")};`,
);

fs.writeFileSync("season-6-squad-base-calculator.html", html);
console.log("patched data");
