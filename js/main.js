/**
 * Rizal Rahman Portfolio — Playful Scrapbook Edition
 * Vanilla JavaScript for 60fps animations, interactive case study modal,
 * live IST clock, email copy toast, and dynamic synchronization with Content Store.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initNavigationScrollSpy();
  initMobileMenu();
  initDynamicContent();
  initCaseStudyModal();
  initProjectsSectionVisibility();
  initCreativeStudioInteractivity();
  initSoftwareSnakeTrack();
  initEmailCopy();
  initLiveIndiaClock();
  initContactForm();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLLSPY
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initNavigationScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   2. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggle = () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggle);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggle();
      }
    });
  });
}

/* ==========================================================================
   2B. PROJECTS SECTION VISIBILITY & NAVIGATION STATE
   ========================================================================== */
function initProjectsSectionVisibility() {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const header = document.getElementById('site-header');
  const navMenu = document.getElementById('nav-menu');
  const toggleBtn = document.getElementById('mobile-toggle');

  function closeMobileDrawer() {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }
  }

  function scrollToElement(el, instant) {
    if (!el) return;
    const headerHeight = header ? header.offsetHeight : 80;
    const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerHeight - 8);
    window.scrollTo({
      top: targetTop,
      behavior: instant ? 'instant' : 'smooth'
    });
  }

  function setActiveNavLink(navId) {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-nav') === navId);
    });
  }

  function setProjectsVisible(visible) {
    if (visible) {
      projectsSection.hidden = false;
      projectsSection.setAttribute('aria-hidden', 'false');
      if (typeof window.refreshScrapbookAnimations === 'function') {
        window.refreshScrapbookAnimations();
      }
      requestAnimationFrame(() => {
        projectsSection.querySelectorAll('.reveal-on-scroll, .reveal-stamp, .reveal-from-left, .reveal-from-right, .reveal-pop')
          .forEach((el) => el.classList.add('is-revealed'));
      });
    } else {
      projectsSection.hidden = true;
      projectsSection.setAttribute('aria-hidden', 'true');
    }
  }

  function showProjectsAndScroll(options = {}) {
    const { updateHistory = true, instant = false } = options;
    closeMobileDrawer();
    setProjectsVisible(true);
    setActiveNavLink('projects');
    if (updateHistory && window.location.hash !== '#projects') {
      history.pushState({ section: 'projects' }, '', '#projects');
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(projectsSection, instant);
      });
    });
  }

  // Handle all #projects triggers (top nav, mobile drawer, hero CTA)
  document.querySelectorAll('a[href="#projects"]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showProjectsAndScroll({ updateHistory: true, instant: false });
    });
  });

  // Handle other main navigation links: hide Projects again & scroll cleanly
  document.querySelectorAll('.nav-link[href^="#"], .header-cta-btn[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#projects') return;

    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileDrawer();
      setProjectsVisible(false);
      setActiveNavLink(href.slice(1));
      if (window.location.hash !== href) {
        history.pushState({ section: href.slice(1) }, '', href);
      }
      requestAnimationFrame(() => {
        scrollToElement(target, false);
      });
    });
  });

  // Sync state on direct /#projects load, refresh, and browser back/forward
  function syncFromLocation(isInitialLoad) {
    const hash = window.location.hash;
    if (hash === '#projects') {
      showProjectsAndScroll({ updateHistory: false, instant: isInitialLoad });
    } else {
      setProjectsVisible(false);
      if (!isInitialLoad) {
        if (hash && hash.startsWith('#')) {
          const target = document.querySelector(hash);
          if (target) {
            requestAnimationFrame(() => scrollToElement(target, false));
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }

  window.addEventListener('popstate', () => syncFromLocation(false));
  window.addEventListener('hashchange', () => syncFromLocation(false));

  syncFromLocation(true);
}

/* ==========================================================================
   3. DYNAMIC CONTENT SYNCHRONIZATION WITH ADMIN STORE
   ========================================================================== */
function initDynamicContent() {
  if (typeof getProjects !== 'function') return;

  renderDynamicProjects();
  renderDynamicTestimonials();
  renderDynamicProfile();
  renderDynamicHomeBlogs();

  window.addEventListener('rizal:blogs-synced', () => {
    renderDynamicHomeBlogs();
  });
}

function renderDynamicHomeBlogs() {
  const grid = document.getElementById('home-blog-grid');
  if (!grid || typeof getBlogPosts !== 'function') return;

  const allPosts = getBlogPosts().filter(p => p.status === 'published');
  if (allPosts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.25rem; border-radius: 16px; border: 2px dashed rgba(148, 163, 184, 0.45); background: var(--bg-paper);">
        <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">📓</div>
        <h3 style="font-family: var(--font-cutout); font-size: 1.5rem; color: var(--ink-primary);">New articles coming soon.</h3>
        <p style="color: var(--ink-muted); margin-top: 0.35rem;">Fresh notes on digital marketing, design, and creative strategy will appear here once published.</p>
      </div>
    `;
    return;
  }
  const tapeColors = ['tape-yellow', 'tape-pink', 'tape-blue', 'tape-cream'];
  const fillerHtml = typeof getScrapbookFillerDoodles === 'function' ? getScrapbookFillerDoodles(allPosts.length, 3) : '';

  grid.innerHTML = allPosts.map((post, idx) => {
    const tapeClass = tapeColors[idx % tapeColors.length];
    const slug = post.slug || (typeof window.slugifyBlogTitle === 'function' ? window.slugifyBlogTitle(post.title) : post.id);
    const articleUrl = `/insights/${encodeURIComponent(slug)}/`;
    return `
      <article class="blog-card" onclick="if(!event.target.closest('a,button')) window.openHomeBlogArticle('${post.id}')">
        <div class="blog-card-media">
          <span class="blog-badge-category">${post.category}</span>
          <div class="washi-tape tape-tr ${tapeClass}"></div>
          <img src="${post.coverImage || '/assets/images/project-1-art.jpg'}" alt="${post.title}" loading="lazy" decoding="async">
        </div>
        <div class="blog-card-content">
          <div class="blog-meta-row">
            <span>${post.date}</span>
            <span class="blog-meta-dot">✦</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="blog-card-title"><a href="${articleUrl}" onclick="if(!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0){ event.preventDefault(); window.openHomeBlogArticle('${post.id}'); }">${post.title}</a></h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <a class="btn-read-entry" href="${articleUrl}" onclick="if(!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0){ event.preventDefault(); window.openHomeBlogArticle('${post.id}'); }">Read Entry <span>↗</span></a>
            <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
              <button type="button" class="btn-admin-action" onclick="event.stopPropagation(); window.shareBlogArticle && window.shareBlogArticle('${post.id}')" title="Share this blog post">🔗 Share</button>
              <span class="blog-views-count">👁 ${post.views || 0}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('') + fillerHtml;

  const modal = document.getElementById('article-modal');
  const closeBtn = document.getElementById('article-modal-close');
  const doneBtn = document.getElementById('article-modal-done-btn');

  const closeArticleModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = closeArticleModal;
  if (doneBtn) doneBtn.onclick = closeArticleModal;
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeArticleModal();
    });
  }

  window.openHomeBlogArticle = (postId) => {
    const post = typeof getBlogPost === 'function' ? getBlogPost(postId) : allPosts.find(p => p.id === postId);
    if (!post || !modal) return;
    window._activeHomeArticleId = postId;
    if (typeof incrementPostView === 'function') incrementPostView(postId);

    const catEl = document.getElementById('modal-article-category');
    const titleEl = document.getElementById('modal-article-title');
    const dateEl = document.getElementById('modal-article-date');
    const timeEl = document.getElementById('modal-article-time');
    const viewsEl = document.getElementById('modal-article-views');
    const imgEl = document.getElementById('modal-article-image');
    const contentEl = document.getElementById('modal-article-content');

    if (catEl) catEl.textContent = post.category;
    if (titleEl) titleEl.textContent = post.title;
    if (dateEl) dateEl.textContent = post.date;
    if (timeEl) timeEl.textContent = post.readTime;
    if (viewsEl) viewsEl.textContent = `${(post.views || 0) + 1} reads`;
    if (imgEl) {
      if (post.coverImage) {
        imgEl.src = post.coverImage;
        imgEl.style.display = 'block';
      } else {
        imgEl.style.display = 'none';
      }
    }
    if (contentEl) {
      const rawBody = post.content || `<p>${post.excerpt}</p>`;
      contentEl.innerHTML = typeof window.formatBlogArticleHtml === 'function' ? window.formatBlogArticleHtml(rawBody) : rawBody;
    }

    const modalShareBtn = document.getElementById('modal-article-share-btn');
    if (modalShareBtn) {
      modalShareBtn.onclick = () => {
        if (window._activeHomeArticleId && typeof window.shareBlogArticle === 'function') {
          window.shareBlogArticle(window._activeHomeArticleId);
        }
      };
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Auto-open shared article URL (?article=...)
  const sharedId = new URLSearchParams(window.location.search).get('article');
  if (sharedId && !window._sharedArticleOpened) {
    window._sharedArticleOpened = true;
    setTimeout(() => window.openHomeBlogArticle(sharedId), 150);
  }

  if (typeof window.refreshScrapbookAnimations === 'function') {
    window.refreshScrapbookAnimations();
  }
}

function renderDynamicProjects() {
  const container = document.querySelector('.projects-showcase-grid');
  if (!container) return;

  const projects = getProjects() || [];
  const bgClasses = ['card-bg-orange', 'card-bg-purple', 'card-bg-mint', 'card-bg-blue', 'card-bg-pink', 'card-bg-yellow'];
  const tapeClasses = ['tape-tl tape-pink', 'tape-tr tape-yellow', 'tape-tr tape-cream', 'tape-tl tape-yellow', 'tape-tr tape-pink', 'tape-center tape-cream'];
  const fillerHtml = typeof getScrapbookFillerDoodles === 'function' ? getScrapbookFillerDoodles(projects.length, 3) : '';

  container.innerHTML = projects.map((p, idx) => {
    const num = idx + 1 < 10 ? '0' + (idx + 1) : '' + (idx + 1);
    const bg = p.bgClass || bgClasses[idx % bgClasses.length];
    const tape = p.tapeClass || tapeClasses[idx % tapeClasses.length];
    const badgeText = p.badge || `${num} // ${p.category ? p.category.split('&')[0].trim().toUpperCase() : 'PROJECT'}`;

    return `
      <article class="scrapbook-project-card" data-project-id="${p.id}">
        <div class="card-visual-container ${bg}">
          <span class="card-corner-badge">${badgeText}</span>
          <div class="washi-tape ${tape}"></div>
          
          <div class="card-mockup-frame">
            <img src="${p.image || 'assets/images/project-1-art.jpg'}" alt="${p.title}" class="card-mockup-img" loading="lazy">
          </div>
        </div>

        <div class="card-content-body">
          <div class="card-category-tag">${p.category}</div>
          <h3 class="card-project-title">${p.title}</h3>
          <div class="card-project-subtitle">${p.subtitle || ''}</div>
          <p class="card-project-excerpt">
            ${p.excerpt}
          </p>
          
          <div class="card-footer-action">
            <span class="btn-view-study">Open Case Study <span>↗</span></span>
            <span class="card-study-pill">${p.impact || 'Case Study ✦'}</span>
          </div>
        </div>
      </article>
    `;
  }).join('') + fillerHtml;

  // Re-bind modal click listeners
  bindModalTriggers();

  // Refresh animations for newly injected cards
  if (typeof window.refreshScrapbookAnimations === 'function') {
    window.refreshScrapbookAnimations();
  }
}

function renderDynamicTestimonials() {
  const container = document.querySelector('.sticky-notes-grid');
  if (!container || typeof getTestimonials !== 'function') return;

  const testimonials = getTestimonials() || [];
  const colors = ['sticky-yellow', 'sticky-pink', 'sticky-blue'];
  const tapes = ['tape-center tape-cream', 'tape-center tape-yellow', 'tape-center tape-pink'];
  const fillerHtml = typeof getScrapbookFillerDoodles === 'function' ? getScrapbookFillerDoodles(testimonials.length, 3) : '';

  container.innerHTML = testimonials.map((t, idx) => {
    const col = t.colorClass || colors[idx % colors.length];
    const tape = t.tapeClass || tapes[idx % tapes.length];
    return `
      <div class="sticky-note-card ${col}">
        <div class="washi-tape ${tape}"></div>
        <p class="sticky-note-quote">${t.quote}</p>
        <div class="sticky-note-author">
          <div class="author-name">${t.author}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    `;
  }).join('') + fillerHtml;

  if (typeof window.refreshScrapbookAnimations === 'function') {
    window.refreshScrapbookAnimations();
  }
}

function renderDynamicProfile() {
  if (typeof getProfileData !== 'function') return;
  const p = getProfileData();
  if (!p) return;

  // Tagline
  const taglineEl = document.querySelector('.hero-description-note');
  if (taglineEl && p.tagline) {
    taglineEl.textContent = p.tagline;
  }

  // Hero badge
  const badgeEl = document.querySelector('.hero-role-badge');
  if (badgeEl && p.roleBadge) {
    badgeEl.innerHTML = `<span>★</span> ${p.roleBadge.replace(/^★\s*/, '')}`;
  }

  // Direct email
  const emailLink = document.querySelector('.contact-val a[href^="mailto:"]');
  if (emailLink && p.email) {
    emailLink.href = `mailto:${p.email}`;
    emailLink.textContent = p.email;
  }

  // About me paragraphs
  const bodyPars = document.querySelectorAll('.about-notepad-body p');
  if (bodyPars.length >= 3) {
    if (p.bioP1) bodyPars[0].textContent = p.bioP1;
    if (p.bioP2) bodyPars[1].textContent = p.bioP2;
    if (p.bioP3) bodyPars[2].textContent = p.bioP3;
  }
}

/* ==========================================================================
   4. CASE STUDY MODAL & NOTEBOOK POPUP
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  bindModalTriggers();
}

function closeModal() {
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function bindModalTriggers() {
  const modal = document.getElementById('case-study-modal');
  const projectCards = document.querySelectorAll('.scrapbook-project-card');
  if (!modal) return;

  const titleEl = document.getElementById('modal-project-title');
  const subtitleEl = document.getElementById('modal-project-subtitle');
  const categoryEl = document.getElementById('modal-project-category');
  const imageEl = document.getElementById('modal-project-image');
  const challengeEl = document.getElementById('modal-project-challenge');
  const solutionEl = document.getElementById('modal-project-solution');
  const clientEl = document.getElementById('modal-project-client');
  const roleEl = document.getElementById('modal-project-role');
  const toolsEl = document.getElementById('modal-project-tools');
  const impactEl = document.getElementById('modal-project-impact');

  const openModal = (projectId) => {
    let data = null;
    if (typeof getProjects === 'function') {
      const allProjects = getProjects();
      data = allProjects.find(p => p.id === projectId);
    }

    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle || '';
    if (categoryEl) categoryEl.textContent = data.category;
    if (imageEl) {
      imageEl.src = data.image || 'assets/images/project-1-art.jpg';
      imageEl.alt = data.title;
    }
    if (challengeEl) challengeEl.textContent = data.challenge || data.excerpt;
    if (solutionEl) solutionEl.textContent = data.solution || 'Custom creative execution tailored to client brand goals.';
    if (clientEl) clientEl.textContent = data.client || 'Client Partnership';
    if (roleEl) roleEl.textContent = data.role || 'Design & Strategy Lead';
    if (toolsEl) toolsEl.textContent = data.tools || 'Creative Suite';
    if (impactEl) impactEl.textContent = data.impact || 'Verified Results';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  projectCards.forEach((card) => {
    card.onclick = () => {
      const id = card.getAttribute('data-project-id');
      openModal(id);
    };
  });
}

/* ==========================================================================
   5. EMAIL COPY WITH PAPER TOAST
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('paper-toast');

  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', async () => {
    let email = 'rizalrahman8055@gmail.com';
    if (typeof getProfileData === 'function') {
      const p = getProfileData();
      if (p && p.email) email = p.email;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    } catch (err) {
      console.log('Copy error:', err);
    }
  });
}

/* ==========================================================================
   6. LIVE INDIA IST CLOCK
   ========================================================================== */
function initLiveIndiaClock() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;

  const updateClock = () => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const now = new Date();
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `${timeString} IST`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. CONTACT INQUIRY FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Friend';
    alert(`Thank you, ${name}! Your note has been dispatched to Rizal.`);
    form.reset();
  });
}

