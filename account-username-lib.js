/**
 * Username → email lookup for Firebase email/password sign-in.
 * Usernames are stored lowercase in Firestore: usernames/{username}
 */
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { PROFILE_COLLECTION } from "./account-profile-lib.js";

export const USERNAMES_COLLECTION = "usernames";

function isPermissionDeniedError(e) {
  return (
    e &&
    (e.code === "permission-denied" ||
      (typeof e.message === "string" && e.message.includes("permission")))
  );
}

/** User-facing message when Firestore rules block account writes */
export function formatFirestoreAccountError(e) {
  if (!e) return "Something went wrong.";
  const msg = typeof e.message === "string" ? e.message : "";
  if (e.code === "permission-denied" || msg.includes("permission")) {
    return "Firestore blocked this request. In Firebase Console → Firestore → Rules, deploy the usernames and userProfiles rules from firestore.rules.example (merge with your existing rules).";
  }
  return msg || "Something went wrong.";
}

export function normalizeUsername(raw) {
  return String(raw || "")
    .trim()
    .toLowerCase();
}

export function validateUsername(raw) {
  const s = String(raw || "").trim();
  if (s.length < 3 || s.length > 20) {
    return "Username must be 3–20 characters.";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(s)) {
    return "Use only letters, numbers, and underscores.";
  }
  return "";
}

/**
 * Returns whether a normalized username is free (no Firestore doc yet).
 * @returns {Promise<{ available: boolean, normalized: string, message: string, checkSkipped?: boolean }>}
 */
export async function isUsernameAvailable(db, rawUsername) {
  const norm = normalizeUsername(rawUsername);
  if (!norm) {
    return { available: false, normalized: "", message: "Enter a username." };
  }
  const formatErr = validateUsername(rawUsername);
  if (formatErr) {
    return { available: false, normalized: norm, message: formatErr };
  }
  try {
    const snap = await getDoc(doc(db, USERNAMES_COLLECTION, norm));
    if (snap.exists()) {
      return { available: false, normalized: norm, message: "That username is already taken." };
    }
    return { available: true, normalized: norm, message: "" };
  } catch (e) {
    if (isPermissionDeniedError(e)) {
      // Pre-sign-up read is unauthenticated; rules must allow read on usernames/{name}, or we skip
      // the client check and rely on claimUsernameForNewUser (after auth) to enforce uniqueness.
      return { available: true, normalized: norm, message: "", checkSkipped: true };
    }
    throw e;
  }
}

export async function lookupEmailByUsername(db, rawUsername) {
  const norm = normalizeUsername(rawUsername);
  if (!norm) {
    throw new Error("Enter your username.");
  }
  const snap = await getDoc(doc(db, USERNAMES_COLLECTION, norm));
  if (!snap.exists()) {
    throw new Error("No account found for that username.");
  }
  const data = snap.data();
  const email = data && typeof data.email === "string" ? data.email : "";
  if (!email) {
    throw new Error("Account data is incomplete.");
  }
  return { email, normalizedUsername: norm };
}

/**
 * Reserve username + set profile username after Firebase Auth user is created.
 * Rolls back nothing here — caller must deleteUser on failure.
 */
export async function claimUsernameForNewUser(db, user, normalizedUsername, email) {
  const norm = normalizeUsername(normalizedUsername);
  const uref = doc(db, USERNAMES_COLLECTION, norm);
  const pref = doc(db, PROFILE_COLLECTION, user.uid);

  await runTransaction(db, async (transaction) => {
    const uSnap = await transaction.get(uref);
    if (uSnap.exists()) {
      const existingUid = uSnap.data() && uSnap.data().uid;
      if (existingUid === user.uid) {
        transaction.set(
          pref,
          {
            username: norm,
            updatedAt: serverTimestamp(),
            client: "last-war-tools-account",
          },
          { merge: true },
        );
        return;
      }
      throw new Error("That username is already taken. Choose another.");
    }
    transaction.set(uref, {
      uid: user.uid,
      email: email,
      createdAt: serverTimestamp(),
    });
    transaction.set(
      pref,
      {
        username: norm,
        updatedAt: serverTimestamp(),
        client: "last-war-tools-account",
      },
      { merge: true },
    );
  });
}
