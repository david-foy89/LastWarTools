(function () {
  function initPageDropdowns() {
    const nav = document.querySelector('.page-nav');
    if (!nav) return;

    ensureAllianceToolsLinks(nav);
    ensureSeason2SuppliesLink(nav);
    ensureAccountLink(nav);
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

  function ensureAccountLink(nav) {
    if (nav.querySelector('a[href="account.html"]')) return;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const link = document.createElement('a');
    link.href = 'account.html';
    link.className = 'page-link';
    link.textContent = 'Account';
    if (currentPage === 'account.html') {
      link.classList.add('active');
    }
    nav.appendChild(link);
  }

  /**
   * When signed in, merge localStorage with Firestore on load (throttled, silent).
   * Skips account.html (that page runs full sync with UI). Loads firebase-config
   * scripts if missing, then account-sync-global.js (module).
   */
  function ensureAccountBackgroundSync() {
    if (window.__lwAccountBackgroundSyncInjected) return;
    window.__lwAccountBackgroundSyncInjected = true;

    const page = window.location.pathname.split('/').pop() || '';
    if (page === 'account.html') return;

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
        return appendScript('account-sync-global.js', true);
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
