// JavaScript functionality for the single-page application
document.addEventListener("DOMContentLoaded", function() {
    // Handle splash screen fade-out
    const splashScreen = document.getElementById("splash-screen");
    setTimeout(() => {
        splashScreen.style.opacity = 0;
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 500); // Match this duration with the CSS transition duration
    }, 2000); // Show splash screen for 2 seconds

    // Handle hamburger menu toggle
    const hamburgerButton = document.getElementById("hamburger-button");
    const sideMenu = document.getElementById("side-menu");
    
    hamburgerButton.addEventListener("click", () => {
        sideMenu.classList.toggle("active");
    });

    // Smooth scrolling to sections
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
            sideMenu.classList.remove("active"); // Close menu after selection
        });
    });
});