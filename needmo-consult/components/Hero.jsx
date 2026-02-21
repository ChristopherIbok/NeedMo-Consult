'use client';

import { useEffect, useRef } from 'react';

const words = ['More.', 'Growth.', 'Results.', 'More.'];

const platforms = [
  { icon: 'fa-brands fa-instagram', label: 'Instagram',  color: '#e1306c' },
  { icon: 'fa-brands fa-facebook-f',label: 'Facebook',   color: '#4267b2' },
  { icon: 'fa-brands fa-tiktok',    label: 'TikTok',     color: '#69c9d0' },
  { icon: 'fa-brands fa-linkedin-in',label: 'LinkedIn',  color: '#0077b5' },
  { icon: 'fa-brands fa-x-twitter', label: 'Twitter/X',  color: '#e7e7e7' },
  { icon: 'fa-brands fa-youtube',   label: 'YouTube',    color: '#ff0000' },
];

const bars = [
  { label: 'Engagement Rate',    pct: 78,  suffix: '+78%' },
  { label: 'Reach & Impressions',pct: 92,  suffix: '+92%' },
  { label: 'Lead Generation',    pct: 65,  suffix: '+65%' },
];

export default function Hero() {
  const typedRef  = useRef(null);
  const wIdx      = useRef(0);
  const cIdx      = useRef(0);
  const deleting  = useRef(false);
  const timer     = useRef(null);

  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    function loop() {
      const word    = words[wIdx.current];
      const display = deleting.current ? word.slice(0, cIdx.current--) : word.slice(0, cIdx.current++);
      el.textContent = display;
      let delay = deleting.current ? 60 : 110;
      if (!deleting.current && cIdx.current > word.length) {
        delay = 1600; deleting.current = true;
      } else if (deleting.current && cIdx.current < 0) {
        deleting.current = false; cIdx.current = 0;
        wIdx.current = (wIdx.current + 1) % words.length; delay = 300;
      }
      timer.current = setTimeout(loop, delay);
    }
    timer.current = setTimeout(loop, 800);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <section id="hero">
      {/* 📷 HERO BG — Replace URL with your own (1920×1080 recommended) */}
      <div className="hero-bg-img" id="heroBgImg"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1920&q=80')` }} />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-shape" />
      <div className="hero-grid-lines" />

      <div className="hero-inner hero-z">

        {/* ── LEFT: copy ── */}
        <div className="hero-content">
          <div className="hero-badge">Social Media Agency</div>

          <h1 className="hero-h1">
            Your Brand<br />Deserves{' '}
            <span className="line-orange">
              <span className="underline-box">
                <span ref={typedRef} id="typed-text" />
                <span className="typed-cursor" />
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            NEEDMO CONSULT helps businesses, creators, and brands turn their online presence
            into real growth — with content that performs, strategies that work, and results you can measure.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Book a Free Strategy Call
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#services" className="btn-ghost">See Our Services</a>
          </div>

          <div className="hero-stats">
            {[
              { num: '50+', label: 'Brands Grown' },
              { num: '3×',  label: 'Avg. Engagement Lift' },
              { num: '98%', label: 'Client Retention' },
            ].map(s => (
              <div key={s.label} className="stat">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: visual card ── */}
        <div className="hero-visual">
          <div className="hero-card-main">
            <div className="card-label">Platforms We Manage</div>
            <div className="platforms-grid">
              {platforms.map(p => (
                <div key={p.label} className="platform-chip">
                  <i className={`${p.icon} picon`} style={{ color: p.color }} />
                  {p.label}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              {bars.map(b => (
                <div key={b.label}>
                  <div className="growth-bar-label">
                    <span>{b.label}</span><span>{b.suffix}</span>
                  </div>
                  <div className="growth-track">
                    <div className="growth-fill" style={{ '--target-w': `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <div className="hero-card-float float-1">
            <div>
              <span className="val">+2.4K</span>
              <span>New followers this week</span>
            </div>
          </div>
          <div className="hero-card-float float-2">
            <div className="float-avatar">🚀</div>
            <div style={{ fontSize: '0.78rem' }}>
              <strong style={{ display: 'block' }}>Campaign Live</strong>
              <span style={{ opacity: 0.7 }}>Reaching 42K users</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
