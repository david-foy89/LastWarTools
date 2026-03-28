/**
 * Injected on calculator pages: promo "Create account" / "Sign in" links open this modal
 * instead of navigating to account.html. Signed-in profile chip opens account.html in an
 * overlay iframe (?embed=1). account.html uses its own inline modal.
 */
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfigOk } from "./account-sync-lib.js";
import {
  PROFILE_COLLECTION,
  loadAndApplyUserProfile,
  accountChipInitialDisplay,
} from "./account-profile-lib.js";
import {
  resolveEmailForSignIn,
  claimUsernameForNewUser,
  isUsernameAvailable,
  validateUsername,
  formatFirebaseAuthSignInError,
} from "./account-username-lib.js";

const MODAL_HTML = `
<div id="accountModalBackdrop" class="account-modal-backdrop" hidden role="presentation" aria-hidden="true">
  <div class="account-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="accountModalTitleSignIn" tabindex="-1" id="accountModalDialog">
    <button type="button" class="account-modal__close" id="accountModalCloseBtn" aria-label="Close">×</button>
    <div id="accountModalSignInPanel">
      <h2 id="accountModalTitleSignIn">Sign in</h2>
      <p class="account-muted">Use your <strong>username</strong> or <strong>email</strong> and your password.</p>
      <div class="account-field">
        <label for="accountUsernameSignIn">Username or email</label>
        <input id="accountUsernameSignIn" type="text" autocomplete="username" maxlength="320" spellcheck="false" />
      </div>
      <div class="account-field">
        <label for="accountPasswordSignIn">Password</label>
        <input id="accountPasswordSignIn" type="password" autocomplete="current-password" minlength="6" />
      </div>
      <div class="account-actions">
        <button type="button" class="action-button" id="accountSignInBtn">Sign in</button>
      </div>
      <p class="account-modal-switch">Need an account? <button type="button" id="accountModalSwitchToSignUp">Create one</button></p>
    </div>
    <div id="accountModalSignUpPanel" hidden>
      <h2 id="accountModalTitleSignUp">Create account</h2>
      <p class="account-muted">Choose a unique username (3–20 characters: letters, numbers, underscores). Verify your email before syncing. Complete reCAPTCHA when a site key is configured.</p>
      <div class="account-field">
        <label for="accountUsernameSignUp">Username</label>
        <input id="accountUsernameSignUp" type="text" autocomplete="off" maxlength="20" spellcheck="false" />
        <p id="accountUsernameSignUpHint" class="account-status" style="margin-top:6px;min-height:1.1em" aria-live="polite"></p>
      </div>
      <div class="account-field">
        <label for="accountEmailSignUp">Email (for verification)</label>
        <input id="accountEmailSignUp" type="email" autocomplete="email" maxlength="320" />
      </div>
      <div class="account-field">
        <label for="accountPasswordSignUp">Password</label>
        <input id="accountPasswordSignUp" type="password" autocomplete="new-password" minlength="6" />
      </div>
      <div id="accountRecaptchaMount" class="account-recaptcha-mount"></div>
      <div class="account-actions">
        <button type="button" class="action-button" id="accountSignUpBtn">Create account</button>
      </div>
      <p class="account-modal-switch">Already have an account? <button type="button" id="accountModalSwitchToSignIn">Sign in</button></p>
    </div>
    <div class="account-status" id="accountAuthStatus" style="margin-top:8px"></div>
  </div>
</div>`;

const ACCOUNT_PAGE_POPUP_HTML = `
<div id="accountPagePopupBackdrop" class="account-page-popup-backdrop" hidden role="presentation" aria-hidden="true">
  <div class="account-page-popup-dialog" role="dialog" aria-modal="true" aria-labelledby="accountPagePopupTitle" tabindex="-1" id="accountPagePopupDialog">
    <div class="account-page-popup-header">
      <h2 id="accountPagePopupTitle" class="account-page-popup-title">Account</h2>
      <button type="button" class="account-modal__close" id="accountPagePopupCloseBtn" aria-label="Close">×</button>
    </div>
    <iframe id="accountPagePopupFrame" class="account-page-popup-iframe" title="Account settings"></iframe>
  </div>
</div>`;

