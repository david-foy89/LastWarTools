/**
 * Stable live-share room ids — one persisted id per tool/scope (RTDB path).
 * Only changes when the user clicks "Change link". Same pattern as leadership
 * list ids on Transfer Tracker.
 */
(function () {
  const GLOBAL_STORAGE_KEY = "lastWarUserLiveShareIdV1";
  const SCOPED_PREFIX = "lastWarLiveShareIdV1_";

  /** Legacy per-page keys → RTDB scope (migrated into scoped keys). */
  const LEGACY_KEY_TO_SCOPE = {
    lastWarSeason1MapLiveShareIdV1: "season1-map",
    lastWarSeason2MapLiveShareIdV1: "season2-map",
    lastWarSeason3MapLiveShareIdV1: "season3-map",
    lastWarSeason4MapLiveShareIdV1: "season4-map",
    lastWarSeason5MapLiveShareIdV1: "season5-map",
    lastWarSeason6MapLiveShareIdV1: "season6-map",
    lastWarSeason2SuppliesLiveShareIdV1: "season2-supplies",
    lastWarSeason3DesertArtifactsLiveShareIdV1: "season3-desert-artifacts",
    rareSoilWarLiveShareIdV1: "rare-soil-war",
    spiceWarLiveShareIdV1: "spice-war",
    copperWarLiveShareIdV1: "copper-war",
  };

  const LEGACY_KEYS = Object.keys(LEGACY_KEY_TO_SCOPE);

  function normalizeScope(scope) {
    const s = String(scope || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return s || "";
  }

  function scopedStorageKey(scope) {
    const normalized = normalizeScope(scope);
    if (!normalized) return GLOBAL_STORAGE_KEY;
    return SCOPED_PREFIX + normalized;
  }

  function sanitizeShareId(raw) {
    const value = String(raw || "").trim();
    return /^[a-zA-Z0-9_-]{6,64}$/.test(value) ? value : null;
  }

  function createShareId() {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  }

  function readFromStorage(key) {
    try {
      return sanitizeShareId(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function writeToStorage(key, id) {
    const s = sanitizeShareId(String(id || ""));
    if (!s) return;
    try {
      localStorage.setItem(key, s);
    } catch {
      /* ignore */
    }
  }

  function migrateLegacyForScope(scope) {
    const normalized = normalizeScope(scope);
    if (!normalized) return null;

    for (const legacyKey of LEGACY_KEYS) {
      if (LEGACY_KEY_TO_SCOPE[legacyKey] !== normalized) continue;
      const legacy = readFromStorage(legacyKey);
      if (legacy) {
        writeToStorage(scopedStorageKey(normalized), legacy);
        return legacy;
      }
    }
    return null;
  }

  function getPersistedLiveShareId(scope) {
    const key = scopedStorageKey(scope);
    const direct = readFromStorage(key);
    if (direct) return direct;

    const normalized = normalizeScope(scope);
    if (normalized) {
      const migrated = migrateLegacyForScope(normalized);
      if (migrated) return migrated;

      const global = readFromStorage(GLOBAL_STORAGE_KEY);
      if (global) {
        writeToStorage(key, global);
        return global;
      }
      return null;
    }

    try {
      const global = readFromStorage(GLOBAL_STORAGE_KEY);
      if (global) return global;
      for (const legacyKey of LEGACY_KEYS) {
        const legacy = readFromStorage(legacyKey);
        if (legacy) {
          writeToStorage(GLOBAL_STORAGE_KEY, legacy);
          return legacy;
        }
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  function setPersistedLiveShareId(id, scope) {
    writeToStorage(scopedStorageKey(scope), id);
  }

  /**
   * Reuse stored room id for this scope, or create and persist one.
   * Does not replace an in-memory id already set (e.g. from ?shareId= guest URL).
   * @param {{ shareId?: string | null } | null | undefined} state
   * @param {string} [scope] RTDB path or tool id (e.g. season2-map, rare-soil-war)
   */
  function ensureUserShareId(state, scope) {
    if (state && state.shareId) return state.shareId;
    const persisted = getPersistedLiveShareId(scope);
    if (persisted) {
      if (state) state.shareId = persisted;
      return persisted;
    }
    const id = createShareId();
    setPersistedLiveShareId(id, scope);
    if (state) state.shareId = id;
    return id;
  }

  window.__lwLiveShareId = {
    GLOBAL_STORAGE_KEY,
    SCOPED_PREFIX,
    normalizeScope,
    scopedStorageKey,
    sanitizeShareId,
    createShareId,
    getPersistedLiveShareId,
    setPersistedLiveShareId,
    ensureUserShareId,
  };
})();
