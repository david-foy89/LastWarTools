/**
 * Legacy: profile chip in `.page-nav` (not used by default; site uses account-auth-modal.js
 * to show the chip in the top `.account-promo-strip` instead).
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getSharedFirestore } from "./firestore-db.js";
import { firebaseConfigOk } from "./account-sync-lib.js";
import { PROFILE_COLLECTION, accountChipInitialDisplay } from "./account-profile-lib.js";

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
    const db = getSharedFirestore(app);

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
      a.addEventListener("click", function (e) {
        if (typeof window.__lwOpenAccountPagePopup === "function") {
          e.preventDefault();
          window.__lwOpenAccountPagePopup();
        }
      });

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
            span.textContent = accountChipInitialDisplay(username, user.email);
            a.appendChild(span);
          }
        })
        .catch(function () {
          placeholder.textContent = accountChipInitialDisplay("", user.email);
        });
    });
  } catch (e) {
    console.warn("[Last War Tools] Account nav chip:", e);
  }
}

attachAccountNavChip(0);
