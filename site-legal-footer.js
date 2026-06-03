/**
 * Site footer: Privacy, Home, Contact, Buy Me a Coffee. Optional cookie popup.
 */
(function () {
  "use strict";

  const CONSENT_KEY = "lastWarSiteConsentV1";
  const PRIVACY_HREF = "/privacy-policy.html";
  const CONTACT_EMAIL = "support@lastwarsurvivaltools.com";
  const BUY_ME_COFFEE_URL = "https://buymeacoffee.com/dkfoy56w";

  function privacyUrl() {
    try {
      if (location.protocol === "file:") return "privacy-policy.html";
      return PRIVACY_HREF;
    } catch {
      return "privacy-policy.html";
    }
  }

  function ensureNavLink(nav, href, text, className, options) {
    options = options || {};
    const normalizedHref = String(href || "").trim();
    const existing = Array.from(nav.querySelectorAll("a")).find(
      (a) =>
        a.textContent.trim() === text ||
        String(a.getAttribute("href") || "").trim() === normalizedHref,
    );
    const link = existing || document.createElement("a");
    if (!existing) {
      link.href = normalizedHref;
      link.className = className;
      link.textContent = text;
      nav.appendChild(link);
    }
    if (options.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
    return link;
  }

  function stripLegacyFooterCopy(footer) {
    footer.querySelectorAll(".site-legal-bar__note").forEach((el) => el.remove());
    footer.querySelectorAll("p").forEach((el) => {
      if (/cookies and similar technologies/i.test(el.textContent || "")) {
        el.remove();
      }
    });
  }

  function ensureFooterNav(footer) {
    let nav = footer.querySelector("nav");
    if (!nav) {
      nav = document.createElement("nav");
      nav.setAttribute("aria-label", "Site footer");
      footer.appendChild(nav);
    }

    const homeLink = ensureNavLink(
      nav,
      location.protocol === "file:" ? "index.html" : "/index.html",
      "Home",
      "page-link",
    );
    const privacyLink = ensureNavLink(
      nav,
      privacyUrl(),
      "Privacy Policy",
      "page-link",
    );
    const contactLink = ensureNavLink(
      nav,
      `mailto:${CONTACT_EMAIL}`,
      "Contact us",
      "page-link",
    );

    const supportBar = document.querySelector(".support-bar");
    const coffeeHref =
      supportBar && supportBar.querySelector(".support-link")
        ? supportBar.querySelector(".support-link").href
        : BUY_ME_COFFEE_URL;

    const coffeeLink = ensureNavLink(
      nav,
      coffeeHref,
      "Buy Me a Coffee",
      "page-link page-link--support",
      { external: true },
    );

    nav.append(homeLink, privacyLink, contactLink, coffeeLink);

    if (supportBar) supportBar.remove();

    stripLegacyFooterCopy(footer);
    return nav;
  }

  function injectLegalBar() {
    let footer = document.querySelector(".site-legal-bar");
    if (!footer) {
      footer = document.createElement("footer");
      footer.className = "site-legal-bar";
      footer.setAttribute("role", "contentinfo");

      const support = document.querySelector(".support-bar");
      if (support && support.parentNode) {
        support.parentNode.insertBefore(footer, support);
      } else {
        document.body.appendChild(footer);
      }
    }

    ensureFooterNav(footer);
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
    accept.className = "action-button lw-cookie-notice__accept";
    accept.textContent = "OK";
    accept.addEventListener("click", function () {
      try {
        localStorage.setItem(CONSENT_KEY, "1");
      } catch {
        /* ignore */
      }
      box.remove();
    });

    const policy = document.createElement("a");
    policy.href = privacyUrl();
    policy.className = "action-button action-button--quiet";
    policy.textContent = "Privacy Policy";

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
