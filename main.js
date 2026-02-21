/* ═══════════════════════════════════════════════
   NEEDMO CONSULT — main.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Safety net: CSS hides [data-reveal] only when JS is confirmed loaded ──
  document.documentElement.classList.add('js-loaded');


  /* ─────────────────────────────────────────────
     1. CUSTOM CURSOR (guarded — won't crash if elements missing)
  ───────────────────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactives = document.querySelectorAll('a, button, .why-card, .service-card, .case-card, .testi-card, .value-item, .pf-tab, .faq-q');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  /* ─────────────────────────────────────────────
     2. SCROLL PROGRESS BAR
  ───────────────────────────────────────────── */
  const scrollBar = document.getElementById('scroll-bar');

  function updateScrollProgress() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / maxScroll * 100).toFixed(2) + '%';
    document.documentElement.style.setProperty('--scroll-progress', pct);
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  /* ─────────────────────────────────────────────
     3. NAV SCROLL BEHAVIOUR
  ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Active nav link highlight based on section
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* ─────────────────────────────────────────────
     4. HAMBURGER / MOBILE NAV
  ───────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  document.getElementById('mobileClose').addEventListener('click', closeMobile);

  function closeMobile() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }
  window.closeMobile = closeMobile;

  // Close on outside click
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) closeMobile();
  });


  /* ─────────────────────────────────────────────
     5. SCROLL REVEAL — IntersectionObserver
     Supports data-reveal direction variants,
     data-delay, and data-dur
  ───────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold:  0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────────
     6. ANIMATED COUNTERS
     Usage: <span data-counter="312" data-suffix="%">0</span>
  ───────────────────────────────────────────── */
  function animateCounter(el) {
    const target  = parseFloat(el.dataset.counter);
    const suffix  = el.dataset.suffix  || '';
    const prefix  = el.dataset.prefix  || '';
    const decimal = el.dataset.decimal || 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = (target * ease).toFixed(decimal);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });


  /* ─────────────────────────────────────────────
     7. TYPED TEXT EFFECT
     Usage: <span id="typed-text" data-words='["word1","word2"]'></span>
  ───────────────────────────────────────────── */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words   = JSON.parse(typedEl.dataset.words || '[]');
    let wIdx = 0, cIdx = 0, deleting = false;

    // Insert cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typed-cursor';
    typedEl.insertAdjacentElement('afterend', cursorSpan);

    function typeLoop() {
      const word    = words[wIdx];
      const display = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
      typedEl.textContent = display;

      let delay = deleting ? 60 : 110;

      if (!deleting && cIdx > word.length) {
        delay = 1600; // pause at full word
        deleting = true;
      } else if (deleting && cIdx < 0) {
        deleting = false;
        cIdx = 0;
        wIdx = (wIdx + 1) % words.length;
        delay = 300;
      }
      setTimeout(typeLoop, delay);
    }
    setTimeout(typeLoop, 800);
  }


  /* ─────────────────────────────────────────────
     8. HERO GROWTH BARS — trigger on scroll into view
  ───────────────────────────────────────────── */
  const growthFills = document.querySelectorAll('.growth-fill');

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger each bar
        growthFills.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 220);
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroCard = document.querySelector('.hero-card-main');
  if (heroCard) barObserver.observe(heroCard);


  /* ─────────────────────────────────────────────
     9. PARALLAX — hero bg image + hero bg shape
  ───────────────────────────────────────────── */
  const heroBgImg    = document.getElementById('heroBgImg');
  const heroBgShape  = document.querySelector('.hero-bg-shape');
  const heroGridLines = document.querySelector('.hero-grid-lines');
  const heroSection  = document.getElementById('hero');

  function onScroll() {
    const scrollY = window.scrollY;

    // Only run parallax while hero is visible
    if (heroBgImg && scrollY < window.innerHeight * 1.5) {
      // Image moves slower than scroll = parallax depth
      heroBgImg.style.transform = `translateY(${scrollY * 0.35}px)`;
    }
    if (heroBgShape)    heroBgShape.style.transform    = `translateY(${scrollY * 0.18}px)`;
    if (heroGridLines)  heroGridLines.style.transform   = `translateY(${scrollY * 0.06}px)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─────────────────────────────────────────────
     9b. SERVICE IMAGE SUBTLE MOUSE PARALLAX
  ───────────────────────────────────────────── */
  document.querySelectorAll('.sc-img-wrap, .sc-visual-panel').forEach(wrap => {
    const img = wrap.querySelector('.sc-img, .sc-panel-img');
    if (!img) return;

    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 → 0.5
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      img.style.transform = `scale(1.07) translate(${cx * 14}px, ${cy * 10}px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });


  /* ─────────────────────────────────────────────
     10. FAQ ACCORDION
  ───────────────────────────────────────────── */
  window.toggleFaq = function(el) {
    const item   = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };


  /* ─────────────────────────────────────────────
     11. PORTFOLIO FILTER
  ───────────────────────────────────────────── */
  window.filterPortfolio = function(cat, btn) {
    document.querySelectorAll('.pf-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.case-card');
    cards.forEach(card => {
      const cats = card.dataset.cat || '';
      const show = cat === 'all' || cats.includes(cat);

      if (show) {
        card.classList.remove('hidden');
        // Re-trigger reveal for newly shown cards
        card.style.opacity = '';
        card.style.transform = '';
      } else {
        card.classList.add('hidden');
      }
    });

    // Re-layout: update wide card span on filter
    const visibleCards = [...cards].filter(c => !c.classList.contains('hidden'));
    visibleCards.forEach((c, i) => {
      if (c.classList.contains('wide')) {
        c.style.gridColumn = visibleCards.length > 1 ? 'span 2' : 'span 1';
      }
    });
  };


  /* ─────────────────────────────────────────────
     12. CONTACT FORM
  ───────────────────────────────────────────── */
  window.handleSubmit = function(e) {
    e.preventDefault();
    const btn     = e.target.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');

    // Loading state
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      btn.style.opacity = '1';
      success.style.display = 'block';
      e.target.reset();

      setTimeout(() => {
        btn.textContent = 'Book My Free Strategy Call →';
        btn.style.background = '';
        btn.disabled = false;
        success.style.display = 'none';
      }, 4000);
    }, 900);
  };


  /* ─────────────────────────────────────────────
     13. STAGGERED CARD REVEALS
     Cards inside grids get auto-staggered delays
  ───────────────────────────────────────────── */
  const staggerGroups = document.querySelectorAll('.why-grid, .services-grid, .pricing-grid, .testimonials-grid, .portfolio-grid');

  staggerGroups.forEach(group => {
    [...group.children].forEach((child, i) => {
      if (!child.hasAttribute('data-delay')) {
        child.setAttribute('data-delay', String(Math.min(i, 7)));
      }
    });
  });


  /* ─────────────────────────────────────────────
     14. SMOOTH SCROLL for all anchor links
  ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobile();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  /* ─────────────────────────────────────────────
     15. BACK-TO-TOP button (auto-injects)
  ───────────────────────────────────────────── */
  const topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '↑';
  topBtn.style.cssText = `
    position: fixed;
    bottom: 32px; right: 32px;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    border: none;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    z-index: 900;
    box-shadow: 0 6px 20px rgba(255,107,53,0.4);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.3s, transform 0.3s, background 0.2s;
    display: flex; align-items: center; justify-content: center;
  `;
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  topBtn.addEventListener('mouseenter', () => topBtn.style.background = 'var(--orange-dark)');
  topBtn.addEventListener('mouseleave', () => topBtn.style.background = 'var(--orange)');

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    topBtn.style.opacity   = show ? '1' : '0';
    topBtn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
  }, { passive: true });


  /* ═══════════════════════════════════════════════════════════════
     16. TIME-BASED THEME ENGINE
     —————————————————————————————————————————————————————————————
     • Reads the user's local clock via the Intl timezone API
     • Day   = 06:00 – 18:59  →  light mode
     • Night = 19:00 – 05:59  →  dark mode
     • Checks every 60 s so the switch happens automatically
     • Preference can be overridden by clicking the ☀/🌙 toggle
     • Override is saved to localStorage and expires at midnight
       so the auto-schedule resumes the next day
  ═══════════════════════════════════════════════════════════════ */
  const STORAGE_KEY  = 'nm-theme-override';   // { mode, expires }
  const DAY_START    = 6;    // 06:00
  const NIGHT_START  = 19;   // 19:00

  // —— helpers ——————————————————————————————————————————————
  function isDay() {
    const h = new Date().getHours();
    return h >= DAY_START && h < NIGHT_START;
  }

  function midnightTimestamp() {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d.getTime();
  }

  function getOverride() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (Date.now() > obj.expires) { localStorage.removeItem(STORAGE_KEY); return null; }
      return obj.mode;   // 'light' | 'dark'
    } catch { return null; }
  }

  function saveOverride(mode) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, expires: midnightTimestamp() }));
  }

  // —— apply theme ——————————————————————————————————————————
  function applyTheme(mode, animate) {
    if (!animate) document.documentElement.style.setProperty('--theme-speed', '0ms');

    if (mode === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }

    updateToggleBtn(mode);

    if (!animate) {
      // re-enable after one frame
      requestAnimationFrame(() =>
        document.documentElement.style.removeProperty('--theme-speed')
      );
    }
  }

  // —— decide which theme to show ———————————————————————————
  function decideTheme() {
    const override = getOverride();
    return override ?? (isDay() ? 'light' : 'dark');
  }

  // —— toggle button ————————————————————————————————————————
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
  toggleBtn.innerHTML = `
    <span class="tt-icon tt-sun">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    </span>
    <span class="tt-icon tt-moon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </span>
    <span class="tt-label"></span>`;

  Object.assign(toggleBtn.style, {
    position:       'fixed',
    bottom:         '90px',
    right:          '24px',
    zIndex:         '9998',
    display:        'flex',
    alignItems:     'center',
    gap:            '7px',
    padding:        '9px 15px 9px 12px',
    border:         'none',
    borderRadius:   '100px',
    cursor:         'pointer',
    fontFamily:     'var(--font-head)',
    fontSize:       '0.72rem',
    fontWeight:     '700',
    letterSpacing:  '0.5px',
    textTransform:  'uppercase',
    boxShadow:      '0 4px 20px rgba(0,0,0,0.25)',
    transition:     'transform 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
  });

  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.transform  = 'translateY(-2px)';
    toggleBtn.style.boxShadow  = '0 8px 28px rgba(0,0,0,0.3)';
  });
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.transform  = 'translateY(0)';
    toggleBtn.style.boxShadow  = '0 4px 20px rgba(0,0,0,0.25)';
  });

  function updateToggleBtn(mode) {
    const isLight = mode === 'light';
    toggleBtn.querySelector('.tt-label').textContent = isLight ? 'Dark Mode' : 'Light Mode';
    toggleBtn.style.background = isLight ? '#1A2332'  : '#ffffff';
    toggleBtn.style.color      = isLight ? '#ffffff'  : '#1A2332';

    // show correct icon
    toggleBtn.querySelector('.tt-sun').style.display  = isLight ? 'none'         : 'flex';
    toggleBtn.querySelector('.tt-moon').style.display = isLight ? 'flex'         : 'none';
  }

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
    const next    = current === 'light' ? 'dark' : 'light';
    saveOverride(next);
    applyTheme(next, true);

    // brief spin animation on click
    toggleBtn.style.transform = 'scale(0.9) rotate(15deg)';
    setTimeout(() => toggleBtn.style.transform = '', 200);
  });

  // —— inject icon display style ————————————————————————————
  const ttStyle = document.createElement('style');
  ttStyle.textContent = `
    #theme-toggle .tt-icon { display: flex; align-items: center; }
    #theme-toggle .tt-sun  { display: none; }
    #theme-toggle .tt-moon { display: flex; }

    /* Tooltip showing auto-schedule info */
    #theme-toggle::before {
      content: attr(data-tip);
      position: absolute;
      right: calc(100% + 10px);
      top: 50%; transform: translateY(-50%);
      background: var(--bg-card);
      color: var(--text);
      border: 1px solid var(--border-col);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.7rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      font-family: var(--font-body);
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    }
    #theme-toggle:hover::before { opacity: 1; }
  `;
  document.head.appendChild(ttStyle);

  // —— set tooltip ——————————————————————————————————————————
  function updateTooltip() {
    const h = new Date().getHours();
    const override = getOverride();
    if (override) {
      toggleBtn.setAttribute('data-tip', '⚡ Manual override — resets at midnight');
    } else if (isDay()) {
      toggleBtn.setAttribute('data-tip', `☀️ Auto light mode (day: ${DAY_START}:00–${NIGHT_START}:00)`);
    } else {
      toggleBtn.setAttribute('data-tip', `🌙 Auto dark mode (night: ${NIGHT_START}:00–${DAY_START+24}:00)`);
    }
  }

  // —— initialise & schedule ————————————————————————————————
  // Apply immediately with NO animation (avoid flash on load)
  applyTheme(decideTheme(), false);
  updateTooltip();

  // Re-check every 60 seconds
  setInterval(() => {
    // Only auto-switch if no manual override is active
    if (!getOverride()) {
      applyTheme(decideTheme(), true);
    }
    updateTooltip();
  }, 60_000);

});
