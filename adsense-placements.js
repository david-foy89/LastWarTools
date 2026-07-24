/**
 * AdSense placements:
 * - Optional manual banner unit (adsense-config.js)
 * - Relocate Auto ads that land inside protected UI (header/nav/tools)
 *   into a bottom host so they fit the page instead of breaking layout
 */
(function () {
  "use strict";

  const PROTECTED_SELECTORS = [
    ".page-top-stack",
    ".page-top-controls",
    ".account-promo-strip",
    ".page-nav",
    ".hero",
    ".conductor-layout",
    ".schedule-header",
    ".logo-control",
    ".language-control",
    ".account-promo-actions",
  ].join(",");

  function cfg() {
    return window.__LW_ADSENSE || {};
  }

  function ensureAdHost() {
    let host = document.getElementById("lw-ad-host");
    if (host) return host;

    host = document.createElement("div");
    host.id = "lw-ad-host";
    host.className = "lw-ad-host";
    host.setAttribute("aria-label", "Advertisement");

    const legal = document.querySelector(".site-legal-bar");
    const support = document.querySelector(".support-bar");
    const page = document.querySelector(".page");
    const anchor = legal || support;
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(host, anchor);
    } else if (page && page.parentNode) {
      page.parentNode.insertBefore(host, page.nextSibling);
    } else {
      document.body.appendChild(host);
    }
    return host;
  }

  function isProtectedContext(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.closest && node.closest("#lw-ad-host, .lw-ad-slot, .lw-ad-host")) {
      return false;
    }
    if (node.closest && node.closest(PROTECTED_SELECTORS)) return true;
    // Auto ads injected as direct body children before main .page push tools down
    if (node.parentElement === document.body) {
      const page = document.querySelector(".page");
      if (page && node.compareDocumentPosition(page) & Node.DOCUMENT_POSITION_FOLLOWING) {
        return true;
      }
    }
    return false;
  }

  function isAutoAdNode(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.id === "lw-ad-host" || node.classList.contains("lw-ad-slot")) return false;
    if (node.classList.contains("google-auto-placed")) return true;
    if (node.matches && node.matches("ins.adsbygoogle")) return true;
    if (
      node.tagName === "IFRAME" &&
      (/google_ads_iframe/i.test(node.id || "") ||
        /googlesyndication|doubleclick/i.test(node.src || ""))
    ) {
      return true;
    }
    return false;
  }

  function shouldRelocate(node) {
    if (!node || node.nodeType !== 1 || !node.parentNode) return false;
    if (node.closest && node.closest("#lw-ad-host, .lw-ad-slot, .lw-ad-host")) return false;
    if (!isAutoAdNode(node)) return false;
    if (isProtectedContext(node)) return true;
    if (node.parentElement === document.body && isBeforePage(node)) return true;
    return false;
  }

  function relocateNode(node) {
    if (!shouldRelocate(node)) return;

    const host = ensureAdHost();
    const wrap = document.createElement("div");
    wrap.className = "lw-ad-host__item";
    node.parentNode.removeChild(node);
    wrap.appendChild(node);
    host.appendChild(wrap);
    host.classList.add("has-ads");
  }

  function sweep(root) {
    if (cfg().containAutoAds === false) return;
    const scope = root && root.querySelectorAll ? root : document;
    const found = scope.querySelectorAll
      ? scope.querySelectorAll(".google-auto-placed, ins.adsbygoogle")
      : [];
    Array.prototype.forEach.call(found, function (el) {
      relocateNode(el);
    });

    Array.prototype.forEach.call(document.body.children, function (child) {
      relocateNode(child);
    });
  }

  function isBeforePage(node) {
    const page = document.querySelector(".page");
    if (!page || !node) return false;
    return !!(node.compareDocumentPosition(page) & Node.DOCUMENT_POSITION_FOLLOWING);
  }

  function watchAutoAds() {
    if (cfg().containAutoAds === false) return;
    ensureAdHost();
    sweep(document);

    const observer = new MutationObserver(function (mutations) {
      let needsSweep = false;
      for (let i = 0; i < mutations.length; i += 1) {
        const m = mutations[i];
        for (let j = 0; j < m.addedNodes.length; j += 1) {
          const node = m.addedNodes[j];
          if (node.nodeType !== 1) continue;
          if (isAutoAdNode(node)) {
            relocateNode(node);
          } else if (node.querySelector && node.querySelector(".google-auto-placed, ins.adsbygoogle")) {
            needsSweep = true;
          }
        }
      }
      if (needsSweep) sweep(document);
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function placeManualBanner() {
    const conf = cfg();
    const client = String(conf.client || "ca-pub-1014488780102797").trim();
    const slot = String((conf.slots && conf.slots.banner) || "").trim();
    if (!conf.enableBannerSlot || !slot) return;
    if (document.querySelector(".lw-ad-slot")) return;

    const wrap = document.createElement("div");
    wrap.className = "lw-ad-slot lw-ad-slot--banner";
    wrap.setAttribute("aria-label", "Advertisement");

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", client);
    ins.setAttribute("data-ad-slot", slot);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    wrap.appendChild(ins);

    const host = ensureAdHost();
    host.appendChild(wrap);
    host.classList.add("has-ads");

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("[AdSense] placement push failed:", err);
    }
  }

  function run() {
    watchAutoAds();
    placeManualBanner();
    // Late-loading Auto ads
    window.setTimeout(function () {
      sweep(document);
    }, 1500);
    window.setTimeout(function () {
      sweep(document);
    }, 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
