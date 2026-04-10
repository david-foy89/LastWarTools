/**
 * Copy this file to firebase-config.js (same folder as the HTML files).
 * Paste values from Firebase Console → Project settings → Your apps → Web app
 * (the firebaseConfig object). firebase-config.js is gitignored — do not commit
 * real keys to public repositories.
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
 * If the console shows “Missing appcheck token” for RTDB, Firebase has App Check *enforcement*
 * on for that database. Either:
 *   • Firebase Console → Build → App Check → Realtime Database → set enforcement to *Off* or
 *     *Monitor* (no client token required), or
 *   • Register your web app in App Check with a *reCAPTCHA Enterprise* site key, then set
 *     `__FIREBASE_APPCHECK_SITE_KEY__` below and deploy a real `firebase-config.js` with the
 *     full web `firebaseConfig` (apiKey, projectId, appId, …). The Rare Soil page merges that
 *     config with the `?db=` URL so App Check can mint tokens.
 */
window.__FIREBASE_CONFIG__ = {
  apiKey: "YOUR_WEB_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX",
};

/** Google reCAPTCHA v2 site key (Sign up on account.html). Create at https://www.google.com/recaptcha/admin */
window.__RECAPTCHA_SITE_KEY__ = "";

/**
 * reCAPTCHA *Enterprise* site key for Firebase App Check (web). Used by rare-soil-war-tracker
 * when RTDB App Check enforcement is on. Register the app + key in Firebase Console → App Check.
 * Leave "" if you use Monitor/Off for RTDB instead.
 */
window.__FIREBASE_APPCHECK_SITE_KEY__ = "";
