/**
 * Username → email lookup for Firebase email/password sign-in.
 * Registry doc ids: encodeURIComponent(trim(displayName)) so any characters are allowed (no "/" in raw path).
 * Legacy docs under lowercase [a-z0-9_]{3,20} still resolve for existing accounts.
 */
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { PROFILE_COLLECTION } from "./account-profile-lib.js";

export const USERNAMES_COLLECTION = "usernames";

const MAX_USERNAME_LENGTH = 100;
/** Firestore document id segment should stay well under 1500 bytes */
const MAX_REGISTRY_DOC_ID_LENGTH = 700;

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

/** Firestore document id for a trimmed display username (any Unicode; "/" allowed in display). */
export function usernameToRegistryDocId(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  return encodeURIComponent(s);
}

/**
 * Legacy registry key for accounts created before unrestricted usernames (3–20 of [a-zA-Z0-9_]).
 * Used only for lookup and for deleting old registry rows when renaming.
 */
export function legacyV1UsernameDocId(raw) {
  const t = String(raw || "").trim();
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(t)) return "";
  return t.toLowerCase();
}

/** @deprecated Prefer usernameToRegistryDocId; kept for any external references */
export function normalizeUsername(raw) {
  return String(raw || "")
    .trim()
    .toLowerCase();
}

function registryDocIdsForDisplayName(displayName) {
  const t = String(displayName || "").trim();
  if (!t) return [];
  const ids = new Set();
  const primary = usernameToRegistryDocId(t);
  if (primary) ids.add(primary);
  const leg = legacyV1UsernameDocId(t);
  if (leg) ids.add(leg);
  return Array.from(ids);
}

export function validateUsername(raw) {
  const s = String(raw || "").trim();
  if (!s.length) {
    return "Enter a username.";
  }
  if (s.length > MAX_USERNAME_LENGTH) {
    return `Username must be at most ${MAX_USERNAME_LENGTH} characters.`;
  }
  const enc = encodeURIComponent(s);
  if (enc.length > MAX_REGISTRY_DOC_ID_LENGTH) {
    return "Username is too long for the database id.";
  }
  return "";
}

/**
 * Returns whether this display username is free (no Firestore doc at primary or legacy key).
 * @returns {Promise<{ available: boolean, normalized: string, message: string, checkSkipped?: boolean, registryDocId?: string }>}
 */
export async function isUsernameAvailable(db, rawUsername) {
  const t = String(rawUsername || "").trim();
  if (!t) {
    return { available: false, normalized: "", message: "Enter a username." };
  }
  const formatErr = validateUsername(t);
  if (formatErr) {
    return { available: false, normalized: t, message: formatErr };
  }
  const primaryId = usernameToRegistryDocId(t);
  const legacyId = legacyV1UsernameDocId(t);

  try {
    const pSnap = await getDoc(doc(db, USERNAMES_COLLECTION, primaryId));
    if (pSnap.exists()) {
      return { available: false, normalized: t, message: "That username is already taken." };
    }
    if (legacyId && legacyId !== primaryId) {
      const lSnap = await getDoc(doc(db, USERNAMES_COLLECTION, legacyId));
      if (lSnap.exists()) {
        return { available: false, normalized: t, message: "That username is already taken." };
      }
    }
    return { available: true, normalized: t, message: "", registryDocId: primaryId };
  } catch (e) {
    if (isPermissionDeniedError(e)) {
      return { available: true, normalized: t, message: "", checkSkipped: true, registryDocId: primaryId };
    }
    throw e;
  }
}

export function looksLikeEmailAddress(raw) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(raw || "").trim());
}

/** Firebase Auth treats emails case-insensitively; normalize so Firestore-stored casing matches sign-in. */
export function normalizeAuthEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

/**
 * Resolves the Firebase Auth email for sign-in: use the value as email if it looks like one,
 * otherwise look up by username in Firestore.
 */
export async function resolveEmailForSignIn(db, rawIdentifier) {
  const trimmed = String(rawIdentifier || "").trim();
  if (!trimmed) {
    throw new Error("Enter your username or email.");
  }
  if (looksLikeEmailAddress(trimmed)) {
    return normalizeAuthEmail(trimmed);
  }
  const { email } = await lookupEmailByUsername(db, trimmed);
  return normalizeAuthEmail(email);
}

/** Clearer copy than raw Firebase strings for sign-in failures. */
export function formatFirebaseAuthSignInError(e) {
  if (!e) return "Sign-in failed.";
  const code = e.code;
  if (
    code === "auth/invalid-credential" ||
    code === "auth/invalid-login-credentials" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return "Wrong password, or no account for that email. Use the exact email you registered with (or your username), check Caps Lock, and try again.";
  }
  if (code === "auth/too-many-requests") {
    return "Too many attempts. Wait a few minutes, then try again.";
  }
  if (code === "auth/user-disabled") {
    return "This account has been disabled.";
  }
  const msg = typeof e.message === "string" ? e.message : "";
  return msg || "Sign-in failed.";
}

