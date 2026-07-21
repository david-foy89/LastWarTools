import fs from "fs";

const filePath = new URL("../alliance-hive.html", import.meta.url);
let html = fs.readFileSync(filePath, "utf8");
const nl = html.includes("\r\n") ? "\r\n" : "\n";
const startMark =
  "        /**" + nl + "         * Pack seats on ONE rectangular street lattice";
const endMark = nl + "        function layoutHubSummary(primary)";
const start = html.indexOf(startMark);
const end = html.indexOf(endMark);
if (start < 0 || end < 0) {
  console.error("markers", start, end);
  process.exit(1);
}

const neu = `        /**
         * Pack seats around the Build-around hub for gap-accurate hive layouts.
         * Side: fill under/open face first (Base 1 under center), then wall shoulders
         * flush with the hub edge. Corner: exact-gap face seats + open quadrant.
         * Other hubs only block cells.
         */
        function generateCandidateCenters(primary, gap) {
          var g = Math.max(0, gap | 0);
          var step = minCenterDistForGap(BLOCK_HALF_3, BLOCK_HALF_3, g);
          var obstacles = packHubWaves(primary);
          if (!obstacles.length || !primary) return [];
          var blocked = hubBlockedSides(primary, gap);
          var edgeCount =
            (blocked.left ? 1 : 0) +
            (blocked.right ? 1 : 0) +
            (blocked.top ? 1 : 0) +
            (blocked.bottom ? 1 : 0);
          var bounds = mapEdgeCenterBounds(g);
          var primaryClear = minCenterDistForGap(primary.half, BLOCK_HALF_3, g);
          var hubL = primary.cx - primary.half;
          var hubR = primary.cx + primary.half;
          var hubT = primary.cy - primary.half;
          var hubB = primary.cy + primary.half;
          var railX = blocked.left
            ? hubL + BLOCK_HALF_3
            : blocked.right
              ? hubR - BLOCK_HALF_3
              : primary.cx;
          var railY = blocked.top
            ? hubT + BLOCK_HALF_3
            : blocked.bottom
              ? hubB - BLOCK_HALF_3
              : primary.cy;
          var dirX = blocked.left ? 1 : blocked.right ? -1 : 0;
          var dirY = blocked.top ? 1 : blocked.bottom ? -1 : 0;

          function clearsAll(x, y) {
            var fi;
            for (fi = 0; fi < obstacles.length; fi++) {
              if (
                footprintsViolateGap(
                  x,
                  y,
                  BLOCK_HALF_3,
                  obstacles[fi].cx,
                  obstacles[fi].cy,
                  obstacles[fi].half,
                  g
                )
              ) {
                return false;
              }
            }
            return true;
          }

          function behindWall(x, y) {
            var leftOf = x < primary.cx;
            var rightOf = x > primary.cx;
            var above = y < primary.cy;
            var below = y > primary.cy;
            if (edgeCount >= 2) {
              if (blocked.left && blocked.top && leftOf && above) return true;
              if (blocked.right && blocked.top && rightOf && above) return true;
              if (blocked.left && blocked.bottom && leftOf && below) return true;
              if (blocked.right && blocked.bottom && rightOf && below) {
                return true;
              }
              return false;
            }
            if (edgeCount === 1) {
              if (blocked.top && y < railY) return true;
              if (blocked.bottom && y > railY) return true;
              if (blocked.left && x < railX) return true;
              if (blocked.right && x > railX) return true;
              return false;
            }
            if (blocked.top && above) return true;
            if (blocked.bottom && below) return true;
            if (blocked.left && leftOf) return true;
            if (blocked.right && rightOf) return true;
            return false;
          }

          var seats = [];
          var seen = Object.create(null);
          var maxI =
            Math.floor(Math.max(bounds.hi - bounds.lo, step) / step) + 4;

          function addSeat(x, y, meta) {
            if (
              x < bounds.lo ||
              x > bounds.hi ||
              y < bounds.lo ||
              y > bounds.hi
            ) {
              return;
            }
            if (!clearsAll(x, y) || behindWall(x, y)) return;
            var key = x + "," + y;
            if (seen[key]) return;
            seen[key] = 1;
            var dx = Math.abs(x - primary.cx);
            var dy = Math.abs(y - primary.cy);
            seats.push({
              cx: x,
              cy: y,
              wave: 0,
              phase: meta.prio | 0,
              pack: dx > dy ? dx : dy,
              manh: dx + dy,
              edgeExact: 0,
              behind: 0,
              onAxis: dx === 0 || dy === 0 ? 0 : 1,
              ringU: meta.ring | 0,
              along: meta.along | 0,
              soft: 0,
              layer: meta.layer | 0,
              ii: meta.ii | 0,
              jj: meta.jj | 0,
              side: meta.side | 0,
              depth: meta.depth | 0,
              rail: meta.rail | 0,
              prio: meta.prio | 0,
            });
          }

          /* —— Corner: exact-gap faces + open quadrant —— */
          if (edgeCount >= 2 && dirX && dirY) {
            var openX0 = primary.cx + dirX * primaryClear;
            var openY0 = primary.cy + dirY * primaryClear;
            var apronRows = [];
            var apronCols = [];
            var ar;
            var ac;
            for (ar = 0; ar < maxI; ar++) {
              var ay = railY + dirY * ar * step;
              if (ay < bounds.lo || ay > bounds.hi) break;
              if (dirY > 0 && ay + BLOCK_HALF_3 > hubB) break;
              if (dirY < 0 && ay - BLOCK_HALF_3 < hubT) break;
              apronRows.push(ay);
            }
            for (ac = 0; ac < maxI; ac++) {
              var ax = railX + dirX * ac * step;
              if (ax < bounds.lo || ax > bounds.hi) break;
              if (dirX > 0 && ax + BLOCK_HALF_3 > hubR) break;
              if (dirX < 0 && ax - BLOCK_HALF_3 < hubL) break;
              apronCols.push(ax);
            }
            var oi;
            var oj;
            var aj;
            var ai;
            for (oi = 0; oi <= maxI; oi++) {
              for (aj = 0; aj < apronRows.length; aj++) {
                addSeat(openX0 + dirX * oi * step, apronRows[aj], {
                  prio: oi * 20 + (aj === 0 ? 0 : 2 + aj),
                  layer: oi,
                  ii: oi,
                  jj: aj,
                  along: oi + aj,
                  side: 0,
                  rail: 1,
                });
              }
            }
            for (ai = 0; ai < apronCols.length; ai++) {
              for (oj = 0; oj <= maxI; oj++) {
                addSeat(apronCols[ai], openY0 + dirY * oj * step, {
                  prio: oj * 20 + (ai === 0 ? 1 : 3 + ai),
                  layer: oj,
                  ii: ai,
                  jj: oj,
                  along: ai + oj,
                  side: 0,
                  rail: 0,
                });
              }
            }
            for (oi = 0; oi <= maxI; oi++) {
              for (oj = 0; oj <= maxI; oj++) {
                var layerO = oi > oj ? oi : oj;
                addSeat(openX0 + dirX * oi * step, openY0 + dirY * oj * step, {
                  prio: layerO * 20 + 10 + oi + oj,
                  layer: layerO,
                  ii: oi,
                  jj: oj,
                  along: oi + oj,
                  side: 0,
                  rail: 0,
                });
              }
            }
            seats.sort(function (a, b) {
              if (a.prio !== b.prio) return a.prio - b.prio;
              if (a.along !== b.along) return a.along - b.along;
              if (a.cy !== b.cy) return a.cy - b.cy;
              return a.cx - b.cx;
            });
            return seats;
          }

          /* —— Side: open-face lattice first, then wall shoulders —— */
          if (edgeCount === 1) {
            var openX;
            var openY;
            var wi;
            var wj;
            var sk;
            if (blocked.top || blocked.bottom) {
              var dY = blocked.top ? 1 : -1;
              openY = primary.cy + dY * primaryClear;
              for (wi = -maxI; wi <= maxI; wi++) {
                for (wj = 0; wj <= maxI; wj++) {
                  var ux = primary.cx + wi * step;
                  var uy = openY + dY * wj * step;
                  var ring = Math.abs(wi) > wj ? Math.abs(wi) : wj;
                  addSeat(ux, uy, {
                    /* Under/open first: deepen before widening (Base 1 under). */
                    prio: wj * 20 + Math.abs(wi) * 2 + (wi > 0 ? 1 : 0),
                    layer: ring,
                    ii: wi,
                    jj: wj,
                    along: Math.abs(wi) + wj,
                    side: wi < 0 ? -1 : wi > 0 ? 1 : 0,
                    depth: wj,
                    rail: 0,
                  });
                }
              }
              for (sk = 0; sk < maxI; sk++) {
                var sy = railY + dY * sk * step;
                if (dY > 0 && sy + BLOCK_HALF_3 > hubB) break;
                if (dY < 0 && sy - BLOCK_HALF_3 < hubT) break;
                addSeat(primary.cx - primaryClear, sy, {
                  prio: 5000 + sk * 2,
                  layer: sk,
                  ii: -1,
                  jj: sk,
                  along: sk,
                  side: -1,
                  depth: sk,
                  rail: 1,
                });
                addSeat(primary.cx + primaryClear, sy, {
                  prio: 5001 + sk * 2,
                  layer: sk,
                  ii: 1,
                  jj: sk,
                  along: sk,
                  side: 1,
                  depth: sk,
                  rail: 1,
                });
              }
              /* Continue face columns into the open half on the same clear X. */
              for (wj = 0; wj <= maxI; wj++) {
                addSeat(primary.cx - primaryClear, openY + dY * wj * step, {
                  prio: 2000 + wj * 2,
                  layer: wj,
                  ii: -1,
                  jj: wj,
                  along: wj,
                  side: -1,
                  depth: wj,
                  rail: 0,
                });
                addSeat(primary.cx + primaryClear, openY + dY * wj * step, {
                  prio: 2001 + wj * 2,
                  layer: wj,
                  ii: 1,
                  jj: wj,
                  along: wj,
                  side: 1,
                  depth: wj,
                  rail: 0,
                });
              }
            } else {
              var dX = blocked.left ? 1 : -1;
              openX = primary.cx + dX * primaryClear;
              for (wj = -maxI; wj <= maxI; wj++) {
                for (wi = 0; wi <= maxI; wi++) {
                  var vx = openX + dX * wi * step;
                  var vy = primary.cy + wj * step;
                  var ringV = Math.abs(wj) > wi ? Math.abs(wj) : wi;
                  addSeat(vx, vy, {
                    prio: wi * 20 + Math.abs(wj) * 2 + (wj > 0 ? 1 : 0),
                    layer: ringV,
                    ii: wi,
                    jj: wj,
                    along: wi + Math.abs(wj),
                    side: wj < 0 ? -1 : wj > 0 ? 1 : 0,
                    depth: wi,
                    rail: 0,
                  });
                }
              }
              for (sk = 0; sk < maxI; sk++) {
                var sx = railX + dX * sk * step;
                if (dX > 0 && sx + BLOCK_HALF_3 > hubR) break;
                if (dX < 0 && sx - BLOCK_HALF_3 < hubL) break;
                addSeat(sx, primary.cy - primaryClear, {
                  prio: 5000 + sk * 2,
                  layer: sk,
                  ii: sk,
                  jj: -1,
                  along: sk,
                  side: -1,
                  depth: sk,
                  rail: 1,
                });
                addSeat(sx, primary.cy + primaryClear, {
                  prio: 5001 + sk * 2,
                  layer: sk,
                  ii: sk,
                  jj: 1,
                  along: sk,
                  side: 1,
                  depth: sk,
                  rail: 1,
                });
              }
              for (wi = 0; wi <= maxI; wi++) {
                addSeat(openX + dX * wi * step, primary.cy - primaryClear, {
                  prio: 2000 + wi * 2,
                  layer: wi,
                  ii: wi,
                  jj: -1,
                  along: wi,
                  side: -1,
                  depth: wi,
                  rail: 0,
                });
                addSeat(openX + dX * wi * step, primary.cy + primaryClear, {
                  prio: 2001 + wi * 2,
                  layer: wi,
                  ii: wi,
                  jj: 1,
                  along: wi,
                  side: 1,
                  depth: wi,
                  rail: 0,
                });
              }
            }
            seats.sort(function (a, b) {
              if (a.prio !== b.prio) return a.prio - b.prio;
              if (a.pack !== b.pack) return a.pack - b.pack;
              if (a.manh !== b.manh) return a.manh - b.manh;
              if (a.cy !== b.cy) return a.cy - b.cy;
              return a.cx - b.cx;
            });
            return seats;
          }

          /* —— Interior: hub-centered street lattice —— */
          function onHubStreet(delta) {
            if (delta === 0) return true;
            if (delta < primaryClear) return false;
            return (delta - primaryClear) % step === 0;
          }
          var cx;
          var cy;
          for (cy = bounds.lo; cy <= bounds.hi; cy++) {
            for (cx = bounds.lo; cx <= bounds.hi; cx++) {
              var dx0 = Math.abs(cx - primary.cx);
              var dy0 = Math.abs(cy - primary.cy);
              if (!onHubStreet(dx0) || !onHubStreet(dy0)) continue;
              if (dx0 < primaryClear && dy0 < primaryClear) continue;
              if (cx === primary.cx && cy === primary.cy) continue;
              addSeat(cx, cy, {
                prio: (dx0 > dy0 ? dx0 : dy0) * 10 + dx0 + dy0,
                layer: 0,
                ii: 0,
                jj: 0,
                along: dx0 + dy0,
                side: 0,
              });
            }
          }
          seats.sort(function (a, b) {
            if (a.pack !== b.pack) return a.pack - b.pack;
            if (a.onAxis !== b.onAxis) return a.onAxis - b.onAxis;
            if (a.manh !== b.manh) return a.manh - b.manh;
            if (a.cy !== b.cy) return a.cy - b.cy;
            return a.cx - b.cx;
          });
          return seats;
        }

`;

html = html.slice(0, start) + neu.replace(/\n/g, nl) + html.slice(end);
fs.writeFileSync(filePath, html);
console.log("generator replaced");
