/**
 * Copy this file to firebase-config.js (same folder as the HTML files).
 * Paste values from Firebase Console → Project settings → Your apps → Web app
 * (the firebaseConfig object). firebase-config.js is gitignored — do not commit
 * real keys to public repositories.
 *
 * GitHub Actions (`.github/workflows/deploy-pages.yml`): set repository secrets
 * `FIREBASE_CONFIG_JSON` (the firebaseConfig object as JSON) and, if App Check
 * enforcement is on for Firestore/RTDB, `FIREBASE_APPCHECK_SITE_KEY` (only the
 * short reCAPTCHA Enterprise site key string, e.g. 6L… — never paste the same JSON
 * as `FIREBASE_CONFIG_JSON`). Optional: `FIREBASE_APPCHECK_DEBUG_TOKEN`
 * for local/testing (`?apcDebug=1` flow).
 *
 * Pages load firebase-config.example.js first, then apply firebase-config.js
 * if present (same folder). On http(s) the override is fetched; on file://
 * (opening HTML from disk) a script tag is used because fetch() is unreliable.
 *
 * Used by Firebase-backed pages such as transfer-tracker.html and the optional
 * account.html cross-device sync (see firestore.rules.example).
 *
 * Local development (OAuth / sign-in):
 * If the console says the domain is not authorized for OAuth, open Firebase Console
 * → Authentication → Settings → Authorized domains (not "Redirect URIs" in Google
 * Cloud) and add each host you use, for example:
 *   - localhost
 *   - 127.0.0.1
 * (Include the port you use if you serve from http://127.0.0.1:8080/ — the host
 * is still 127.0.0.1.)
 *
 * Firestore realtime (Listen) HTTP 400 in the Network tab:
 * Often fixed by this repo’s firestore-db.js (long polling). Also check Firebase Console
 * → App Check: if Firestore enforcement is on, register this web app or use a debug token
 * for localhost. Google Cloud → APIs & Services → Credentials: if the browser API key is
 * restricted, allow “Firestore API” and the correct HTTP referrers (or unrestricted for dev).
 *
 * Realtime Database rules (live link): Rare Soil uses path `rare-soil-war/{shareId}`.
 * That is **Realtime Database**, not Firestore — set rules in Firebase Console → Realtime
 * Database → Rules (see `database.rules.json.example` in this repo). Firestore rules do
 * not apply to RTDB.
 *
 * Realtime Database + App Check (rare-soil-war-tracker live link):
 * Console warning “Missing appcheck token” means RTDB expects an App Check token. Fix one of:
 *   • Firebase Console → Build → App Check → **Realtime Database** (not only Firestore) →
 *     set enforcement to **Off** or **Monitor** — simplest for a public static site; or
 *   • Register this web app under App Check with a **reCAPTCHA Enterprise** key, set
 *     `__FIREBASE_APPCHECK_SITE_KEY__` below, deploy real `firebase-config.js` (full
 *     `firebaseConfig`, not placeholders). Rare Soil merges that with `?db=` for RTDB.
 * Local dev: add `?apcDebug=1` to the page URL *once*, copy the debug token from the browser
 * console into App Check → Manage debug tokens, or set `__FIREBASE_APPCHECK_DEBUG_TOKEN__` in
 * `firebase-config.js` (see below).
 */
window.__FIREBASE_CONFIG__ = {
  apiKey: "YOUR_WEB_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  /** Realtime Database URL — required for Rare Soil live link RTDB sync (path rare-soil-war/). */
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX",
};

/** Google reCAPTCHA v2 site key (Sign up on account.html). Create at https://www.google.com/recaptcha/admin */
window.__RECAPTCHA_SITE_KEY__ = "";

/**
 * reCAPTCHA *Enterprise* site key for Firebase App Check (web). Required in firebase-config.js
 * when App Check **enforcement** is on for **Firestore** and/or **Realtime Database** (otherwise
 * you see permission-denied / HTTP 400 / “Missing appcheck token”). Register in Firebase Console
 * → App Check → your web app → reCAPTCHA Enterprise. rare-soil-war-tracker.html activates App Check
 * for both the modular Firestore client and the compat RTDB client when this is non-empty.
 * Leave "" only if enforcement is Off or Monitor for both products.
 */
window.__FIREBASE_APPCHECK_SITE_KEY__ = "";

/**
 * Optional App Check **debug** token (string from Firebase console after using `?apcDebug=1`), or
 * `"true"` / `"1"` to use the interactive debug flow. Only for localhost / testing.
 */
window.__FIREBASE_APPCHECK_DEBUG_TOKEN__ = "";
