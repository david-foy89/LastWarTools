/**
 * Top-nav circle: profile photo or username initials → account.html (signed-in only).
 * Loaded from page-nav-dropdown.js after firebase-config scripts.
 *
 * Waits for .account-nav-chip-wrap (injected on DOMContentLoaded) so we never miss
 * registration when this module runs before the wrap exists.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfigOk } from "./account-sync-lib.js";
import { PROFILE_COLLECTION } from "./account-profile-lib.js";

function initialsFromUsername(u) {
  if (!u) return "?";
  const s = String(u).replace(/_/g, " ").trim();
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return s.slice(0, 2).toUpperCase();
}

const MAX_WRAP_WAIT_ATTEMPTS = 80;

function attachAccountNavChip(attempt) {
  const n = typeof attempt === "number" ? attempt : 0;
  const cfg = window.__FIREBASE_CONFIG__;
  if (!firebaseConfigOk(cfg)) {
    return;
  }
  const wrap = document.querySelector(".account-nav-chip-wrap");
  if (!wrap) {
    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          attachAccountNavChip(0);
        },
        { once: true },
      );
      return;
    }
    if (n < MAX_WRAP_WAIT_ATTEMPTS) {
      window.setTimeout(function () {
        attachAccountNavChip(n + 1);
      }, 50);
    }
    return;
  }
  if (wrap.dataset.lwNavChipAttached) {
    return;
  }
  wrap.dataset.lwNavChipAttached = "1";

  try {
    const app = getApps().length ? getApp() : initializeApp(cfg);
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, function (user) {
      wrap.innerHTML = "";
      if (!user) {
        wrap.style.display = "none";
        return;
      }
      wrap.style.display = "";

      const a = document.createElement("a");
      a.href = "account.html";
      a.className = "account-nav-chip";
      a.title = "Account settings";
      a.setAttribute("aria-label", "Account settings");

      const placeholder = document.createElement("span");
      placeholder.className = "account-nav-chip__initials";
      placeholder.textContent = "…";
      a.appendChild(placeholder);
      wrap.appendChild(a);

      getDoc(doc(db, PROFILE_COLLECTION, user.uid))
        .then(function (snap) {
          let avatar = "";
          let username = "";
          if (snap.exists()) {
            const d = snap.data();
            avatar = typeof d.avatarDataUrl === "string" ? d.avatarDataUrl : "";
            username = typeof d.username === "string" ? d.username : "";
          }
          a.innerHTML = "";
          if (avatar) {
            const img = document.createElement("img");
            img.src = avatar;
            img.className = "account-nav-chip__img";
            img.alt = "";
            a.appendChild(img);
          } else {
            const span = document.createElement("span");
            span.className = "account-nav-chip__initials";
            span.textContent = initialsFromUsername(username || user.email || "?");
            a.appendChild(span);
          }
        })
        .catch(function () {
          placeholder.textContent = initialsFromUsername(user.email || "?");
        });
    });
  } catch (e) {
    console.warn("[Last War Tools] Account nav chip:", e);
  }
}

attachAccountNavChip(0);