export async function lookupEmailByUsername(db, rawUsername) {
  const t = String(rawUsername || "").trim();
  if (!t) {
    throw new Error("Enter your username.");
  }

  const primaryId = usernameToRegistryDocId(t);
  let snap = await getDoc(doc(db, USERNAMES_COLLECTION, primaryId));
  if (!snap.exists()) {
    const legacyId = legacyV1UsernameDocId(t);
    if (legacyId && legacyId !== primaryId) {
      snap = await getDoc(doc(db, USERNAMES_COLLECTION, legacyId));
    }
  }

  if (!snap.exists()) {
    throw new Error(
      "No account found for that username. Try signing in with the email you used to register, or check spelling.",
    );
  }
  const data = snap.data();
  const email = data && typeof data.email === "string" ? data.email : "";
  if (!email) {
    throw new Error("Account data is incomplete.");
  }
  return { email, normalizedUsername: t };
}

/**
 * Reserve username + set profile username after Firebase Auth user is created.
 * Rolls back nothing here — caller must deleteUser on failure.
 * @param {string} displayUsername trimmed display string (any characters; stored in profile as-is)
 */
export async function claimUsernameForNewUser(db, user, displayUsername, email) {
  const trimmed = String(displayUsername || "").trim();
  const docId = usernameToRegistryDocId(trimmed);
  const uref = doc(db, USERNAMES_COLLECTION, docId);
  const pref = doc(db, PROFILE_COLLECTION, user.uid);
  const em = normalizeAuthEmail(email);

  await runTransaction(db, async (transaction) => {
    const uSnap = await transaction.get(uref);
    if (uSnap.exists()) {
      const existingUid = uSnap.data() && uSnap.data().uid;
      if (existingUid === user.uid) {
        transaction.set(
          pref,
          {
            username: trimmed,
            updatedAt: serverTimestamp(),
            client: "last-war-tools-account",
          },
          { merge: true },
        );
        return;
      }
      throw new Error("That username is already taken. Choose another.");
    }
    const legacyId = legacyV1UsernameDocId(trimmed);
    if (legacyId && legacyId !== docId) {
      const legRef = doc(db, USERNAMES_COLLECTION, legacyId);
      const legSnap = await transaction.get(legRef);
      if (legSnap.exists()) {
        throw new Error("That username is already taken. Choose another.");
      }
    }

    transaction.set(uref, {
      uid: user.uid,
      email: em,
      createdAt: serverTimestamp(),
    });
    transaction.set(
      pref,
      {
        username: trimmed,
        updatedAt: serverTimestamp(),
        client: "last-war-tools-account",
      },
      { merge: true },
    );
  });
}

/**
 * Change display username: remove old registry doc(s) for this uid and create the new mapping.
 * Verifies profile.username matches oldDisplay before applying.
 */
export async function changeUsernameForUser(db, user, oldDisplay, newDisplay, email) {
  const oldT = String(oldDisplay ?? "").trim();
  const newT = String(newDisplay ?? "").trim();
  const err = validateUsername(newT);
  if (err) {
    throw new Error(err);
  }
  if (oldT === newT) {
    return;
  }

  const avail = await isUsernameAvailable(db, newT);
  if (!avail.available) {
    throw new Error(avail.message || "That username is already taken.");
  }

  const newId = usernameToRegistryDocId(newT);
  const pref = doc(db, PROFILE_COLLECTION, user.uid);
  const em = normalizeAuthEmail(email);

  await runTransaction(db, async (transaction) => {
    const pSnap = await transaction.get(pref);
    const stored =
      pSnap.exists() && typeof pSnap.data().username === "string"
        ? String(pSnap.data().username).trim()
        : "";
    if (stored !== oldT) {
      throw new Error("Username changed elsewhere. Reload the page and try again.");
    }

    const newRef = doc(db, USERNAMES_COLLECTION, newId);
    const nSnap = await transaction.get(newRef);
    if (nSnap.exists()) {
      throw new Error("That username is already taken.");
    }

    for (const oid of registryDocIdsForDisplayName(oldT)) {
      const oref = doc(db, USERNAMES_COLLECTION, oid);
      const os = await transaction.get(oref);
      if (os.exists() && os.data() && os.data().uid === user.uid) {
        transaction.delete(oref);
      }
    }

    transaction.set(newRef, {
      uid: user.uid,
      email: em,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      pref,
      {
        username: newT,
        updatedAt: serverTimestamp(),
        client: "last-war-tools-account",
      },
      { merge: true },
    );
  });
}
