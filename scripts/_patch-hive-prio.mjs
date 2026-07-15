import fs from "fs";

const filePath = new URL("../alliance-hive.html", import.meta.url);
let html = fs.readFileSync(filePath, "utf8");
const nl = html.includes("\r\n") ? "\r\n" : "\n";

// Fix side open-face priority to match reference ring order
const oldTop = `                  var ring = Math.abs(wi) > wj ? Math.abs(wi) : wj;
                  addSeat(ux, uy, {
                    /* Under/open first: deepen before widening (Base 1 under). */
                    prio: wj * 20 + Math.abs(wi) * 2 + (wi > 0 ? 1 : 0),
                    layer: ring,`;

const newTop = `                  var ring = Math.abs(wi) > wj ? Math.abs(wi) : wj;
                  addSeat(ux, uy, {
                    /* Rings from under-center: Base1 under, Base2 below, then L/R. */
                    prio:
                      ring * 1000 +
                      (wi === 0
                        ? wj
                        : wj === 0
                          ? 100 + Math.abs(wi) * 2 + (wi > 0 ? 1 : 0)
                          : 200 + wj * 10 + Math.abs(wi) * 2 + (wi > 0 ? 1 : 0)),
                    layer: ring,`;

const oldLeft = `                  var ringV = Math.abs(wj) > wi ? Math.abs(wj) : wi;
                  addSeat(vx, vy, {
                    prio: wi * 20 + Math.abs(wj) * 2 + (wj > 0 ? 1 : 0),
                    layer: ringV,`;

const newLeft = `                  var ringV = Math.abs(wj) > wi ? Math.abs(wj) : wi;
                  addSeat(vx, vy, {
                    prio:
                      ringV * 1000 +
                      (wj === 0
                        ? wi
                        : wi === 0
                          ? 100 + Math.abs(wj) * 2 + (wj > 0 ? 1 : 0)
                          : 200 + wi * 10 + Math.abs(wj) * 2 + (wj > 0 ? 1 : 0)),
                    layer: ringV,`;

if (!html.includes("Under/open first: deepen before widening")) {
  // already patched with different text — try alternate
  console.log("top marker missing, searching...");
}
html = html.split(oldTop.replace(/\n/g, nl)).join(newTop.replace(/\n/g, nl));
html = html.split(oldLeft.replace(/\n/g, nl)).join(newLeft.replace(/\n/g, nl));

// Hole-fill: accept open-origin street OR exact-clear shoulder columns/rows
const fillStart = html.indexOf("          /* Hole-fill: same single rectangular lattice as candidates. */");
const fillEnd = html.indexOf("          while (mi < queue.length && placedPts.length) {", fillStart);
if (fillStart < 0 || fillEnd < 0) {
  console.error("fill markers", fillStart, fillEnd);
  process.exit(1);
}

