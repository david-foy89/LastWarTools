/**
 * Hive pack: face-centered geometry from user corner/side references (gap=1).
 */
import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const chromePath = path.join(
  process.env.LOCALAPPDATA || "",
  "ms-playwright",
  "chromium-1148",
  "chrome-win",
  "chrome.exe",
);

const server = http.createServer((req, res) => {
  let p = req.url.split("?")[0];
  if (p === "/") p = "/alliance-hive.html";
  const file = path.join(root, decodeURIComponent(p).replace(/^\//, ""));
  if (
    !file.startsWith(root) ||
    !fs.existsSync(file) ||
    fs.statSync(file).isDirectory()
  ) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, {
    "Content-Type": path.extname(file) === ".html" ? "text/html" : "text/plain",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(8777, async () => {
  const browser = await chromium.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: true,
  });
  const page = await browser.newPage();
  page.on("dialog", (d) => d.accept());
  await page.goto("http://127.0.0.1:8777/alliance-hive.html", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1000);

  const r = await page.evaluate(() => {
    const api = window.__hiveBuilder;
    function analyze(name, place, expectFirst) {
      document.getElementById("hiveClearBtn")?.click();
      place();
      api.generateAutoHive({
        hubPreference: "acenter",
        baseGap: 1,
        count: 40,
      });
      const ac = api.listAvailableHubs().find((h) => h.type === "acenter");
      const bases = api.getPlacedBaseCenters();
      const rel = bases.map((b) => ({ dx: b.cx - ac.cx, dy: b.cy - ac.cy }));
      const firstOk =
        !expectFirst ||
        expectFirst.every(
          (e, i) => rel[i] && rel[i].dx === e.dx && rel[i].dy === e.dy,
        );
      const b0 = bases[0];
      let hubGapOk = false;
      if (b0) {
        const emptyX = Math.abs(b0.cx - ac.cx) - ac.half - 1 - 1;
        const emptyY = Math.abs(b0.cy - ac.cy) - ac.half - 1 - 1;
        hubGapOk = emptyX === 1 || emptyY === 1;
      }
      const nearAc = Math.min(
        ...bases.map((b) =>
          Math.max(Math.abs(b.cx - ac.cx), Math.abs(b.cy - ac.cy)),
        ),
      );
      return {
        name,
        first: rel.slice(0, 10),
        firstOk,
        hubGapOk,
        n: bases.length,
        nearAc,
        ok: bases.length >= 30 && firstOk && hubGapOk && nearAc <= 8,
      };
    }
    return [
      /* Corner ref: face-centered seats at ±2 along the 9-wide AC. */
      analyze("TL", () => api.placeAllianceCenterAtCenter(4, 4), [
        { dx: 7, dy: -2 },
        { dx: -2, dy: 7 },
        { dx: 7, dy: 2 },
        { dx: 2, dy: 7 },
      ]),
      /* Side ref: center under AC, then face shoulders / under flanks. */
      analyze("top", () => api.placeAllianceCenterAtCenter(25, 4), [
        { dx: 0, dy: 7 },
        { dx: -4, dy: 7 },
        { dx: 4, dy: 7 },
        { dx: -7, dy: -2 },
        { dx: 7, dy: -2 },
        { dx: -7, dy: 2 },
        { dx: 7, dy: 2 },
      ]),
      analyze(
        "top+AE",
        () => {
          api.placeAllianceCenterAtCenter(25, 4);
          api.placeAeAtCenter(25, 28);
        },
        [
          { dx: 0, dy: 7 },
          { dx: -4, dy: 7 },
          { dx: 4, dy: 7 },
        ],
      ),
      analyze("left", () => api.placeAllianceCenterAtCenter(4, 25), [
        { dx: 7, dy: 0 },
        { dx: 7, dy: -4 },
        { dx: 7, dy: 4 },
        { dx: -2, dy: -7 },
        { dx: -2, dy: 7 },
        { dx: 2, dy: -7 },
        { dx: 2, dy: 7 },
      ]),
    ];
  });

  let failed = 0;
  for (const row of r) {
    console.log(row.ok ? "ok" : "FAIL", row.name, {
      firstOk: row.firstOk,
      hubGapOk: row.hubGapOk,
      nearAc: row.nearAc,
      n: row.n,
      first: row.first,
    });
    if (!row.ok) failed++;
  }
  console.log(failed ? `FAILED ${failed}` : "PASS");
  await browser.close();
  server.close();
  process.exit(failed ? 2 : 0);
});