/* ==========================================================================
   8. CREATIVE STUDIO LAB & LIVING PLAYGROUND INTERACTIVITY
   ========================================================================== */
function initCreativeStudioInteractivity() {
  const artboard = document.getElementById('creative-lab');
  const tickerText = document.getElementById('studio-ticker-text');
  if (!artboard) return;

  const setTicker = (msg) => {
    if (tickerText) tickerText.textContent = msg;
  };

  const defaultMessage = "Hover or tap any tool or specialty to explore details!";

  // Tool elements
  const toolRocket = document.getElementById('tool-rocket');
  const toolCamera = document.getElementById('tool-camera');
  const toolPencil = document.getElementById('tool-pencil');
  const toolClapper = document.getElementById('tool-clapper');
  const toolAiOrb = document.getElementById('tool-ai-orb');
  const flashFx = document.getElementById('camera-flash-fx');

  // Category list items (left column)
  const categoryItems = document.querySelectorAll('.category-bubbly-item');

  const specialtyMap = {
    'digital-marketing': {
      tool: toolRocket,
      msg: '🚀 Digital Marketing: Performance Meta Ads, Omnichannel Funnels & +300% Growth drives!'
    },
    'graphic-design': {
      tool: toolPencil,
      msg: '🎨 Graphic Design: Vector marks, Bespoke Typography & Print Packaging Craft!'
    },
    'creative-strategy': {
      tool: toolCamera,
      msg: '💡 Creative Strategy: High-concept Art Direction, Visual Narratives & Brand Positioning!'
    },
    'ai-visuals': {
      tool: toolAiOrb,
      msg: '✨ AI Visuals: Generative Higgsfield AI Imagery, Video Motion & Synthetic Assets!'
    },
    'motion-video': {
      tool: toolClapper,
      msg: '🎬 Motion Graphics: 60fps Broadcast Animation, Kinetic Typography & Reels!'
    }
  };

  const clearAllFocus = () => {
    [toolRocket, toolCamera, toolPencil, toolClapper, toolAiOrb].forEach(t => t?.classList.remove('active-focus'));
    categoryItems.forEach(c => c.classList.remove('is-active-sync'));
    setTicker(defaultMessage);
  };

  // 1. Hover & Touch on Left Specialties
  categoryItems.forEach(item => {
    const filterKey = item.getAttribute('data-filter');
    const info = specialtyMap[filterKey];
    if (!info) return;

    const activateSpecialty = () => {
      clearAllFocus();
      item.classList.add('is-active-sync');
      if (info.tool) {
        info.tool.classList.add('active-focus');
      }
      setTicker(info.msg);
    };

    item.addEventListener('mouseenter', activateSpecialty);
    item.addEventListener('click', activateSpecialty);
    item.addEventListener('touchstart', activateSpecialty, { passive: true });

    item.addEventListener('mouseleave', () => {
      clearAllFocus();
    });
  });

  // 2. Hover, Touch, and Clicks on Right Tools
  const bindToolInteraction = (toolEl, filterKey, customClickFn) => {
    if (!toolEl) return;
    const info = specialtyMap[filterKey];

    const activateTool = () => {
      clearAllFocus();
      toolEl.classList.add('active-focus');
      const targetCategory = document.querySelector(`.category-bubbly-item[data-filter="${filterKey}"]`);
      if (targetCategory) targetCategory.classList.add('is-active-sync');
      if (info) setTicker(info.msg);
    };

    toolEl.addEventListener('mouseenter', activateTool);

    toolEl.addEventListener('click', (e) => {
      activateTool();
      if (customClickFn) customClickFn();
    });

    toolEl.addEventListener('touchstart', (e) => {
      activateTool();
      if (customClickFn) customClickFn();
    }, { passive: true });

    toolEl.addEventListener('mouseleave', () => {
      clearAllFocus();
    });
  };

  // Rocket Click: rocket boost effect
  bindToolInteraction(toolRocket, 'digital-marketing', () => {
    toolRocket.classList.add('active-focus');
    setTicker("🚀 Whoosh! Ad campaign launched with 4.8x ROAS!");
    setTimeout(clearAllFocus, 1800);
  });

  // Camera Click: flash effect + photo eject
  bindToolInteraction(toolCamera, 'creative-strategy', () => {
    if (flashFx) {
      flashFx.style.transition = 'opacity 0.05s ease';
      flashFx.style.opacity = '0.9';
      setTimeout(() => {
        flashFx.style.transition = 'opacity 0.5s ease';
        flashFx.style.opacity = '0';
      }, 100);
    }
    setTicker("📸 Snap! Polaroid captured for Rizal's art gallery!");
    setTimeout(clearAllFocus, 2000);
  });

  // Pencil Click: pencil wiggle
  bindToolInteraction(toolPencil, 'graphic-design', () => {
    toolPencil.classList.add('active-focus');
    setTicker("✏️ Magic pencil drew a bespoke vector identity!");
    setTimeout(clearAllFocus, 1800);
  });

  // Clapper Click: arm snaps down
  bindToolInteraction(toolClapper, 'motion-video', () => {
    toolClapper.classList.remove('clapped');
    void toolClapper.offsetWidth; // trigger reflow
    toolClapper.classList.add('clapped');
    setTicker("🎬 Clapper snapped! 60fps reel is rendering!");
    setTimeout(() => {
      toolClapper.classList.remove('clapped');
      clearAllFocus();
    }, 1800);
  });

  // AI Orb Click: glow pulse
  bindToolInteraction(toolAiOrb, 'ai-visuals', () => {
    toolAiOrb.classList.add('active-focus');
    setTicker("✨ Prompt synthesized! Higgsfield AI video generation complete!");
    setTimeout(clearAllFocus, 1800);
  });
}

