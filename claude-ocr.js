/**
 * Shared Claude vision OCR for Last War leaderboard screenshots.
 *
 * Production: set ocrProxyUrl in anthropic-config.js (Firebase Cloud Function).
 * Local dev fallback: apiKey in anthropic-config.js (never deploy the key to GitHub Pages).
 */
(function (global) {
  "use strict";

  const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
  const MAX_IMAGE_DIM = 1568;
  const DIRECT_API_URL = "https://api.anthropic.com/v1/messages";

  function getConfig() {
    const cfg = global.__ANTHROPIC_CONFIG__ || {};
    const proxyUrl = String(cfg.ocrProxyUrl || cfg.proxyUrl || "").trim();
    const apiKey = String(cfg.apiKey || "").trim();
    const model = String(cfg.model || "").trim() || DEFAULT_MODEL;

    if (proxyUrl && !/^YOUR_/i.test(proxyUrl)) {
      return { mode: "proxy", proxyUrl, model };
    }
    if (apiKey && !/^YOUR_/i.test(apiKey)) {
      return { mode: "direct", apiKey, model };
    }
    return null;
  }

  function isConfigured() {
    return getConfig() != null;
  }

  function missingKeyMessage() {
    return (
      "Claude OCR is not configured. Set ocrProxyUrl in anthropic-config.js " +
      "(production) or copy anthropic-config.example.js and deploy the Firebase function."
    );
  }

  function langHintFromTesseractValue(value) {
    const v = String(value || "").trim();
    const map = {
      "kor+eng+jpn+chi_sim+chi_tra": "English, Korean, Japanese, and Chinese",
      "kor+eng": "Korean and English",
      eng: "English",
      "kor+jpn+chi_sim+chi_tra": "Korean, Japanese, and Chinese",
      "eng+kor+jpn+chi_sim+chi_tra": "English, Korean, Japanese, and Chinese",
      "eng+spa+fra+deu+por+ita+rus+tur+pol+ukr+vie+tha+ara+hin":
        "multilingual (European, Arabic, Hindi, Thai, Vietnamese, etc.)",
    };
    return (
      map[v] ||
      v
        .replace(/\+/g, ", ")
        .replace(/\bchi_sim\b/g, "Chinese Simplified")
        .replace(/\bchi_tra\b/g, "Chinese Traditional")
    );
  }

  function sourceDimensions(source) {
    const el = source || {};
    const w =
      el.width != null
        ? el.width
        : el.naturalWidth != null
          ? el.naturalWidth
          : el.videoWidth != null
            ? el.videoWidth
            : 0;
    const h =
      el.height != null
        ? el.height
        : el.naturalHeight != null
          ? el.naturalHeight
          : el.videoHeight != null
            ? el.videoHeight
            : 0;
    return { w, h };
  }

  function sourceToCanvas(source) {
    if (source instanceof HTMLCanvasElement) return source;
    const { w, h } = sourceDimensions(source);
    if (!w || !h) {
      throw new Error("Could not read image dimensions for OCR.");
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Could not prepare image for OCR.");
    ctx.drawImage(source, 0, 0, w, h);
    return canvas;
  }

  function canvasToPngBase64(canvas) {
    let c = canvas;
    const w = c.width || 0;
    const h = c.height || 0;
    if (!w || !h) throw new Error("Empty image for OCR.");
    const long = Math.max(w, h);
    if (long > MAX_IMAGE_DIM) {
      const scale = MAX_IMAGE_DIM / long;
      const nw = Math.max(1, Math.round(w * scale));
      const nh = Math.max(1, Math.round(h * scale));
      const scaled = document.createElement("canvas");
      scaled.width = nw;
      scaled.height = nh;
      const ctx = scaled.getContext("2d");
      ctx.drawImage(c, 0, 0, nw, nh);
      c = scaled;
    }
    const dataUrl = c.toDataURL("image/png");
    const parts = dataUrl.split(",");
    if (parts.length < 2 || !parts[1]) {
      throw new Error("Could not encode image for OCR.");
    }
    return parts[1];
  }

  function extractJsonFromResponse(text) {
    const s = String(text || "").trim();
    if (!s) return null;
    try {
      return JSON.parse(s);
    } catch (_) {}
    const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) {
      try {
        return JSON.parse(fence[1].trim());
      } catch (_) {}
    }
    const start = s.indexOf("{");
    const end = s.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(s.slice(start, end + 1));
      } catch (_) {}
    }
    return null;
  }

  function cleanScoreToken(raw) {
    const s = String(raw || "").replace(/[^\d.-]/g, "");
    if (!s || s === "-" || s === ".") return "";
    return s;
  }

  function normalizeVersusRows(rows) {
    const out = [];
    (rows || []).forEach((row) => {
      if (!row || typeof row !== "object") return;
      const name = String(row.name || row.player || "").trim();
      const score = cleanScoreToken(row.score != null ? row.score : row.vs);
      if (!score) return;
      let rank = row.rank;
      if (rank != null && rank !== "") {
        rank = parseInt(String(rank).replace(/\D/g, ""), 10);
        if (!Number.isFinite(rank) || rank < 1) rank = undefined;
      } else {
        rank = undefined;
      }
      out.push({
        name,
        score,
        ...(rank != null ? { rank } : {}),
      });
    });
    return out;
  }

  function normalizeDesertStormRows(rows) {
    const out = [];
    (rows || []).forEach((row) => {
      if (!row || typeof row !== "object") return;
      const name = String(row.name || row.player || "").trim();
      const score = cleanScoreToken(
        row.score != null ? row.score : row.s1 != null ? row.s1 : row.points,
      );
      if (!name || !score) return;
      out.push({
        name,
        s1: score,
        s2: "",
        s3: "",
        s4: "",
        power: "",
        r2b: "",
        assignment: "",
      });
    });
    return out;
  }

  function promptForMode(mode, langHint) {
    const hint = langHint
      ? "Player names may use: " + langHint + "."
      : "Player names may use any script.";
    if (mode === "versus") {
      return (
        "You are reading a Last War: Survival Versus (VS) weekly leaderboard screenshot from a mobile game.\n\n" +
        "Extract every visible player row with rank (if shown), display name, and VS score.\n\n" +
        "Return ONLY valid JSON with no markdown fences:\n" +
        '{"rows":[{"rank":1,"name":"Player Name","score":"1234567"}]}\n\n' +
        "Rules:\n" +
        "- rank: positive integer when visible; omit the field if no rank is shown\n" +
        "- name: exact in-game display name\n" +
        "- score: VS points as a digit string only (no commas or spaces)\n" +
        "- Skip UI chrome, tabs, headers, and button labels\n" +
        "- Include every leaderboard entry you can read\n" +
        hint
      );
    }
    return (
      "You are reading a Last War: Survival Desert Storm (DS) leaderboard screenshot from a mobile game.\n\n" +
      "The UI often shows a player name on one line and their score on the next line.\n\n" +
      "Extract every visible player row.\n\n" +
      "Return ONLY valid JSON with no markdown fences:\n" +
      '{"rows":[{"name":"Player Name","score":"1234567"}]}\n\n' +
      "Rules:\n" +
      "- name: exact in-game display name\n" +
      "- score: numeric score as a digit string only (no commas or spaces)\n" +
      "- Skip UI chrome, tabs, headers, and button labels\n" +
      "- Include every leaderboard entry you can read\n" +
      hint
    );
  }

  async function getOptionalFirebaseIdToken() {
    try {
      const cfg = global.__FIREBASE_CONFIG__;
      if (!cfg || !cfg.apiKey || String(cfg.apiKey).includes("YOUR_")) {
        return null;
      }
      const appMod = await import(
        "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
      );
      const authMod = await import(
        "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"
      );
      const app = appMod.getApps().length
        ? appMod.getApp()
        : appMod.initializeApp(cfg);
      const auth = authMod.getAuth(app);
      const user = auth.currentUser;
      if (!user) return null;
      return await user.getIdToken();
    } catch (_) {
      return null;
    }
  }

  async function callOcrProxy(config, payload) {
    const headers = { "content-type": "application/json" };
    const idToken = await getOptionalFirebaseIdToken();
    if (idToken) {
      headers.authorization = "Bearer " + idToken;
    }

    const res = await fetch(config.proxyUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    let body = null;
    try {
      body = await res.json();
    } catch (_) {
      body = null;
    }

    if (!res.ok) {
      const msg =
        (body && body.error) ||
        (body && body.message) ||
        "HTTP " + res.status;
      if (res.status === 429) {
        throw new Error(
          "OCR rate limit reached. Sign in for a higher limit, or try again later.",
        );
      }
      if (res.status === 403) {
        throw new Error("OCR is not available from this site origin.");
      }
      throw new Error("Claude OCR request failed: " + msg);
    }

    return {
      text: String((body && body.text) || ""),
      rows: Array.isArray(body && body.rows) ? body.rows : [],
    };
  }

  async function callClaudeDirect(config, base64Png, prompt) {
    const res = await fetch(DIRECT_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": config.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: base64Png,
                },
              },
              { type: "text", text: prompt },
            ],
          },
        ],
      }),
    });

    let body = null;
    try {
      body = await res.json();
    } catch (_) {
      body = null;
    }

    if (!res.ok) {
      const msg =
        (body && body.error && body.error.message) ||
        (body && body.message) ||
        "HTTP " + res.status;
      if (res.status === 401) {
        throw new Error("Invalid Anthropic API key. Check anthropic-config.js.");
      }
      throw new Error("Claude OCR request failed: " + msg);
    }

    const blocks = (body && body.content) || [];
    let text = "";
    blocks.forEach((block) => {
      if (block && block.type === "text" && block.text) {
        text += block.text;
      }
    });
    return String(text || "").trim();
  }

  function rowsFromText(mode, text) {
    const parsed = extractJsonFromResponse(text);
    if (!parsed || !Array.isArray(parsed.rows)) return [];
    return mode === "versus"
      ? normalizeVersusRows(parsed.rows)
      : normalizeDesertStormRows(parsed.rows);
  }

  /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement|ImageBitmap} source
   * @param {{ mode?: 'versus'|'desert-storm', langHint?: string }} options
   * @returns {Promise<{ text: string, rows: object[] }>}
   */
  async function recognize(source, options) {
    const config = getConfig();
    if (!config) throw new Error(missingKeyMessage());

    const mode =
      options && options.mode === "versus" ? "versus" : "desert-storm";
    const langHint =
      (options && options.langHint) ||
      langHintFromTesseractValue(options && options.langValue);

    const canvas = sourceToCanvas(source);
    const imageBase64 = canvasToPngBase64(canvas);

    if (config.mode === "proxy") {
      const result = await callOcrProxy(config, {
        mode,
        langHint,
        imageBase64,
        model: config.model,
      });
      let rows = result.rows || [];
      if (!rows.length && result.text) {
        rows = rowsFromText(mode, result.text);
      }
      return { text: result.text || "", rows };
    }

    const prompt = promptForMode(mode, langHint);
    const text = await callClaudeDirect(config, imageBase64, prompt);
    return { text, rows: rowsFromText(mode, text) };
  }

  global.LwstClaudeOcr = {
    getConfig,
    isConfigured,
    missingKeyMessage,
    langHintFromTesseractValue,
    recognize,
  };
})(typeof window !== "undefined" ? window : globalThis);
