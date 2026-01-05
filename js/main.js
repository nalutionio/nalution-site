// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Example future use: toggle mobile nav
// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// You can expand this later