function scriptPresent(filename) {
  return Array.from(document.scripts).some(function (s) {
    return (s.src || "").indexOf(filename) !== -1;
  });
}

function loadClassicScript(src) {
  return new Promise(function (resolve) {
    if (scriptPresent(src.split("/").pop())) {
      resolve();
      return;
    }
    var el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.onload = function () {
      resolve();
    };
    el.onerror = function () {
      resolve();
    };
    document.head.appendChild(el);
  });
}

function ensureRecaptchaScript() {
  if (document.querySelector('script[src*="recaptcha/api"]')) return;
  var s = document.createElement("script");
  s.src = "https://www.google.com/recaptcha/api.js";
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

function injectAccountPagePopupIfNeeded() {
  if (document.getElementById("accountPagePopupBackdrop")) return;
  document.body.insertAdjacentHTML("beforeend", ACCOUNT_PAGE_POPUP_HTML);
}

function injectModalIfNeeded() {
  if (!document.getElementById("accountModalBackdrop")) {
    document.body.insertAdjacentHTML("beforeend", MODAL_HTML);
  }
  injectAccountPagePopupIfNeeded();
}

/** Preserve default Create account / Sign in markup so we can restore after sign-out */
const promoActionsOriginalHtml = new WeakMap();

function captureAccountPromoActionsOriginals() {
  document.querySelectorAll(".account-promo-actions").forEach(function (el) {
    if (!promoActionsOriginalHtml.has(el)) {
      promoActionsOriginalHtml.set(el, el.innerHTML);
    }
  });
}

function setPromoStripSignedInState(actionsEls, signedIn) {
  actionsEls.forEach(function (actionsEl) {
    var strip = actionsEl.closest(".account-promo-strip");
    if (!strip) return;
    if (signedIn) {
      if (strip.dataset.lwPromoAriaSaved === undefined) {
        strip.dataset.lwPromoAriaSaved = strip.getAttribute("aria-label") || "";
      }
      strip.classList.add("account-promo-strip--signed-in");
      strip.setAttribute("aria-label", "Account settings");
    } else {
      strip.classList.remove("account-promo-strip--signed-in");
      if (strip.dataset.lwPromoAriaSaved !== undefined) {
        strip.setAttribute("aria-label", strip.dataset.lwPromoAriaSaved);
      }
    }
  });
}

/**
 * Replace the top account promo strip with a right-aligned profile circle (avatar or initial), or restore when signed out.
 */
function refreshAccountPromoBanner(user, db) {
  captureAccountPromoActionsOriginals();
  var wraps = document.querySelectorAll(".account-promo-actions");
  if (!wraps.length) return;

  if (!user || !db) {
    setPromoStripSignedInState(wraps, false);
    wraps.forEach(function (el) {
      var orig = promoActionsOriginalHtml.get(el);
      if (orig != null) el.innerHTML = orig;
    });
    return;
  }

  getDoc(doc(db, PROFILE_COLLECTION, user.uid))
    .then(function (snap) {
      var avatar = "";
      var username = "";
      if (snap.exists()) {
        var d = snap.data();
        avatar = typeof d.avatarDataUrl === "string" ? d.avatarDataUrl : "";
        username = typeof d.username === "string" ? d.username : "";
      }
      var letter = accountChipInitialDisplay(username, user.email);
      wraps.forEach(function (el) {
        el.innerHTML = "";
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "account-nav-chip account-promo-account-chip";
        btn.title = "Account settings";
        btn.setAttribute("aria-label", "Account settings");
        if (avatar) {
          var img = document.createElement("img");
          img.src = avatar;
          img.className = "account-nav-chip__img";
          img.alt = "";
          btn.appendChild(img);
        } else {
          var span = document.createElement("span");
          span.className = "account-nav-chip__initials";
          span.textContent = letter;
          btn.appendChild(span);
        }
        el.appendChild(btn);
      });
      setPromoStripSignedInState(wraps, true);
    })
    .catch(function () {
      var letter = accountChipInitialDisplay("", user.email);
      wraps.forEach(function (el) {
        el.innerHTML = "";
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "account-nav-chip account-promo-account-chip";
        btn.title = "Account settings";
        btn.setAttribute("aria-label", "Account settings");
        var span = document.createElement("span");
        span.className = "account-nav-chip__initials";
        span.textContent = letter;
        btn.appendChild(span);
        el.appendChild(btn);
      });
      setPromoStripSignedInState(wraps, true);
    });
}

function boot() {
  injectModalIfNeeded();
  captureAccountPromoActionsOriginals();

  var accountModalBackdrop = document.getElementById("accountModalBackdrop");
  var accountModalSignInPanel = document.getElementById("accountModalSignInPanel");
  var accountModalSignUpPanel = document.getElementById("accountModalSignUpPanel");
  var accountModalDialog = document.getElementById("accountModalDialog");
  var authStatus = document.getElementById("accountAuthStatus");
  var accountModalPreviousFocus = null;
  var accountPagePopupBackdrop = document.getElementById("accountPagePopupBackdrop");
  var accountPagePopupFrame = document.getElementById("accountPagePopupFrame");
  var accountPagePopupPreviousFocus = null;

  function setAuthStatus(msg, kind) {
    if (!authStatus) return;
    authStatus.textContent = msg || "";
    authStatus.classList.remove("is-error", "is-ok");
    if (kind === "error") authStatus.classList.add("is-error");
    if (kind === "ok") authStatus.classList.add("is-ok");
  }

  function ensureRecaptchaRendered() {
    var key = window.__RECAPTCHA_SITE_KEY__ || "";
    var el = document.getElementById("accountRecaptchaMount");
    if (!key || !el) return;
    if (typeof window.__accountRecaptchaWidgetId === "number") return;
    if (typeof grecaptcha === "undefined" || !grecaptcha.render) {
      window.setTimeout(ensureRecaptchaRendered, 120);
      return;
    }
    window.__accountRecaptchaWidgetId = grecaptcha.render(el, { sitekey: key });
  }

  function closeAccountModal() {
    if (!accountModalBackdrop || accountModalBackdrop.hasAttribute("hidden")) return;
    accountModalBackdrop.setAttribute("hidden", "");
    accountModalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (accountModalPreviousFocus && typeof accountModalPreviousFocus.focus === "function") {
      try {
        accountModalPreviousFocus.focus();
      } catch (_) {
        /* ignore */
      }
    }
    accountModalPreviousFocus = null;
  }

  function openAccountModal(mode) {
    if (!accountModalBackdrop || !accountModalSignInPanel || !accountModalSignUpPanel || !accountModalDialog) return;
    accountModalPreviousFocus = document.activeElement;
    accountModalBackdrop.removeAttribute("hidden");
    accountModalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    ensureRecaptchaScript();
    if (mode === "signUp") {
      accountModalSignInPanel.hidden = true;
      accountModalSignUpPanel.hidden = false;
      accountModalDialog.setAttribute("aria-labelledby", "accountModalTitleSignUp");
      ensureRecaptchaRendered();
      window.setTimeout(function () {
        document.getElementById("accountUsernameSignUp")?.focus();
      }, 0);
    } else {
      accountModalSignInPanel.hidden = false;
      accountModalSignUpPanel.hidden = true;
      accountModalDialog.setAttribute("aria-labelledby", "accountModalTitleSignIn");
      window.setTimeout(function () {
        document.getElementById("accountUsernameSignIn")?.focus();
      }, 0);
    }
    setAuthStatus("");
  }

  function closeAccountPagePopup() {
    if (!accountPagePopupBackdrop || accountPagePopupBackdrop.hasAttribute("hidden")) return;
    accountPagePopupBackdrop.setAttribute("hidden", "");
    accountPagePopupBackdrop.setAttribute("aria-hidden", "true");
    if (accountPagePopupFrame) accountPagePopupFrame.src = "about:blank";
    document.body.style.overflow = "";
    if (accountPagePopupPreviousFocus && typeof accountPagePopupPreviousFocus.focus === "function") {
      try {
        accountPagePopupPreviousFocus.focus();
      } catch (_) {
        /* ignore */
      }
    }
    accountPagePopupPreviousFocus = null;
  }

  function openAccountPagePopup() {
    injectModalIfNeeded();
    var backdrop = document.getElementById("accountPagePopupBackdrop");
    var frame = document.getElementById("accountPagePopupFrame");
    if (!backdrop || !frame) return;
    accountPagePopupPreviousFocus = document.activeElement;
    frame.src = "account.html?embed=1";
    backdrop.removeAttribute("hidden");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(function () {
      document.getElementById("accountPagePopupCloseBtn")?.focus();
    }, 0);
  }

  window.__lwOpenAccountPagePopup = openAccountPagePopup;

  window.addEventListener("message", function (ev) {
    if (ev.origin !== window.location.origin) return;
    if (!ev.data || ev.data.type !== "lw-close-account-embed") return;
    closeAccountPagePopup();
  });

  window.__lwOpenAccountAuthModal = function (mode) {
    injectModalIfNeeded();
    openAccountModal(mode);
  };
  if (window.__lwPendingAccountAuthModalMode) {
    window.__lwOpenAccountAuthModal(window.__lwPendingAccountAuthModalMode);
    window.__lwPendingAccountAuthModalMode = null;
  }

  document.getElementById("accountModalCloseBtn")?.addEventListener("click", closeAccountModal);
  accountModalBackdrop?.addEventListener("click", function (ev) {
    if (ev.target === accountModalBackdrop) closeAccountModal();
  });
  document.getElementById("accountPagePopupCloseBtn")?.addEventListener("click", closeAccountPagePopup);
  accountPagePopupBackdrop?.addEventListener("click", function (ev) {
    if (ev.target === accountPagePopupBackdrop) closeAccountPagePopup();
  });
  document.addEventListener("click", function (ev) {
    if (!ev.target.closest(".account-promo-account-chip")) return;
    ev.preventDefault();
    openAccountPagePopup();
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    var pageBd = document.getElementById("accountPagePopupBackdrop");
    if (pageBd && !pageBd.hasAttribute("hidden")) {
      closeAccountPagePopup();
      return;
    }
    if (accountModalBackdrop && !accountModalBackdrop.hasAttribute("hidden")) {
      closeAccountModal();
    }
  });

  /* account.html registers these on the same elements; skip to avoid double openAccountModal per click */
  var accountPage =
    (location.pathname.split("/").pop() || "").toLowerCase() === "account.html";
  if (!accountPage) {
    document.getElementById("accountModalSwitchToSignUp")?.addEventListener("click", function () {
      openAccountModal("signUp");
    });
    document.getElementById("accountModalSwitchToSignIn")?.addEventListener("click", function () {
      openAccountModal("signIn");
    });
  }

  Promise.resolve()
    .then(function () {
      return loadClassicScript("firebase-config.example.js");
    })
    .then(function () {
      return loadClassicScript("firebase-config.js");
    })
    .then(function () {
      var cfg = window.__FIREBASE_CONFIG__;
      let auth = null;
      let db = null;
      if (firebaseConfigOk(cfg)) {
        try {
          var app = getApps().length ? getApp() : initializeApp(cfg);
          auth = getAuth(app);
          db = getFirestore(app);
        } catch (e) {
          console.warn("[Last War Tools] account-auth-modal:", e);
        }
      }

      var accountModalSignUpInProgress = false;
      if (auth) {
        onAuthStateChanged(auth, function (user) {
          if (user && !accountModalSignUpInProgress) closeAccountModal();
          /* Always sync banner to auth (cross-tab sign-in/out). Sign-up flag only gates closing the modal here. */
          if (db) {
            refreshAccountPromoBanner(user || null, db);
          }
        });
      }

      document.getElementById("accountSignInBtn")?.addEventListener("click", async function () {
        if (!auth || !db) {
          setAuthStatus("Firebase is not configured.", "error");
          return;
        }
        var rawU = String(document.getElementById("accountUsernameSignIn")?.value || "").trim();
        var password = String(document.getElementById("accountPasswordSignIn")?.value || "");
        if (!rawU || !password) {
          setAuthStatus("Enter username and password.", "error");
          return;
        }
        setAuthStatus("Signing in…");
        try {
          var email = await resolveEmailForSignIn(db, rawU);
          await signInWithEmailAndPassword(auth, email, password);
          setAuthStatus("Signed in.", "ok");
        } catch (e) {
          setAuthStatus(formatFirebaseAuthSignInError(e), "error");
        }
      });

      document.getElementById("accountSignUpBtn")?.addEventListener("click", async function () {
        if (!auth || !db) {
          setAuthStatus("Firebase is not configured.", "error");
          return;
        }
        var rawU = String(document.getElementById("accountUsernameSignUp")?.value || "").trim();
        var email = String(document.getElementById("accountEmailSignUp")?.value || "").trim();
        var password = String(document.getElementById("accountPasswordSignUp")?.value || "");
        var msg = validateUsername(rawU);
        if (msg) {
          setAuthStatus(msg, "error");
          return;
        }
        if (!email || !password) {
          setAuthStatus("Enter email and password.", "error");
          return;
        }
        if (password.length < 6) {
          setAuthStatus("Password must be at least 6 characters.", "error");
          return;
        }
        var recaptchaKey = window.__RECAPTCHA_SITE_KEY__ || "";
        if (recaptchaKey) {
          if (typeof grecaptcha === "undefined") {
            setAuthStatus("reCAPTCHA is still loading. Wait a moment and try again.", "error");
            return;
          }
          var wid = window.__accountRecaptchaWidgetId;
          var token = typeof wid === "number" ? grecaptcha.getResponse(wid) : grecaptcha.getResponse();
          if (!token) {
            setAuthStatus("Complete the reCAPTCHA.", "error");
            return;
          }
        }
        setAuthStatus("Creating account…");
        try {
          var avail = await isUsernameAvailable(db, rawU);
          if (!avail.available) {
            setAuthStatus(avail.message || "That username is already taken.", "error");
            return;
          }
          accountModalSignUpInProgress = true;
          try {
            var cred = await createUserWithEmailAndPassword(auth, email, password);
            try {
              await claimUsernameForNewUser(db, cred.user, avail.normalized, email);
            } catch (err) {
              await deleteUser(cred.user);
              throw err;
            }
            await sendEmailVerification(cred.user);
            if (recaptchaKey && typeof grecaptcha !== "undefined" && typeof window.__accountRecaptchaWidgetId === "number") {
              grecaptcha.reset(window.__accountRecaptchaWidgetId);
            }
            var profAfterSignUp = await loadAndApplyUserProfile(cred.user, db);
            if (typeof window.__lwFillAccountProfileForm === "function") {
              window.__lwFillAccountProfileForm(profAfterSignUp);
            }
            setAuthStatus("Account created. Check your email to verify before syncing.", "ok");
            refreshAccountPromoBanner(cred.user, db);
            closeAccountModal();
          } finally {
            accountModalSignUpInProgress = false;
          }
        } catch (e) {
          setAuthStatus(e && e.message ? e.message : "Sign-up failed.", "error");
        }
      });

      var signUpUsernameInput = document.getElementById("accountUsernameSignUp");
      var signUpUsernameHint = document.getElementById("accountUsernameSignUpHint");
      signUpUsernameInput?.addEventListener("blur", async function () {
        if (!db || !signUpUsernameHint) return;
        var raw = String(signUpUsernameInput.value || "").trim();
        if (!raw) {
          signUpUsernameHint.textContent = "";
          signUpUsernameHint.classList.remove("is-error", "is-ok");
          return;
        }
        signUpUsernameHint.textContent = "Checking…";
        signUpUsernameHint.classList.remove("is-error", "is-ok");
        try {
          var r = await isUsernameAvailable(db, raw);
          if (!r.available) {
            signUpUsernameHint.textContent = r.message || "That username is already taken.";
            signUpUsernameHint.classList.add("is-error");
          } else if (r.checkSkipped) {
            signUpUsernameHint.textContent =
              "Could not check availability (Firestore rules). Sign-up will still reject a taken name.";
            signUpUsernameHint.classList.remove("is-error", "is-ok");
          } else {
            signUpUsernameHint.textContent = "Username is available.";
            signUpUsernameHint.classList.add("is-ok");
          }
        } catch (_) {
          signUpUsernameHint.textContent = "";
          signUpUsernameHint.classList.remove("is-error", "is-ok");
        }
      });
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
