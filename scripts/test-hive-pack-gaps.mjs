/**
 * Probe hive packing across gaps and hub placements.
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
    ContentType: path.extname(file) === ".html" ? "text/html" : "text/plain",
    "Content-Type": path.extname(file) === ".html" ? "text/html" : "text/plain",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(8778, async () => {
  const browser = await chromium.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: true,
  });
  const page = await browser.newPage();
  page.on("dialog", (d) => d.accept());
  await page.goto("http://127.0.0.1:8778/alliance-hive.html", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(800);

  const r = await page.evaluate(() => {
    const api = window.__hiveBuilder;
    function gapBetween(cxa, cya, ha, cxb, cyb, hb) {
      return Math.max(Math.abs(cxa - cxb), Math.abs(cya - cyb)) - ha - hb - 1;
    }
    function check(name, place, gap) {
      document.getElementById("hiveClearBtn")?.click();
      place();
      api.generateAutoHive({
        hubPreference: "acenter",
        baseGap: gap,
        count: 40,
      });
      const ac = api.listAvailableHubs().find((h) => h.type === "acenter");
      const bases = api.getPlacedBaseCenters();
      const issues = [];
      if (!ac) issues.push("no AC");
      if (bases.length < 15) issues.push("few=" + bases.length);
      for (const b of bases) {
        const eg = gapBetween(b.cx, b.cy, 1, ac.cx, ac.cy, ac.half);
        if (eg < gap) issues.push("hubGap<" + gap + " @" + b.cx + "," + b.cy + " eg=" + eg);
      }
      outer: for (let i = 0; i < bases.length; i++) {
        for (let j = i + 1; j < bases.length; j++) {
          const eg = gapBetween(
            bases[i].cx,
            bases[i].cy,
            1,
            bases[j].cx,
            bases[j].cy,
            1,
          );
          if (eg < gap) {
            issues.push("bb@" + i + "," + j + " eg=" + eg);
            break outer;
          }
        }
      }
      const clear = ac.half + 1 + gap + 1;
      if (bases[0]) {
        const pack = Math.max(
          Math.abs(bases[0].cx - ac.cx),
          Math.abs(bases[0].cy - ac.cy),
        );
        if (pack !== clear) {
          issues.push(
            "firstPack=" +
              pack +
              " want " +
              clear +
              " first=" +
              JSON.stringify({
                dx: bases[0].cx - ac.cx,
                dy: bases[0].cy - ac.cy,
              }),
          );
        }
      }
      return {
        name,
        gap,
        n: bases.length,
        first: bases.slice(0, 6).map((b) => ({
          dx: b.cx - ac.cx,
          dy: b.cy - ac.cy,
        })),
        issues: issues.slice(0, 8),
        ok: !issues.length,
      };
    }
    const cases = [];
    for (const g of [0, 1, 2, 3, 5]) {
      cases.push(check("TL g" + g, () => api.placeAllianceCenterAtCenter(4, 4), g));
      cases.push(check("top g" + g, () => api.placeAllianceCenterAtCenter(25, 4), g));
      cases.push(check("int g" + g, () => api.placeAllianceCenterAtCenter(25, 25), g));
      cases.push(check("near g" + g, () => api.placeAllianceCenterAtCenter(10, 10), g));
      cases.push(check("BR g" + g, () => api.placeAllianceCenterAtCenter(45, 45), g));
    }
    return cases;
  });

  let failed = 0;
  for (const row of r) {
    console.log(row.ok ? "ok" : "FAIL", row.name, "n=" + row.n, row.issues, "first", row.first);
    if (!row.ok) failed++;
  }
  console.log(failed ? `FAILED ${failed}/${r.length}` : `PASS ${r.length}`);
  await browser.close();
  server.close();
  process.exit(failed ? 2 : 0);
});
