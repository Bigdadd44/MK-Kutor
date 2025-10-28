// MK Kutor Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const loader = document.getElementById('site-loader');
  const header = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('form-msg');
  const backToTop = document.getElementById('backToTop');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  
  let lastScrollY = window.scrollY;
  let lastFocused = null;

  // Loader
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 400);
    }
  });

  // Header scroll behavior
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Show/hide header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    
    // Back to top button visibility
    if (currentScrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
    
    lastScrollY = currentScrollY;
  }

  // Throttle scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 100);
    }
  });

  // Mobile menu
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('open');
    });

    // Close mobile menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (nav && nav.classList.contains('open')) {
          hamburger.click();
        }
        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .gallery-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '50px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // Gallery lightbox with keyboard support
  function openLightbox(item) {
    if (!lightbox || !lightboxImg) return;
    
    lastFocused = document.activeElement;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) {
      lastFocused.focus();
    }
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }, 300);
  }

  if (galleryItems && lightbox) {
    galleryItems.forEach(item => {
      // Click handler
      item.addEventListener('click', () => openLightbox(item));
      
      // Keyboard handler
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // Contact form handling
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const contactInfo = document.getElementById('contactInfo').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !contactInfo || !message) {
        formMsg.textContent = 'Please fill in all fields.';
        formMsg.className = 'form-msg error';
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      formMsg.textContent = '';

      try {
        // Simulate API call - Replace with your actual form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        formMsg.textContent = 'Thanks! Your message was sent successfully.';
        formMsg.className = 'form-msg success';
        contactForm.reset();
      } catch (error) {
        formMsg.textContent = 'Sorry, something went wrong. Please try again.';
        formMsg.className = 'form-msg error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
      }
    });
  }

  // WhatsApp button
  if (whatsappBtn) {
    const PHONE_NUMBER = '15551234567'; // Replace with your WhatsApp number
    whatsappBtn.href = `https://wa.me/${PHONE_NUMBER}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
  }

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
