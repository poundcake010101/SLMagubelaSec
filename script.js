// ===================================================
//   SL MAGUBELA SECURITY — script.js
// ===================================================

// ===== HAMBURGER MENU =====
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu) menu.classList.remove("open");
    if (icon) icon.classList.remove("open");
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TEAM VIDEO MODAL =====
function openTeamVideoModal() {
  const modal = document.getElementById("teamVideoModal");
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  const video = document.getElementById("teamVideoFrame");
  if (video) video.play().catch(() => {});
}

function closeTeamVideoModal() {
  const modal = document.getElementById("teamVideoModal");
  const video = document.getElementById("teamVideoFrame");
  if (!modal) return;
  if (video) { video.pause(); video.currentTime = 0; }
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

window.addEventListener('click', function (e) {
  const modal = document.getElementById("teamVideoModal");
  if (e.target === modal) closeTeamVideoModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeTeamVideoModal();
});

// ===== STATS COUNTER =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 16);
}

// ===== INTERSECTION OBSERVER (fade-in + stats) =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function () {
  // Fade-in for cards and sections
  document.querySelectorAll(
    '.service-card, .market-card, .edge-card, .staff-card, ' +
    '.property-card, .testimonial-card, .about-card, .contact-card, .stat-card'
  ).forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    fadeObserver.observe(el);
  });

  // Stats counter trigger
  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showFormAlert('Please fill in all required fields (Name, Email, Message).', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormAlert('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText ? btnText.textContent : submitBtn.textContent;

      if (btnText) btnText.textContent = 'Sending...';
      else submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = {
        name,
        email,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message
      };

      fetch('https://formspree.io/f/mqayorar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => {
          if (res.ok) {
            showFormAlert('Message sent! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            resetFieldStyles();
          } else {
            throw new Error('Network error');
          }
        })
        .catch(() => {
          showFormAlert('Error sending message. Please call us directly on +27 66 067 0102.', 'error');
        })
        .finally(() => {
          if (btnText) btnText.textContent = originalText;
          else submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });

    // Live field validation
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', function () {
        validateField(this);
      });
      input.addEventListener('input', function () {
        if (this.style.borderColor === 'rgb(192, 57, 43)') validateField(this);
      });
    });
  }
});

function validateField(field) {
  const isEmpty = field.hasAttribute('required') && !field.value.trim();
  const isInvalidEmail = field.type === 'email' && field.value.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());

  if (isEmpty || isInvalidEmail) {
    field.style.borderColor = '#C0392B';
  } else if (field.value.trim()) {
    field.style.borderColor = '#27AE60';
  } else {
    field.style.borderColor = '';
  }
}

function resetFieldStyles() {
  document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select')
    .forEach(el => { el.style.borderColor = ''; });
}

function showFormAlert(msg, type) {
  // Remove existing alert
  const existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = 'form-alert';
  alert.textContent = msg;
  alert.style.cssText = `
    padding: 1rem 1.25rem;
    border-radius: 4px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    background: ${type === 'success' ? 'rgba(39,174,96,0.15)' : 'rgba(192,57,43,0.15)'};
    border: 1px solid ${type === 'success' ? 'rgba(39,174,96,0.4)' : 'rgba(192,57,43,0.4)'};
    color: ${type === 'success' ? '#27AE60' : '#E74C3C'};
    animation: fadeIn 0.3s ease;
  `;

  const form = document.getElementById('contactForm');
  form.appendChild(alert);

  setTimeout(() => { if (alert.parentNode) alert.remove(); }, 6000);
}

// Add fadeIn keyframe dynamically
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);