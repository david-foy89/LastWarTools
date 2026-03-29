(function () {
  /** Same-tab hint: account-auth-modal.js sets this when signed in so the next page can paint the chip before Firebase loads. */
  var AUTH_BANNER_SESSION_UID_KEY = 'lwAuthBannerUid';

  /** Save server-rendered promo buttons before optional optimistic chip (WeakMap in auth modal needs this for sign-out). */
  function stashPromoActionsBaselineHtml() {
    document.querySelectorAll('.account-promo-actions').forEach(function (el) {
      if (el._lwPromoBaselineHtml != null) return;
      if (el.querySelector('a[href="account.html"]')) {
        el._lwPromoBaselineHtml = el.innerHTML;
      }
    });
  }

  function chipLetterFromCachedProfile() {
    try {
      var u = String(localStorage.getItem('lwProfileUsername') || '').trim();
      if (u) {
        var ch = u.charAt(0);
        return ch ? ch.toUpperCase() : '\u2026';
      }
    } catch (_) {
      /* ignore */
    }
    return '\u2026';
  }

  /** If this tab was signed in, show chip immediately (avoids flash of Create account / Sign in on navigation). */
  function paintOptimisticSignedInPromoFromSession() {
    var page = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (page === 'account.html') return;
    var uid = '';
    try {
      uid = sessionStorage.getItem(AUTH_BANNER_SESSION_UID_KEY) || '';
    } catch (_) {
      return;
    }
    if (!uid) return;
    document.querySelectorAll('.account-promo-actions').forEach(function (actions) {
      var strip = actions.closest('.account-promo-strip');
      if (!strip) return;
      if (strip.dataset.lwPromoAriaSaved === undefined) {
        strip.dataset.lwPromoAriaSaved = strip.getAttribute('aria-label') || '';
      }
      strip.classList.add('account-promo-strip--signed-in');
      strip.setAttribute('aria-label', 'Account settings');
      actions.innerHTML = '';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'account-nav-chip account-promo-account-chip';
      btn.title = 'Account settings';
      btn.setAttribute('aria-label', 'Account settings');
      var span = document.createElement('span');
      span.className = 'account-nav-chip__initials';
      span.textContent = chipLetterFromCachedProfile();
      btn.appendChild(span);
      actions.appendChild(btn);
    });
  }

  if (!window.__lwPromoChipEarlyClickAttached) {
    window.__lwPromoChipEarlyClickAttached = true;
    document.addEventListener(
      'click',
      function (ev) {
        if (!ev.target.closest('.account-promo-account-chip')) return;
        if (typeof window.__lwOpenAccountPagePopup === 'function') return;
        ev.preventDefault();
        window.__lwPendingAccountPagePopup = true;
      },
      true,
    );
  }

  /** Language inside the account strip, immediately before actions/chip (left of profile icon when signed in). */
  function moveLanguageIntoAccountPromoStrip() {
    var stack = document.querySelector('.page-top-stack');
    if (!stack) return;
    var strip = stack.querySelector('.account-promo-strip');
    var lang = stack.querySelector('.language-control');
    if (!strip || !lang) return;
    var actions = strip.querySelector('.account-promo-actions');
    if (actions) {
      if (lang.nextElementSibling !== actions) {
        strip.insertBefore(lang, actions);
      }
    } else if (!strip.contains(lang)) {
      strip.appendChild(lang);
    }
    window.__lwLanguageInAccountBanner = true;
  }

  function initPageDropdowns() {
    moveLanguageIntoAccountPromoStrip();
    stashPromoActionsBaselineHtml();
    paintOptimisticSignedInPromoFromSession();
    ensureAccountAuthModalForPromoLinks();
    const nav = document.querySelector('.page-nav');
    if (!nav) {
      ensureAccountBackgroundSync();
      return;
    }

    ensureAllianceToolsLinks(nav);
    ensureSeason2SuppliesLink(nav);
    ensureAccountBackgroundSync();
    // Train Conductor and Server Search are now handled in the Alliance Tools dropdown in HTML

    const dropdowns = Array.from(nav.querySelectorAll('details.page-nav-dropdown'));

    if (dropdowns.length === 0) return;

    function closeOthers(activeDropdown) {
      dropdowns.forEach((dropdown) => {
        if (dropdown !== activeDropdown) {
          dropdown.removeAttribute('open');
        }
      });
    }

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('toggle', () => {
        if (dropdown.open) {
          closeOthers(dropdown);
        }
      });
    });

    nav.addEventListener('click', (event) => {
      const clickedLink = event.target.closest('a.page-link');
      if (!clickedLink) return;

      dropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('open');
      });
    });

    function closeAllDropdowns() {
      dropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('open');
      });
    }

    // Close when clicking anywhere outside the nav,
    // or anywhere inside the nav but NOT inside a dropdown.
    document.addEventListener(
      'click',
      (event) => {
        const target = event.target;
        const clickedInsideNav = nav.contains(target);
        if (!clickedInsideNav) {
          closeAllDropdowns();
          return;
        }

        const clickedInsideDropdown = !!target.closest('details.page-nav-dropdown');
        if (!clickedInsideDropdown) {
          closeAllDropdowns();
        }
      },
      true,
    );

    // Escape closes any open dropdowns.
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeAllDropdowns();
    });
  }

  // Train Conductor and Server Search links are now managed in the Alliance Tools dropdown in HTML
  function ensureAllianceToolsLinks(nav) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allianceDropdowns = Array.from(
      nav.querySelectorAll('details.page-nav-dropdown'),
    ).filter((dropdown) => {
      const summary = dropdown.querySelector('summary.page-nav-dropdown-toggle');
      return summary && summary.textContent.trim() === 'Alliance Tools';
    });

    function ensureLink(menu, href, label) {
      let link = menu.querySelector(`a[href="${href}"]`);
      if (!link) {
        link = document.createElement('a');
        link.href = href;
        link.className = 'page-link';
        link.textContent = label;
        menu.appendChild(link);
      }
      if (currentPage === href) {
        link.classList.add('active');
      }
      return link;
    }

    allianceDropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector('.page-nav-dropdown-menu');
      if (!menu) return;
      ensureLink(menu, 'transfer-tracker.html', 'Transfer Tracker');
      ensureLink(menu, 'verus-tracker.html', 'Verus Tracker');
      ensureLink(menu, 'ds-tracker.html', 'Desert Storm Tracker/Planner');
      ensureLink(menu, 'alliance-hive.html', 'Alliance Hive');
    });
  }

  /**
   * Load account-auth-modal.js whenever the page has `.account-promo-strip` (not on account.html).
   * That module shows the signed-in profile chip via onAuthStateChanged; it must load even if the
   * strip has no `a[href="account.html"]` links. Intercepts those links when present so the modal
   * opens instead of navigating. On load failure, clones links so account.html still works.
   */
  function fallbackPromoAccountLinksToNavigation() {
    document.querySelectorAll('.account-promo-actions a[href="account.html"]').forEach(function (a) {
      var replacement = a.cloneNode(true);
      a.parentNode.replaceChild(replacement, a);
    });
  }

  function ensureAccountAuthModalForPromoLinks() {
    if (window.__lwAccountAuthModalScriptLoading) return;
    var page = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (page === 'account.html') return;

    var strip = document.querySelector('.account-promo-strip');
    if (!strip) return;

    var links = document.querySelectorAll('.account-promo-actions a[href="account.html"]');
    links.forEach(function (a) {
      a.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          var mode = /sign\s*in/i.test(a.textContent || '') ? 'signIn' : 'signUp';
          if (typeof window.__lwOpenAccountAuthModal === 'function') {
            window.__lwOpenAccountAuthModal(mode);
          } else {
            window.__lwPendingAccountAuthModalMode = mode;
          }
        },
        { capture: true },
      );
    });

    window.__lwAccountAuthModalScriptLoading = true;
    var s = document.createElement('script');
    s.type = 'module';
    s.src = 'account-auth-modal.js';
    s.onerror = function () {
      window.__lwAccountAuthModalScriptLoading = false;
      window.__lwAccountAuthModalLoadFailed = true;
      fallbackPromoAccountLinksToNavigation();
    };
    document.head.appendChild(s);
  }

  /**
   * Loads firebase-config scripts and optional account-sync-global.js (merge to cloud).
   * Skips account-sync-global on account.html (that page runs full sync with UI).
   * Signed-in profile circle is shown in the top account promo strip (account-auth-modal.js) — not in the nav.
   */
  function ensureAccountBackgroundSync() {
    if (window.__lwAccountBackgroundSyncInjected) return;
    window.__lwAccountBackgroundSyncInjected = true;

    var page = window.location.pathname.split('/').pop() || '';
    var skipGlobalMerge = page === 'account.html';

    function scriptFilenamePresent(filename) {
      return Array.from(document.scripts).some(function (s) {
        var src = s.src || '';
        return src.indexOf(filename) !== -1;
      });
    }

    function appendScript(src, isModule) {
      return new Promise(function (resolve) {
        if (scriptFilenamePresent(src.split('/').pop())) {
          resolve();
          return;
        }
        var el = document.createElement('script');
        el.src = src;
        if (isModule) el.type = 'module';
        el.async = true;
        el.onload = function () {
          resolve();
        };
        el.onerror = function () {
          resolve();
        };
        document.head.appendChild(el);
      });
    }

    Promise.resolve()
      .then(function () {
        return appendScript('firebase-config.example.js', false);
      })
      .then(function () {
        return appendScript('firebase-config.js', false);
      })
      .then(function () {
        if (!skipGlobalMerge) {
          return appendScript('account-sync-global.js', true);
        }
      })
      .catch(function () {});
  }

  function ensureSeason2SuppliesLink(nav) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const season2Dropdowns = Array.from(
      nav.querySelectorAll('details.page-nav-dropdown'),
    ).filter((dropdown) => {
      const summary = dropdown.querySelector('summary.page-nav-dropdown-toggle');
      return summary && summary.textContent.trim() === 'Season 2 Tools';
    });

    season2Dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector('.page-nav-dropdown-menu');
      if (!menu) return;

      let link = menu.querySelector('a[href="season-2-supplies-checklist.html"]');
      if (!link) {
        link = document.createElement('a');
        link.href = 'season-2-supplies-checklist.html';
        link.className = 'page-link';
        link.textContent = 'Supplies Checklist';
        menu.appendChild(link);
      }

      if (currentPage === 'season-2-supplies-checklist.html') {
        dropdown.classList.add('active');
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageDropdowns);
  } else {
    initPageDropdowns();
  }
})();
