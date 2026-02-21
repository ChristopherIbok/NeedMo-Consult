'use client';

import { useEffect } from 'react';

/* ─── tiny helpers ─── */
const DAY_START   = 6;
const NIGHT_START = 19;

function isDay() {
  const h = new Date().getHours();
  return h >= DAY_START && h < NIGHT_START;
}
function midnightTs() {
  const d = new Date(); d.setHours(24, 0, 0, 0); return d.getTime();
}
function getOverride() {
  try {
    const raw = localStorage.getItem('nm-theme-override');
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (Date.now() > obj.expires) { localStorage.removeItem('nm-theme-override'); return null; }
    return obj.mode;
  } catch { return null; }
}
function saveOverride(mode) {
  localStorage.setItem('nm-theme-override', JSON.stringify({ mode, expires: midnightTs() }));
}
function decideTheme() {
  return getOverride() ?? (isDay() ? 'light' : 'dark');
}
function applyTheme(mode) {
  if (mode === 'light') document.documentElement.classList.add('light-mode');
  else document.documentElement.classList.remove('light-mode');
}

export default function ClientInit() {
  useEffect(() => {
    /* ══════════════════════════════════════════
       0. JS-LOADED FLAG
    ══════════════════════════════════════════ */
    document.documentElement.classList.add('js-loaded');

    /* ══════════════════════════════════════════
       1. THEME — apply immediately (no flash)
    ══════════════════════════════════════════ */
    applyTheme(decideTheme());

    /* ══════════════════════════════════════════
       2. CUSTOM CURSOR
    ══════════════════════════════════════════ */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring) {
      let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
      let rafId;

      const onMove = (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
      };
      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        rafId = requestAnimationFrame(animateRing);
      };
      document.addEventListener('mousemove', onMove);
      animateRing();

      const targets = document.querySelectorAll(
        'a, button, .why-card, .service-card, .case-card, .testi-card, .value-item, .pf-tab, .faq-q'
      );
      const addHover    = () => document.body.classList.add('cursor-hover');
      const removeHover = () => document.body.classList.remove('cursor-hover');
      targets.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });

      return () => {
        document.removeEventListener('mousemove', onMove);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       3. SCROLL PROGRESS BAR
    ══════════════════════════════════════════ */
    const bar = document.getElementById('scroll-bar');
    const updateBar = () => {
      if (!bar) return;
      const pct = ((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100).toFixed(2) + '%';
      document.documentElement.style.setProperty('--scroll-progress', pct);
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    return () => window.removeEventListener('scroll', updateBar);
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       4. SCROLL REVEAL (IntersectionObserver)
    ══════════════════════════════════════════ */
    const revealEls = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       5. ANIMATED COUNTERS
    ══════════════════════════════════════════ */
    const counterEls = document.querySelectorAll('[data-counter]');
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counterObs.unobserve(entry.target);
        const el      = entry.target;
        const target  = parseFloat(el.dataset.counter);
        const suffix  = el.dataset.suffix  || '';
        const prefix  = el.dataset.prefix  || '';
        const decimal = parseInt(el.dataset.decimal || '0');
        const dur     = 1800;
        const start   = performance.now();
        function step(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const val  = (target * ease).toFixed(decimal);
          el.textContent = prefix + val + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObs.observe(el));
    return () => counterObs.disconnect();
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       6. PARALLAX — hero bg image
    ══════════════════════════════════════════ */
    const heroBgImg    = document.getElementById('heroBgImg');
    const heroBgShape  = document.querySelector('.hero-bg-shape');
    const heroGridLines= document.querySelector('.hero-grid-lines');

    const onScroll = () => {
      const sy = window.scrollY;
      if (heroBgImg  && sy < window.innerHeight * 1.5) heroBgImg.style.transform = `translateY(${sy * 0.35}px)`;
      if (heroBgShape)  heroBgShape.style.transform   = `translateY(${sy * 0.18}px)`;
      if (heroGridLines) heroGridLines.style.transform = `translateY(${sy * 0.06}px)`;
    };

    /* Service image mouse-parallax */
    const wraps = document.querySelectorAll('.sc-img-wrap, .sc-visual-panel');
    const wrapHandlers = [];
    wraps.forEach(wrap => {
      const img = wrap.querySelector('.sc-img, .sc-panel-img');
      if (!img) return;
      const onMove = e => {
        const r  = wrap.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width  - 0.5;
        const cy = (e.clientY - r.top)  / r.height - 0.5;
        img.style.transform = `scale(1.07) translate(${cx * 14}px, ${cy * 10}px)`;
      };
      const onLeave = () => { img.style.transform = ''; };
      wrap.addEventListener('mousemove', onMove);
      wrap.addEventListener('mouseleave', onLeave);
      wrapHandlers.push({ wrap, onMove, onLeave });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      wrapHandlers.forEach(({ wrap, onMove, onLeave }) => {
        wrap.removeEventListener('mousemove', onMove);
        wrap.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       7. BACK-TO-TOP BUTTON
    ══════════════════════════════════════════ */
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>`;
    btn.setAttribute('aria-label', 'Back to top');
    Object.assign(btn.style, {
      position: 'fixed', bottom: '24px', right: '24px', zIndex: '900',
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(255,107,53,0.4)', opacity: '0',
      transform: 'translateY(12px)', transition: 'opacity 0.3s, transform 0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    });
    document.body.appendChild(btn);
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => { btn.style.background = 'var(--orange-dark)'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = 'var(--orange)'; });
    const onScroll = () => {
      const show = window.scrollY > 500;
      btn.style.opacity   = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      btn.remove();
    };
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       8. THEME TOGGLE BUTTON
    ══════════════════════════════════════════ */
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
      position: 'fixed', bottom: '90px', right: '24px', zIndex: '9998',
      display: 'flex', alignItems: 'center', gap: '7px',
      padding: '9px 15px 9px 12px', border: 'none', borderRadius: '100px',
      cursor: 'pointer', fontFamily: 'var(--font-head)',
      fontSize: '0.72rem', fontWeight: '700',
      letterSpacing: '0.5px', textTransform: 'uppercase',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
    });
    document.body.appendChild(toggleBtn);

    const updateBtn = (mode) => {
      const isLight = mode === 'light';
      const label = toggleBtn.querySelector('.tt-label');
      if (label) label.textContent = isLight ? 'Dark Mode' : 'Light Mode';
      toggleBtn.style.background = isLight ? '#1A2332' : '#ffffff';
      toggleBtn.style.color      = isLight ? '#ffffff' : '#1A2332';
      const sun  = toggleBtn.querySelector('.tt-sun');
      const moon = toggleBtn.querySelector('.tt-moon');
      if (sun)  sun.style.display  = isLight ? 'none' : 'flex';
      if (moon) moon.style.display = isLight ? 'flex' : 'none';
    };

    const currentMode = decideTheme();
    updateBtn(currentMode);

    toggleBtn.addEventListener('mouseenter', () => {
      toggleBtn.style.transform = 'translateY(-2px)';
      toggleBtn.style.boxShadow = '0 8px 28px rgba(0,0,0,0.3)';
    });
    toggleBtn.addEventListener('mouseleave', () => {
      toggleBtn.style.transform = '';
      toggleBtn.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
    });
    toggleBtn.addEventListener('click', () => {
      const cur  = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
      const next = cur === 'light' ? 'dark' : 'light';
      saveOverride(next);
      applyTheme(next);
      updateBtn(next);
      toggleBtn.style.transform = 'scale(0.9) rotate(15deg)';
      setTimeout(() => { toggleBtn.style.transform = ''; }, 200);
    });

    /* inject style for tt icons */
    const s = document.createElement('style');
    s.textContent = `
      #theme-toggle .tt-icon { display: flex; align-items: center; }
      #theme-toggle .tt-sun  { display: none; }
      #theme-toggle .tt-moon { display: flex; }
    `;
    document.head.appendChild(s);

    /* auto-check every 60 s */
    const interval = setInterval(() => {
      if (!getOverride()) { const m = decideTheme(); applyTheme(m); updateBtn(m); }
    }, 60_000);

    return () => {
      clearInterval(interval);
      toggleBtn.remove();
      s.remove();
    };
  }, []);

  useEffect(() => {
    /* ══════════════════════════════════════════
       9. HERO GROWTH BARS
    ══════════════════════════════════════════ */
    const heroCard = document.querySelector('.hero-card-main');
    if (!heroCard) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.growth-fill').forEach((bar, i) => {
            setTimeout(() => bar.classList.add('animated'), i * 220);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(heroCard);
    return () => obs.disconnect();
  }, []);

  return null;
}
