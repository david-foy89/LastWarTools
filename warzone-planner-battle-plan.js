/**
 * Battle plan block for warzone planner PNG exports.
 */
(function () {
  "use strict";

  const FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  function breakStringToWidth(ctx, str, maxW) {
    const out = [];
    if (!str) return out;
    let chunk = "";
    for (let c = 0; c < str.length; c++) {
      const next = chunk + str[c];
      if (ctx.measureText(next).width > maxW && chunk) {
        out.push(chunk);
        chunk = str[c];
      } else {
        chunk = next;
      }
    }
    if (chunk) out.push(chunk);
    return out;
  }

  function wrapParagraph(ctx, text, maxW) {
    const t = String(text || "").trim();
    if (!t) return [];
    if (ctx.measureText(t).width <= maxW) return [t];
    const words = t.split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (ctx.measureText(w).width > maxW) {
        if (current) {
          lines.push(current);
          current = "";
        }
        breakStringToWidth(ctx, w, maxW).forEach(function (part) {
          lines.push(part);
        });
        continue;
      }
      const next = current ? current + " " + w : w;
      if (ctx.measureText(next).width > maxW) {
        if (current) lines.push(current);
        current = w;
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function buildLines(ctx, text, maxW) {
    const raw = String(text || "");
    if (!raw.trim()) return [];
    const lines = [];
    raw.split(/\r?\n/).forEach(function (para) {
      if (!String(para).trim()) {
        lines.push("");
        return;
      }
      wrapParagraph(ctx, para, maxW).forEach(function (line) {
        lines.push(line);
      });
    });
    while (lines.length && lines[lines.length - 1] === "") lines.pop();
    return lines;
  }

  function layout(text, width, scaleW) {
    const trimmed = String(text || "").trim();
    if (!trimmed) {
      return { height: 0, lines: [], titleSize: 0, bodySize: 0, lineH: 0, pad: 0 };
    }
    const pad = Math.max(12, 16 * scaleW);
    const titleSize = Math.max(14, 18 * scaleW);
    const bodySize = Math.max(11, 14 * scaleW);
    const innerW = Math.max(40, width - pad * 2);
    const measure = document.createElement("canvas").getContext("2d");
    measure.font = "700 " + titleSize + "px " + FONT;
    const titleH = titleSize * 1.35;
    measure.font = "400 " + bodySize + "px " + FONT;
    const lines = buildLines(measure, trimmed, innerW);
    const lineH = bodySize * 1.35;
    const gap = Math.max(6, 8 * scaleW);
    const height = pad + titleH + gap + lines.length * lineH + pad;
    return { height, lines, titleSize, bodySize, lineH, pad, gap, innerW };
  }

  function measureHeight(ctx, text, width, scaleW) {
    return layout(text, width, scaleW).height;
  }

  function draw(ctx, text, mapW, mapH, scaleW) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;
    const info = layout(trimmed, mapW, scaleW);
    const y0 = mapH;
    const h = info.height;
    const x0 = 0;

    ctx.save();
    ctx.fillStyle = "rgb(12, 22, 34)";
    ctx.fillRect(x0, y0, mapW, h);
    ctx.strokeStyle = "rgba(116, 192, 252, 0.35)";
    ctx.lineWidth = Math.max(1, 2 * scaleW);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(mapW, y0);
    ctx.stroke();

    let y = y0 + info.pad;
    ctx.fillStyle = "#74c0fc";
    ctx.font = "700 " + info.titleSize + "px " + FONT;
    ctx.textBaseline = "top";
    ctx.fillText("Battle plan", x0 + info.pad, y);
    y += info.titleSize * 1.35 + info.gap;

    ctx.fillStyle = "rgba(228, 237, 247, 0.92)";
    ctx.font = "400 " + info.bodySize + "px " + FONT;
    info.lines.forEach(function (line) {
      if (line === "") {
        y += info.lineH * 0.55;
        return;
      }
      ctx.fillText(line, x0 + info.pad, y);
      y += info.lineH;
    });
    ctx.restore();
  }

  window.__lwWarzoneBattlePlan = {
    measureHeight,
    draw,
  };
})();
