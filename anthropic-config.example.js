/**
 * Copy this file to anthropic-config.js (same folder as the HTML files).
 *
 * Production (GitHub Pages / lastwarsurvivaltools.com):
 *   Set ocrProxyUrl to your deployed Firebase Cloud Function URL.
 *   Do NOT put your Anthropic API key here — it belongs in Firebase Functions secrets.
 *
 * GitHub Actions (`.github/workflows/deploy-pages.yml`):
 *   Set repository secret OCR_PROXY_URL to the function URL (not the API key).
 *
 * Local dev (optional direct API — never commit a real key):
 *   Leave ocrProxyUrl empty and set apiKey for testing without deploying functions.
 *
 * Deploy the proxy once:
 *   1. cd functions && npm install
 *   2. firebase functions:secrets:set ANTHROPIC_API_KEY
 *   3. firebase deploy --only functions
 *   4. Copy the claudeOcr URL into anthropic-config.js (ocrProxyUrl) and GitHub secret OCR_PROXY_URL
 *
 * Signed-in users get a higher OCR rate limit (Firebase ID token sent automatically when signed in).
 *
 * UI is hidden from visitors by default. Open a tracker with ?ocr=1 to use Claude for screenshot
 * import instead of Tesseract (persists for the browser tab). Example: verus-tracker.html?ocr=1
 */
window.__ANTHROPIC_CONFIG__ = {
  /** Firebase HTTPS function URL — safe to ship in the browser. */
  ocrProxyUrl: "YOUR_OCR_PROXY_URL",
  /** Local dev only. Leave "" in production. */
  apiKey: "",
  /** Optional — defaults to claude-haiku-4-5-20251001 */
  model: "",
};
