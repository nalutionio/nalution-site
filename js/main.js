// ================================
// Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
  
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  
  // ================================
  // Mobile Navigation Toggle
  // ================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
  
  
  // ================================
  // Promo / Default Hero + Form Toggle
  // ================================
  function showPromoHero(showPromo = false) {
    const defaultHero = document.getElementById('hero-default');
    const promoHero = document.getElementById('hero-promo');
  
    const defaultVideo = document.getElementById('hero-video-default');
    const promoVideo = document.getElementById('hero-video-promo');
  
    const defaultForm = document.getElementById('form-default-wrapper');
    const promoForm = document.getElementById('form-promo-wrapper');
  
    // HERO
    if (defaultHero) defaultHero.hidden = showPromo;
    if (promoHero) promoHero.hidden = !showPromo;
  
    // VIDEO (optional if video is inside hero)
    if (defaultVideo) defaultVideo.hidden = showPromo;
    if (promoVideo) promoVideo.hidden = !showPromo;
  
    // FORMS (Jotform safe)
    if (defaultForm) defaultForm.hidden = showPromo;
    if (promoForm) promoForm.hidden = !showPromo;
  }
  
  
  // ================================
  // Auto-detect Promo via URL
  // ================================
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
  
    if (params.get('promo') === '1') {
      showPromoHero(true);
    } else {
      showPromoHero(false);
    }
  });