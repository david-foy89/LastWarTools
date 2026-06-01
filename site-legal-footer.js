/**
 * Privacy / legal footer + optional cookie notice (AdSense & analytics disclosure).
 */
(function () {
  "use strict";

  const CONSENT_KEY = "lastWarSiteConsentV1";
  const PRIVACY_HREF = "/privacy-policy.html";

  function privacyUrl() {
    try {
      if (location.protocol === "file:") return "privacy-policy.html";
      return PRIVACY_HREF;
    } catch {
      return "privacy-policy.html";
    }
  }

  function injectLegalBar() {
    if (document.querySelector(".site-legal-bar")) return;

    const footer = document.createElement("footer");
    footer.className = "site-legal-bar";
    footer.setAttribute("role", "contentinfo");

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Legal");

    const privacy = document.createElement("a");
    privacy.href = privacyUrl();
    privacy.textContent = "Privacy Policy";
    nav.appendChild(privacy);

    const home = document.createElement("a");
    home.href = location.protocol === "file:" ? "index.html" : "/index.html";
    home.textContent = "Home";
    nav.appendChild(home);

    const note = document.createElement("p");
    note.className = "site-legal-bar__note";
    note.textContent =
      "We use cookies and similar technologies for advertising (Google AdSense), optional sign-in (Firebase), and saving your preferences in the browser.";

    footer.appendChild(nav);
    footer.appendChild(note);

    const support = document.querySelector(".support-bar");
    if (support && support.parentNode) {
      support.parentNode.insertBefore(footer, support);
    } else {
      document.body.appendChild(footer);
    }
  }

  function injectCookieNotice() {
    try {
      if (localStorage.getItem(CONSENT_KEY) === "1") return;
    } catch {
      return;
    }
    if (document.querySelector(".lw-cookie-notice")) return;

    const box = document.createElement("div");
    box.className = "lw-cookie-notice";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Cookie notice");

    const p = document.createElement("p");
    p.textContent =
      "This site uses cookies for ads and to remember settings. See our Privacy Policy for details.";
    box.appendChild(p);

    const actions = document.createElement("div");
    actions.className = "lw-cookie-notice__actions";

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "lw-cookie-notice__accept";
    accept.textContent = "OK";
    accept.addEventListener("click", function () {
      try {
        localStorage.setItem(CONSENT_KEY, "1");
      } catch {
        /* ignore */
      }
      box.classList.add("is-hidden");
      box.remove();
    });

    const policy = document.createElement("a");
    policy.href = privacyUrl();
    policy.textContent = "Privacy Policy";
    policy.style.alignSelf = "center";
    policy.style.marginLeft = "4px";

    actions.appendChild(accept);
    actions.appendChild(policy);
    box.appendChild(actions);
    document.body.appendChild(box);
  }

  function run() {
    injectLegalBar();
    injectCookieNotice();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
