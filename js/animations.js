/**
 * Rizal Rahman Portfolio & Studio — Shared Animation Engine
 * Butter-smooth 60fps animations: Scroll Progress Bar, IntersectionObserver Reveals,
 * 3D Magnetic Tilt Physics, Animated Metric Counters, and Parallax Dynamics.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initPageEntrance();
    initScrollProgressBar();
    initScrollRevealEngine();
    initMetricCounters();
    init3DCardTiltPhysics();
    initParallaxElements();
    initCircularBackToTop();
    initCustomSmoothScroll();
  });

  /* ==========================================================================
     1. PAGE ENTRANCE ORCHESTRATION
     ========================================================================== */
  function initPageEntrance() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.add('page-ready');
      }, 60);
    });
  }

  /* ==========================================================================
     2. UNIQUE SCRAPBOOK SCROLL PROGRESS BAR
     ========================================================================== */
  function initScrollProgressBar() {
    // If progress bar doesn't exist in DOM, auto-inject it!
    let bar = document.getElementById('scroll-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scroll-progress-bar';
      bar.className = 'scrapbook-scroll-progress-bar';
      bar.setAttribute('aria-hidden', 'true');
      bar.innerHTML = `
        <div class="scroll-progress-fill" id="scroll-progress-fill">
          <span class="scroll-progress-nib" id="scroll-progress-nib" title="Scroll Progress">✏️</span>
        </div>
      `;
      document.body.prepend(bar);
    }

    const fill = document.getElementById('scroll-progress-fill');
    const nib = document.getElementById('scroll-progress-nib');
    if (!fill) return;

    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      fill.style.transform = `scaleX(${progress})`;

      // Dynamic nib rotation based on velocity
      if (nib) {
        if (progress > 0.98) {
          nib.textContent = '★';
          nib.style.transform = 'rotate(0deg) scale(1.2)';
        } else {
          nib.textContent = '✏️';
          nib.style.transform = `rotate(${15 + progress * 20}deg)`;
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  /* ==========================================================================
     3. INTERSECTION OBSERVER SCROLL REVEAL ENGINE
     ========================================================================== */
  function initScrollRevealEngine() {
    const revealSelectors = [
      '.reveal-on-scroll',
      '.reveal-stamp',
      '.reveal-from-left',
      '.reveal-from-right',
      '.reveal-pop',
      '.reveal-stagger'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));
    if (!elements.length) return;

    // Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('is-revealed');

          // Trigger metric counters if nested inside
          const counters = target.querySelectorAll('[data-counter-target]');
          counters.forEach(counter => animateCounter(counter));

          // Once revealed, unobserve to free resources
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    elements.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     4. ANIMATED METRIC COUNTERS (ROLL UP ON SCROLL)
     ========================================================================== */
  function initMetricCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    if (el.dataset.counterDone === 'true') return;
    el.dataset.counterDone = 'true';

    const targetVal = parseFloat(el.getAttribute('data-counter-target')) || 0;
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-counter-decimals'), 10) || (targetVal % 1 !== 0 ? 1 : 0);
    const duration = parseInt(el.getAttribute('data-counter-duration'), 10) || 1600;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // EaseOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = (easeProgress * targetVal).toFixed(decimals);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${targetVal.toFixed(decimals)}${suffix}`;
        el.classList.add('counter-animated');
      }
    };

    requestAnimationFrame(step);
  }

  /* ==========================================================================
     5. 3D TACTILE CARD TILT PHYSICS WITH AMBIENT GLOSS
     ========================================================================== */
  function init3DCardTiltPhysics() {
    // Only enable on pointer-accurate devices (ignore touch screens)
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const cardSelectors = [
      '.scrapbook-project-card',
      '.sticky-note-card',
      '.about-portrait-card',
      '.blog-card',
      '.admin-stat-card',
      '.stat-card',
      '.article-preview-card'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));
    cards.forEach(card => bindTiltPhysics(card));
  }

  function bindTiltPhysics(card) {
    card.classList.add('tilt-card-active');

    let rafId = null;

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates (-1 to +1)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Max tilt angle (degrees)
      const maxTilt = 7;
      const tiltX = -(percentY * maxTilt);
      const tiltY = percentX * maxTilt;

      // Ambient gloss position (percentage)
      const glossX = (x / rect.width) * 100;
      const glossY = (y / rect.height) * 100;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${glossX.toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${glossY.toFixed(1)}%`);
      });
    };

    const onMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease';
      card.style.transform = '';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    };

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  }

  /* ==========================================================================
     6. PARALLAX FLOATING SCRAPBOOK STICKERS & BACKGROUND DOODLES
     ========================================================================== */
  function initParallaxElements() {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    if (!parallaxItems.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-parallax')) || 0.1;
        const rect = item.getBoundingClientRect();
        // Check if element is close to viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (scrollY - (item.offsetTop || 0)) * speed;
          item.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     7. CIRCULAR SCROLL PROGRESS BACK-TO-TOP BUTTON WITH ROCKET LAUNCH
     ========================================================================== */
  function initCircularBackToTop() {
    let btn = document.getElementById('floating-back-to-top') || document.getElementById('back-to-top-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'floating-back-to-top';
      btn.className = 'floating-back-to-top back-to-top-circle-wrap';
      btn.setAttribute('title', 'Launch back to top');
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = `
        <svg class="back-to-top-svg-ring" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="backToTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F43F5E" />
              <stop offset="50%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#10B981" />
            </linearGradient>
          </defs>
          <circle class="back-to-top-circle-bg" cx="24" cy="24" r="20" />
          <circle class="back-to-top-circle-progress" id="btt-circle-progress" cx="24" cy="24" r="20" />
        </svg>
        <span class="back-to-top-icon">🚀</span>
      `;
      document.body.appendChild(btn);
    }

    const progressCircle = document.getElementById('btt-circle-progress');
    const circumference = 2 * Math.PI * 20; // ~125.66

    if (progressCircle) {
      progressCircle.style.strokeDasharray = `${circumference}`;
      progressCircle.style.strokeDashoffset = `${circumference}`;
    }

    const updateRing = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      if (progressCircle) {
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = `${offset.toFixed(1)}`;
      }

      if (scrollY > 280) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', updateRing, { passive: true });
    updateRing();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.add('is-launching');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        btn.classList.remove('is-launching');
      }, 700);
    });

    // Also support any secondary back-to-top link in footer
    const footerBtt = document.getElementById('back-to-top-btn');
    if (footerBtt && footerBtt !== btn) {
      footerBtt.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     8. CUSTOM ULTRA-SMOOTH SCROLL ANIMATION (EASE-IN-OUT CUBIC)
     ========================================================================== */
  function initCustomSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;

      // Check if link points to an ID on current page
      let hash = '';
      if (href.startsWith('#')) {
        hash = href;
      } else {
        try {
          const url = new URL(link.href, window.location.href);
          if (url.pathname === window.location.pathname || url.pathname.endsWith('/' + window.location.pathname.split('/').pop())) {
            hash = url.hash;
          }
        } catch (_) {
          return;
        }
      }

      if (!hash || hash.length <= 1) return;

      const targetEl = document.querySelector(hash);
      if (!targetEl) return;

      e.preventDefault();

      // Close mobile drawer if open
      const navMenu = document.getElementById('nav-menu');
      const mobileToggle = document.getElementById('mobile-toggle');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
      }

      const header = document.getElementById('site-header');
      const headerHeight = header ? header.offsetHeight : 75;
      const targetPosition = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 15));
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;

      if (Math.abs(distance) < 5) return;

      // Dynamic duration based on travel distance (500ms min, 1000ms max)
      const duration = Math.min(Math.max(Math.abs(distance) * 0.55, 500), 1000);
      let startTime = null;

      // Easing curve: easeInOutCubic for cinematic deceleration
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetPosition);
          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }

          // Subtle landing pulse on target
          targetEl.classList.add('scroll-landed-pulse');
          setTimeout(() => {
            targetEl.classList.remove('scroll-landed-pulse');
          }, 1200);
        }
      };

      requestAnimationFrame(animateScroll);
    });
  }

  // Export utility for dynamic renders (e.g. after adding projects or blog posts)
  window.refreshScrapbookAnimations = function () {
    initScrollRevealEngine();
    init3DCardTiltPhysics();
    initMetricCounters();
  };

})();
