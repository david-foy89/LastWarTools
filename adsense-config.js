/**
 * Central AdSense settings.
 *
 * Auto ads are loaded via the head script (ca-pub-…). In the AdSense dashboard,
 * turn OFF Side rails, Anchor ads, and Vignettes if they keep breaking layouts —
 * keep In-page ads only. This site also relocates auto ads that Google injects
 * into headers/nav into a bottom slot so they cannot cover tools UI.
 *
 * Optional manual banner: create a display unit, paste the slot id, set
 * enableBannerSlot to true.
 */
window.__LW_ADSENSE = {
  client: "ca-pub-1014488780102797",
  /** Set true once you add a real slot id from the AdSense dashboard. */
  enableBannerSlot: false,
  slots: {
    /** Display / responsive banner (e.g. below main content). */
    banner: "",
  },
  /**
   * Move Auto ads out of headers, nav, and tool layouts into #lw-ad-host.
   * Keeps revenue visible without covering calculators.
   */
  containAutoAds: true,
};
