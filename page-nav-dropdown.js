(function () {
  function initPageDropdowns() {
    const nav = document.querySelector('.page-nav');
    if (!nav) return;

    ensureAllianceToolsLinks(nav);
    ensureSeason2SuppliesLink(nav);
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