const fillNeu = `          /* Hole-fill: open-face street + exact-clear shoulder rails. */
          var bounds = mapEdgeCenterBounds(gap);
          var blockedFill = hubBlockedSides(hub, gap);
          var primaryClearFill = minCenterDistForGap(hub.half, BLOCK_HALF_3, gap);
          var edgeCountFill =
            (blockedFill.left ? 1 : 0) +
            (blockedFill.right ? 1 : 0) +
            (blockedFill.top ? 1 : 0) +
            (blockedFill.bottom ? 1 : 0);
          var hubLFill = hub.cx - hub.half;
          var hubRFill = hub.cx + hub.half;
          var hubTFill = hub.cy - hub.half;
          var hubBFill = hub.cy + hub.half;
          var dirXFill = blockedFill.left ? 1 : blockedFill.right ? -1 : 0;
          var dirYFill = blockedFill.top ? 1 : blockedFill.bottom ? -1 : 0;
          var railXFill = blockedFill.left
            ? hubLFill + BLOCK_HALF_3
            : blockedFill.right
              ? hubRFill - BLOCK_HALF_3
              : hub.cx;
          var railYFill = blockedFill.top
            ? hubTFill + BLOCK_HALF_3
            : blockedFill.bottom
              ? hubBFill - BLOCK_HALF_3
              : hub.cy;
          var openXFill =
            edgeCountFill === 1 && (blockedFill.left || blockedFill.right)
              ? hub.cx + dirXFill * primaryClearFill
              : edgeCountFill >= 2
                ? hub.cx + dirXFill * primaryClearFill
                : hub.cx;
          var openYFill =
            edgeCountFill === 1 && (blockedFill.top || blockedFill.bottom)
              ? hub.cy + dirYFill * primaryClearFill
              : edgeCountFill >= 2
                ? hub.cy + dirYFill * primaryClearFill
                : hub.cy;

          function behindWallFill(x, y) {
            var leftOf = x < hub.cx;
            var rightOf = x > hub.cx;
            var above = y < hub.cy;
            var below = y > hub.cy;
            if (edgeCountFill >= 2) {
              if (blockedFill.left && blockedFill.top && leftOf && above) return true;
              if (blockedFill.right && blockedFill.top && rightOf && above) return true;
              if (blockedFill.left && blockedFill.bottom && leftOf && below) return true;
              if (blockedFill.right && blockedFill.bottom && rightOf && below) return true;
              return false;
            }
            if (edgeCountFill === 1) {
              if (blockedFill.top && y < railYFill) return true;
              if (blockedFill.bottom && y > railYFill) return true;
              if (blockedFill.left && x < railXFill) return true;
              if (blockedFill.right && x > railXFill) return true;
              return false;
            }
            if (blockedFill.top && above) return true;
            if (blockedFill.bottom && below) return true;
            if (blockedFill.left && leftOf) return true;
            if (blockedFill.right && rightOf) return true;
            return false;
          }

          function onFillLattice(x, y) {
            function onClearStreet(delta) {
              if (delta === 0) return true;
              if (delta < primaryClearFill) return false;
              return (delta - primaryClearFill) % step === 0;
            }
            if (edgeCountFill >= 2 && dirXFill && dirYFill) {
              var onFaceX = onClearStreet(Math.abs(x - hub.cx)) &&
                (dirXFill > 0 ? x > hub.cx : x < hub.cx);
              var onFaceY = onClearStreet(Math.abs(y - hub.cy)) &&
                (dirYFill > 0 ? y > hub.cy : y < hub.cy);
              var onApronX =
                (x - railXFill) % step === 0 &&
                (dirXFill > 0
                  ? x >= railXFill && x + BLOCK_HALF_3 <= hubRFill
                  : x <= railXFill && x - BLOCK_HALF_3 >= hubLFill);
              var onApronY =
                (y - railYFill) % step === 0 &&
                (dirYFill > 0
                  ? y >= railYFill && y + BLOCK_HALF_3 <= hubBFill
                  : y <= railYFill && y - BLOCK_HALF_3 >= hubTFill);
              return (
                (onFaceX && onApronY) ||
                (onApronX && onFaceY) ||
                (onFaceX && onFaceY)
              );
            }
            if (edgeCountFill === 1) {
              if (blockedFill.top || blockedFill.bottom) {
                var shoulderX =
                  Math.abs(x - hub.cx) === primaryClearFill ||
                  (Math.abs(x - hub.cx) > primaryClearFill &&
                    (Math.abs(x - hub.cx) - primaryClearFill) % step === 0 &&
                    false);
                var onShoulder =
                  Math.abs(x - hub.cx) === primaryClearFill &&
                  (y - railYFill) % step === 0 &&
                  (blockedFill.top ? y >= railYFill : y <= railYFill);
                var onOpen =
                  (x - hub.cx) % step === 0 &&
                  (y - openYFill) % step === 0 &&
                  (blockedFill.top ? y >= openYFill : y <= openYFill);
                var onFaceOpen =
                  Math.abs(x - hub.cx) === primaryClearFill &&
                  (y - openYFill) % step === 0 &&
                  (blockedFill.top ? y >= openYFill : y <= openYFill);
                return onOpen || onShoulder || onFaceOpen;
              }
              var onShoulderY =
                Math.abs(y - hub.cy) === primaryClearFill &&
                (x - railXFill) % step === 0 &&
                (blockedFill.left ? x >= railXFill : x <= railXFill);
              var onOpenX =
                (y - hub.cy) % step === 0 &&
                (x - openXFill) % step === 0 &&
                (blockedFill.left ? x >= openXFill : x <= openXFill);
              var onFaceOpenX =
                Math.abs(y - hub.cy) === primaryClearFill &&
                (x - openXFill) % step === 0 &&
                (blockedFill.left ? x >= openXFill : x <= openXFill);
              return onOpenX || onShoulderY || onFaceOpenX;
            }
            var dx = Math.abs(x - hub.cx);
            var dy = Math.abs(y - hub.cy);
            if (!onClearStreet(dx) || !onClearStreet(dy)) return false;
            return dx >= primaryClearFill || dy >= primaryClearFill;
          }

`;

html = html.slice(0, fillStart) + fillNeu.replace(/\n/g, nl) + html.slice(fillEnd);
fs.writeFileSync(filePath, html);
console.log("prio+fill updated", html.includes("Rings from under-center"));
