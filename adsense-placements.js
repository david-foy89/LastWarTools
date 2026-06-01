/**
 * Optional manual AdSense display unit (when slot id is set in adsense-config.js).
 * Auto ads still use the async script in <head> when enabled in AdSense dashboard.
 */
(function () {
  "use strict";

  function run() {
    const cfg = window.__LW_ADSENSE || {};
    const client = String(cfg.client || "ca-pub-1014488780102797").trim();
    const slot = String((cfg.slots && cfg.slots.banner) || "").trim();
    if (!cfg.enableBannerSlot || !slot) return;
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

    const legal = document.querySelector(".site-legal-bar");
    const support = document.querySelector(".support-bar");
    const anchor = legal || support;
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(wrap, anchor);
    } else {
      document.body.appendChild(wrap);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("[AdSense] placement push failed:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
