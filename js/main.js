// ================= NAV TOGGLE =================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// ================= TESTIMONIALS =================
const track = document.getElementById('testimonialTrack');
let cards = Array.from(track.children);

// Function to detect mobile
function isMobileView() {
    return window.innerWidth <= 768;
}

// DESKTOP BELT FUNCTION
let beltAnimationId; // to store requestAnimationFrame id
function initDesktopBelt() {
    // stop any existing animation
    if (beltAnimationId) cancelAnimationFrame(beltAnimationId);

    // remove any absolute positioning for mobile fade
    cards.forEach(c => {
        c.style.position = '';
        c.style.top = '';
        c.style.left = '';
        c.style.transform = '';
        c.style.opacity = '';
    });

    // duplicate cards for smooth loop
    if (track.children.length === cards.length) { // duplicate only once
        track.innerHTML += track.innerHTML;
    }

    let scrollPos = 0;
    const speed = 0.5;

    function animateBelt() {
        scrollPos += speed;
        if (scrollPos >= track.scrollWidth / 2) scrollPos = 0;
        track.style.transform = `translateX(-${scrollPos}px)`;

        const beltRect = track.parentElement.getBoundingClientRect();
        const beltCenter = beltRect.left + beltRect.width / 2;

        Array.from(track.children).forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const diff = Math.abs(beltCenter - cardCenter);

            if (diff < rect.width / 2) {
                card.classList.add('center');
            } else {
                card.classList.remove('center');
            }
        });

        beltAnimationId = requestAnimationFrame(animateBelt);
    }

    animateBelt();
}

// ================= MOBILE FADE =================
let mobileInterval;
function initMobileFade() {
    // stop desktop animation if running
    if (beltAnimationId) cancelAnimationFrame(beltAnimationId);

    // clear interval if it exists
    if (mobileInterval) clearInterval(mobileInterval);

    // remove duplicated cards from desktop (keep original cards only)
    track.innerHTML = '';
    cards.forEach(c => track.appendChild(c));

    // position cards in same spot
    cards.forEach(c => {
        c.classList.remove('active');
        c.style.position = 'absolute';
        c.style.top = '0';
        c.style.left = '50%';
        c.style.transform = 'translateX(-50%)';
        c.style.opacity = 0;
    });

    let index = 0;
    cards[index].classList.add('active');
    cards[index].style.opacity = 1;

    mobileInterval = setInterval(() => {
        cards[index].classList.remove('active');
        cards[index].style.opacity = 0;

        index = (index + 1) % cards.length;

        cards[index].classList.add('active');
        cards[index].style.opacity = 1;
    }, 3800);
}

// ================= INIT BASED ON SCREEN SIZE =================
function initTestimonials() {
    if (isMobileView()) {
        initMobileFade();
    } else {
        initDesktopBelt();
    }
}

// ================= RUN ON LOAD =================
initTestimonials();

// ================= HANDLE RESIZE =================
window.addEventListener('resize', () => {
    // re-grab original cards (avoid duplicated ones)
    track.innerHTML = '';
    cards.forEach(c => track.appendChild(c));

    initTestimonials();
});

// ================= SMOOTH SCROLL FOR ANCHORS =================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ================= NEWSLETTER (GOOGLE SHEET) =================
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = this.email.value;
    const phone = this.phone.value;

    fetch('https://script.google.com/macros/s/AKfycbzDosEX-EYl9NtfQ9D_xXnjntHVjyWYC-ASVny2CyNgfPbVb87thvyD_IZtDyqFNnkucQ/exec', {
        method: 'POST',
        body: JSON.stringify({ email, phone }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('newsletterMessage').style.display = 'block';
        this.reset();
    })
    .catch(err => {
        alert('There was an error. Please try again later.');
        console.error(err);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const customizeBtn = document.querySelector('.cc-link');
    const modal = document.getElementById('cookieModal');
    const saveBtn = document.getElementById('saveCookies');
    const analyticsToggle = document.getElementById('analyticsToggle');
    const marketingToggle = document.getElementById('marketingToggle');
  
    if (customizeBtn) {
      customizeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
      });
    }
  
    saveBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  
      // Enable analytics if checked
      if (analyticsToggle.checked) {
        document
          .querySelectorAll('script[type="text/plain"][data-cookiecategory="analytics"]')
          .forEach(script => {
            const s = document.createElement('script');
            if (script.src) s.src = script.src;
            else s.textContent = script.textContent;
            document.body.appendChild(s);
          });
      }
  
      // Marketing scripts can be handled similarly if you have any
      if (marketingToggle.checked) {
        // Add marketing script logic here
      }
    });
  });
  
