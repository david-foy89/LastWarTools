"use strict";

const crypto = require("crypto");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

const anthropicApiKey = defineSecret("ANTHROPIC_API_KEY");

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const RATE_WINDOW_MS = 60 * 60 * 1000;
const ANON_HOURLY_LIMIT = 30;
const AUTH_HOURLY_LIMIT = 150;
const MAX_IMAGE_BASE64_LEN = 7_500_000;

const ALLOWED_ORIGINS = new Set([
  "https://lastwarsurvivaltools.com",
  "https://www.lastwarsurvivaltools.com",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
]);

function ensureAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
}

function originAllowed(origin) {
  const o = String(origin || "").trim();
  if (!o) return false;
  if (ALLOWED_ORIGINS.has(o)) return true;
  if (/^https:\/\/[a-z0-9-]+\.github\.io$/i.test(o)) return true;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return true;
  return false;
}

function setCors(req, res) {
  const origin = String(req.get("origin") || "").trim();
  if (originAllowed(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Max-Age", "86400");
}

function rateLimitDocId(prefix, value) {
  const hash = crypto.createHash("sha256").update(String(value)).digest("hex");
  return `${prefix}_${hash.slice(0, 40)}`;
}

class RateLimitError extends Error {
  constructor(retryAfterSec) {
    super("Rate limit exceeded. Try again later.");
    this.name = "RateLimitError";
    this.retryAfterSec = retryAfterSec;
  }
}

async function checkRateLimit(key, limit) {
  ensureAdmin();
  const db = admin.firestore();
  const ref = db.collection("ocrRateLimits").doc(key);
  const now = Date.now();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    let count = 0;
    let windowStart = now;
    if (snap.exists) {
      const data = snap.data() || {};
      count = Number(data.count) || 0;
      windowStart = Number(data.windowStart) || now;
    }
    if (now - windowStart >= RATE_WINDOW_MS) {
      count = 0;
      windowStart = now;
    }
    if (count >= limit) {
      const retryAfterSec = Math.max(
        1,
        Math.ceil((windowStart + RATE_WINDOW_MS - now) / 1000),
      );
      throw new RateLimitError(retryAfterSec);
    }
    tx.set(
      ref,
      {
        count: count + 1,
        windowStart,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
}

function promptForMode(mode, langHint) {
  const hint = langHint
    ? `Player names may use: ${langHint}.`
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

function extractJsonFromResponse(text) {
  const s = String(text || "").trim();
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch (_) {
    /* fall through */
  }
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) {
    try {
      return JSON.parse(fence[1].trim());
    } catch (_) {
      /* fall through */
    }
  }
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(s.slice(start, end + 1));
    } catch (_) {
      /* fall through */
    }
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

async function callClaudeVision(apiKey, model, base64Png, prompt) {
  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: model || DEFAULT_MODEL,
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
      `HTTP ${res.status}`;
    const err = new Error(`Claude OCR request failed: ${msg}`);
    err.status = res.status;
    throw err;
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

async function verifyOptionalIdToken(req) {
  const authHeader = String(req.get("authorization") || "").trim();
  if (!authHeader.toLowerCase().startsWith("bearer ")) return null;
  const token = authHeader.slice(7).trim();
  if (!token) return null;
  ensureAdmin();
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded && decoded.uid ? decoded.uid : null;
  } catch (_) {
    return null;
  }
}

exports.claudeOcr = onRequest(
  {
    region: "us-central1",
    secrets: [anthropicApiKey],
    timeoutSeconds: 120,
    memory: "512MiB",
    maxInstances: 20,
    cors: false,
  },
  async (req, res) => {
    setCors(req, res);
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed." });
      return;
    }

    const origin = String(req.get("origin") || "").trim();
    if (!originAllowed(origin)) {
      res.status(403).json({ error: "Origin not allowed." });
      return;
    }

    const body = req.body || {};
    const mode = body.mode === "versus" ? "versus" : "desert-storm";
    const langHint = String(body.langHint || "").trim();
    const imageBase64 = String(body.imageBase64 || "").trim();
    const model = String(body.model || "").trim() || DEFAULT_MODEL;

    if (!imageBase64) {
      res.status(400).json({ error: "Missing imageBase64." });
      return;
    }
    if (imageBase64.length > MAX_IMAGE_BASE64_LEN) {
      res.status(413).json({ error: "Image too large." });
      return;
    }

    let uid = null;
    try {
      uid = await verifyOptionalIdToken(req);
      const ip =
        String(req.get("x-forwarded-for") || "")
          .split(",")[0]
          .trim() || req.ip || "unknown";
      const limit = uid ? AUTH_HOURLY_LIMIT : ANON_HOURLY_LIMIT;
      const key = rateLimitDocId(uid ? "uid" : "ip", uid || ip);
      await checkRateLimit(key, limit);
    } catch (err) {
      if (err instanceof RateLimitError) {
        res.set("Retry-After", String(err.retryAfterSec));
        res.status(429).json({ error: err.message });
        return;
      }
      console.error("[claudeOcr] rate limit / auth error:", err);
      res.status(500).json({ error: "Could not process request." });
      return;
    }

    const apiKey = anthropicApiKey.value();
    if (!apiKey) {
      res.status(500).json({ error: "OCR service is not configured." });
      return;
    }

    try {
      const prompt = promptForMode(mode, langHint);
      const text = await callClaudeVision(apiKey, model, imageBase64, prompt);
      const parsed = extractJsonFromResponse(text);
      let rows = [];
      if (parsed && Array.isArray(parsed.rows)) {
        rows =
          mode === "versus"
            ? normalizeVersusRows(parsed.rows)
            : normalizeDesertStormRows(parsed.rows);
      }
      res.status(200).json({ text, rows });
    } catch (err) {
      console.error("[claudeOcr] upstream error:", err);
      const status = err && err.status === 401 ? 502 : 502;
      res.status(status).json({
        error:
          (err && err.message) ||
          "OCR failed. Try again with a clearer screenshot.",
      });
    }
  },
);
