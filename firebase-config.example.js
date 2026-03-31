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
