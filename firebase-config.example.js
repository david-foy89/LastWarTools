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
