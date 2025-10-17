document.addEventListener('DOMContentLoaded', function () {
    // Splash screen: show for 2s then fade out
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('fade-out');
            // Remove from DOM after transition
            splash.addEventListener('transitionend', () => {
                splash.remove();
            }, { once: true });
        }, 2000);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    // Overlay to close when clicked outside
    let overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);

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
        if (sideMenu.classList.contains('open')) closeMenu();
        else openMenu();
    }

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close when clicking overlay or outside menu
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('click', function (e) {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Smooth scroll for side-menu links and close menu after click
    document.querySelectorAll('#side-menu a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (ev) {
            ev.preventDefault();
            const id = this.getAttribute('href');
            const target = document.querySelector(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            closeMenu();
        });
    });
});