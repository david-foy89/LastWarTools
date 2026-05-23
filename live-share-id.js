/**
 * Stable live-share room id for the whole site (one id per browser).
 * Stored in localStorage; only changes when the user clicks "Change link".
 */
(function () {
  const STORAGE_KEY = "lastWarUserLiveShareIdV1";
  const LEGACY_KEYS = [
    "lastWarSeason1MapLiveShareIdV1",
    "lastWarSeason2MapLiveShareIdV1",
    "lastWarSeason2SuppliesLiveShareIdV1",
    "lastWarSeason3MapLiveShareIdV1",
    "lastWarSeason3DesertArtifactsLiveShareIdV1",
    "lastWarSeason4MapLiveShareIdV1",
    "lastWarSeason5MapLiveShareIdV1",
    "lastWarSeason6MapLiveShareIdV1",
    "rareSoilWarLiveShareIdV1",
    "spiceWarLiveShareIdV1",
    "copperWarLiveShareIdV1",
  ];

  function sanitizeShareId(raw) {
    const value = String(raw || "").trim();
    return /^[a-zA-Z0-9_-]{6,64}$/.test(value) ? value : null;
  }

  function createShareId() {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  }

  function getPersistedLiveShareId() {
    try {
      const global = sanitizeShareId(localStorage.getItem(STORAGE_KEY));
      if (global) return global;
      for (const key of LEGACY_KEYS) {
        const legacy = sanitizeShareId(localStorage.getItem(key));
        if (legacy) {
          localStorage.setItem(STORAGE_KEY, legacy);
          return legacy;
        }
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  function setPersistedLiveShareId(id) {
    const s = sanitizeShareId(String(id || ""));
    if (!s) return;
    try {
      localStorage.setItem(STORAGE_KEY, s);
    } catch {
      /* ignore */
    }
  }

  /**
   * Reuse a stored room id or create and persist one. Does not replace an
   * in-memory id already set (e.g. from ?shareId=).
   * @param {{ shareId?: string | null } | null | undefined} state
   */
  function ensureUserShareId(state) {
    if (state && state.shareId) return state.shareId;
    const persisted = getPersistedLiveShareId();
    if (persisted) {
      if (state) state.shareId = persisted;
      return persisted;
    }
    const id = createShareId();
    setPersistedLiveShareId(id);
    if (state) state.shareId = id;
    return id;
  }

  window.__lwLiveShareId = {
    STORAGE_KEY,
    sanitizeShareId,
    createShareId,
    getPersistedLiveShareId,
    setPersistedLiveShareId,
    ensureUserShareId,
  };
})();
