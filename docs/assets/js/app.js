// ...existing code...
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

    // If sideMenu is missing, skip menu-related wiring
    if (!sideMenu) {
        console.warn('side-menu not found in DOM; menu features disabled.');
        return;
    }

    // Overlay to close when clicked outside
    let overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        if (!sideMenu) return;
        sideMenu.classList.add('open');
        sideMenu.setAttribute('aria-hidden', 'false');
        overlay.classList.add('visible');
    }
    function closeMenu() {
        if (!sideMenu) return;
        sideMenu.classList.remove('open');
        sideMenu.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('visible');
    }
    function toggleMenu() {
        if (!sideMenu) return;
        if (sideMenu.classList.contains('open')) closeMenu();
        else openMenu();
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });
    } else {
        console.warn('menu-toggle button not found in DOM.');
    }

    // Close when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close when clicking outside menu or hamburger (guard menuToggle)
    document.addEventListener('click', function (e) {
        const target = e.target;
        const clickedInsideMenu = sideMenu.contains(target);
        const clickedOnToggle = menuToggle ? menuToggle.contains(target) : false;
        if (!clickedInsideMenu && !clickedOnToggle) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Smooth scroll for side-menu links and close menu after click
    const sideLinks = document.querySelectorAll('#side-menu a[href^="#"]');
    if (sideLinks && sideLinks.length) {
        sideLinks.forEach(function (link) {
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
    }
});