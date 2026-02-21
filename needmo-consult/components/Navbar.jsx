'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeSection, setActive]    = useState('hero');

  /* typed text state */
  const typedRef    = useRef(null);
  const words       = ['More.', 'Growth.', 'Results.', 'More.'];
  const wIdxRef     = useRef(0);
  const cIdxRef     = useRef(0);
  const deletingRef = useRef(false);
  const timerRef    = useRef(null);

  useEffect(() => {
    /* scroll state */
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    /* active section highlight */
    const sections = document.querySelectorAll('section[id]');
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => secObs.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      secObs.disconnect();
    };
  }, []);

  /* typed text effect */
  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    function loop() {
      const word    = words[wIdxRef.current];
      const display = deletingRef.current
        ? word.slice(0, cIdxRef.current--)
        : word.slice(0, cIdxRef.current++);
      el.textContent = display;
      let delay = deletingRef.current ? 60 : 110;
      if (!deletingRef.current && cIdxRef.current > word.length) {
        delay = 1600; deletingRef.current = true;
      } else if (deletingRef.current && cIdxRef.current < 0) {
        deletingRef.current = false; cIdxRef.current = 0;
        wIdxRef.current = (wIdxRef.current + 1) % words.length; delay = 300;
      }
      timerRef.current = setTimeout(loop, delay);
    }
    timerRef.current = setTimeout(loop, 800);
    return () => clearTimeout(timerRef.current);
  }, []);

  const links = [
    { href: '#why',       label: 'Why NeedMo' },
    { href: '#services',  label: 'Services' },
    { href: '#about',     label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#pricing',   label: 'Pricing' },
    { href: '#faq',       label: 'FAQ' },
  ];

  return (
    <>
      {/* ─── MOBILE NAV ─── */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} id="mobileNav">
        <span className="mobile-close" onClick={() => setMobileOpen(false)}>✕</span>
        <a href="#hero" onClick={() => setMobileOpen(false)} style={{ marginBottom: '8px' }}>
          <Image src="/NeedMo_Logo.png" alt="NeedMo Consult" width={120} height={40}
            style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }} />
        </a>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="btn-primary" onClick={() => setMobileOpen(false)}>Book a Call →</a>
      </div>

      {/* ─── DESKTOP NAV ─── */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="logo">
          <Image src="/NeedMo_Logo.png" alt="NeedMo Consult" width={160} height={54}
            className="logo-img" priority />
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={activeSection === l.href.slice(1) ? 'active' : ''}>
                {l.label}
              </a>
            </li>
          ))}
          <li><a href="#contact" className="nav-cta">Book a Call →</a></li>
        </ul>
        <div className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* Typed text target is rendered here, read by ClientInit */}
      {/* Hidden span injected into hero via Hero.jsx using this ref pattern via data attr */}
    </>
  );
}
