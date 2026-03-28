(function () {
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
    });
  }

  /**
   * Load site-wide sign-in modal when promo uses links to account.html (not on account.html itself).
   * preventDefault runs synchronously so the browser does not navigate before the module loads.
   * If account-auth-modal.js fails to load (onerror), we clone those links to drop listeners so
   * account.html navigation works; otherwise promo links would stay dead for the page visit.
   */
  function fallbackPromoAccountLinksToNavigation() {
    document.querySelectorAll('.account-promo-actions a[href="account.html"]').forEach(function (a) {
      var replacement = a.cloneNode(true);
      a.parentNode.replaceChild(replacement, a);
    });
  }

  function ensureAccountAuthModalForPromoLinks() {
    if (window.__lwAccountAuthModalScriptLoading) return;
    var links = document.querySelectorAll('.account-promo-actions a[href="account.html"]');
    if (!links.length) return;
    window.__lwAccountAuthModalScriptLoading = true;
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
