document.addEventListener('DOMContentLoaded', function () {
  /* ===== Splash screen : 2s puis fade ===== */
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      splash.addEventListener('transitionend', () => splash.remove(), { once: true });
    }, 2000);
  }

  /* ===== Bandeau cookies : fermeture + (optionnel) accept/refuse ===== */
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');
  const closeBtn  = document.getElementById('cookie-close');

  // Affiche si ni consentement ni fermeture n’ont été enregistrés
  const cookieChoice = localStorage.getItem('cookieConsent');
  const bannerClosed = localStorage.getItem('cookieBannerClosed');

  if (banner && !cookieChoice && !bannerClosed) {
    // Légère attente pour éviter l’apparition pendant le splash
    setTimeout(() => banner.classList.remove('d-none'), 1200);
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner?.classList.add('d-none');
    console.log('Cookies acceptés (aucun cookie non essentiel actuellement)');
  });

  refuseBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'refused');
    banner?.classList.add('d-none');
    console.log('Cookies refusés');
  });

  closeBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieBannerClosed', '1');
    banner?.classList.add('d-none');
  });

  /* ===== Ancrage avec offset (navbar fixe) + fermeture offcanvas ===== */
  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 80;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (ev) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      ev.preventDefault();

      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Ferme le offcanvas si ouvert (Bootstrap 5)
      const oc = document.querySelector('.offcanvas.show');
      if (oc) {
        const instance = bootstrap.Offcanvas.getInstance(oc);
        instance?.hide();
      }
    });
  });

  /* ===== Compat : ancien side menu (si présent dans le DOM) ===== */
  const sideMenu  = document.getElementById('side-menu');
  const menuToggle = document.getElementById('menu-toggle');

  if (sideMenu) {
    let overlay = document.querySelector('.page-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-overlay';
      document.body.appendChild(overlay);
    }

    function openMenu() {
      sideMenu.classList.add('open');
      sideMenu.setAttribute('aria-hidden', 'false');
      overlay.classList.add('visible');
    }
    function closeMenu() {
      sideMenu.classList.remove('open');
      sideMenu.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('visible');
    }
    function toggleMenu() {
      sideMenu.classList.contains('open') ? closeMenu() : openMenu();
    }

    menuToggle?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('click', (e) => {
      const clickedInsideMenu = sideMenu.contains(e.target);
      const clickedOnToggle = menuToggle ? menuToggle.contains(e.target) : false;
      if (!clickedInsideMenu && !clickedOnToggle) closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    // Liens internes du side-menu
    const sideLinks = document.querySelectorAll('#side-menu a[href^="#"]');
    sideLinks.forEach(link => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = link.getAttribute('href');
        const target = document.querySelector(id);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        closeMenu();
      });
    });
  }
});