/* ==========================================================================
   9. ANIMATED SOFTWARE SNAKE INTERACTION (BIDIRECTIONAL TOUCH & TAP ENGINE)
   ========================================================================== */
function initSoftwareSnakeTrack() {
  const snakeNodes = document.querySelectorAll('.snake-icon-node');
  const footerNote = document.querySelector('.snake-track-footer');
  const softwareRows = document.querySelectorAll('.software-row');

  if (!snakeNodes.length || !footerNote) return;

  const defaultMsg = "<span>✦</span> Tap or hover any tool icon to inspect details.";

  const toolDetails = [
    { name: 'Meta Ads Manager', desc: 'Performance marketing funnels, ROAS scaling & paid acquisition' },
    { name: 'Adobe Photoshop', desc: 'Expert raster compositing, high-end retouching & key visuals' },
    { name: 'Adobe Illustrator', desc: 'Bespoke vector marks, brand geometry & print packaging' },
    { name: 'Adobe After Effects', desc: '60fps motion design, kinetic type & broadcast brand reels' },
    { name: 'Figma', desc: 'Interactive UI/UX design systems, component libraries & wireframes' },
    { name: 'Higgsfield AI', desc: 'Cinematic AI video models, camera physics & generative motion' },
    { name: 'Google Analytics (GA4)', desc: 'User flow telemetry, conversion tracking & audience funnels' },
    { name: 'Blender 3D', desc: '3D spatial product models, CGI lighting & photorealistic asset renders' }
  ];

  let selectedIdx = 0; // Default active on 01 Meta Ads Manager (1st)

  // Map snake node visual order (1: Meta, 2: Ps, 3: Ai, 4: Figma, 5: Higgs, 6: GA4, 7: Ae, 8: Blender)
  // to software list order (0: Meta, 1: Ps, 2: Ai, 3: Ae, 4: Figma, 5: Higgs, 6: GA4, 7: Blender)
  // In our markup:
  // Node 1 = Meta (index 0)
  // Node 2 = Ps (index 1)
  // Node 3 = Ai (index 2)
  // Node 4 = Figma (index 4 in software list)
  // Node 5 = Higgs (index 5 in software list)
  // Node 6 = GA4 (index 6 in software list)
  // Node 7 = Ae (index 3 in software list)
  // Node 8 = Blender (index 7 in software list)

  const nodeToSoftwareMap = [0, 1, 2, 4, 5, 6, 3, 7];
  const softwareToNodeMap = [0, 1, 2, 6, 3, 4, 5, 7];

  const activateSoftware = (softIdx, isExplicitSelection = false) => {
    if (softIdx < 0 || softIdx >= toolDetails.length) return;
    const detail = toolDetails[softIdx];
    if (!detail) return;

    if (isExplicitSelection) {
      selectedIdx = softIdx;
    }

    const correspondingNodeIdx = softwareToNodeMap[softIdx];

    // 1. Update all snake nodes
    snakeNodes.forEach((node, nIdx) => {
      if (nIdx === correspondingNodeIdx) {
        node.classList.add('is-active');
        node.setAttribute('aria-selected', 'true');
      } else {
        node.classList.remove('is-active');
        node.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Update all software rows
    softwareRows.forEach((row, sIdx) => {
      if (sIdx === softIdx) {
        row.classList.add('is-active');
        row.setAttribute('aria-selected', 'true');
      } else {
        row.classList.remove('is-active');
        row.setAttribute('aria-selected', 'false');
      }
    });

    // 3. Update footer note with high clarity
    footerNote.innerHTML = `<strong>${detail.name}:</strong> ${detail.desc}`;
  };

  // Wire up touch & click on each Snake Node
  snakeNodes.forEach((node, nodeIdx) => {
    const softIdx = nodeToSoftwareMap[nodeIdx] ?? nodeIdx;
    const detail = toolDetails[softIdx];

    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', detail?.name || 'Software Tool');

    // Instant touch & tap handler
    const handleTouchOrClick = (e) => {
      activateSoftware(softIdx, true);
    };

    node.addEventListener('click', handleTouchOrClick);
    node.addEventListener('touchstart', handleTouchOrClick, { passive: true });

    // Keyboard support (Enter / Space)
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSoftware(softIdx, true);
      }
    });

    // Desktop hover preview
    node.addEventListener('mouseenter', () => {
      activateSoftware(softIdx, false);
    });

    node.addEventListener('mouseleave', () => {
      activateSoftware(selectedIdx, false);
    });
  });

  // Wire up touch & click on each Software Row (Right Column)
  softwareRows.forEach((row, softIdx) => {
    const detail = toolDetails[softIdx];

    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', detail?.name || 'Software Tool');

    const handleTouchOrClick = (e) => {
      activateSoftware(softIdx, true);
    };

    row.addEventListener('click', handleTouchOrClick);
    row.addEventListener('touchstart', handleTouchOrClick, { passive: true });

    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSoftware(softIdx, true);
      }
    });

    row.addEventListener('mouseenter', () => {
      activateSoftware(softIdx, false);
    });

    row.addEventListener('mouseleave', () => {
      activateSoftware(selectedIdx, false);
    });
  });

  // Initialize with Meta Ads (1st) active
  activateSoftware(0, true);
}
