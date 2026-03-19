(function () {
  function initPageDropdowns() {
    const nav = document.querySelector('.page-nav');
    if (!nav) return;

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageDropdowns);
  } else {
    initPageDropdowns();
  }
})();
