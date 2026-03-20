(function () {
  function initPageDropdowns() {
    const nav = document.querySelector('.page-nav');
    if (!nav) return;

    ensureSeason2SuppliesLink(nav);
    ensureTrainConductorLink(nav);

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

    document.addEventListener('click', (event) => {
      if (nav.contains(event.target)) return;

      dropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('open');
      });
    });
  }

  function ensureTrainConductorLink(nav) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let link = nav.querySelector('a[href="train-conductor-schedule.html"]');
    if (!link) {
      link = document.createElement('a');
      link.href = 'train-conductor-schedule.html';
      link.className = 'page-link';
      link.textContent = 'Train Conductor';
      nav.appendChild(link);
    }
    if (currentPage === 'train-conductor-schedule.html') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
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
