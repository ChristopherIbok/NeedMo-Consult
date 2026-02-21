'use client';

import { useState } from 'react';

/* ── Real phone images showing social media content ──────────────────
   Replace these URLs with your own screenshot photos or client content.
   Recommended: portrait phone screenshots at 200×400px.
──────────────────────────────────────────────────────────────────── */
const PHONES = [
  // Instagram / fashion content on phone
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=220&h=420&q=85',
  // TikTok / short-form content on phone
  'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=220&h=420&q=85',
  // Creator holding phone / social analytics
  'https://images.unsplash.com/photo-1512941937938-a3b14d96c9ea?auto=format&fit=crop&w=220&h=420&q=85',
];

const PHONE_PILLS = ['+312% reach', undefined, undefined];
const PHONE_ROTATIONS = ['rotate(-5deg)', 'translateY(-12px)', 'rotate(4deg)'];

const cases = [
  {
    id: 1,
    cat: 'content management',
    wide: true,
    // 📷 Card banner — real Unsplash photo of fashion / boutique
    bannerImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&h=320&q=80',
    bannerAlt: 'Fashion Boutique Social Media',
    cats:    ['Content Creation', 'Account Management'],
    client:  'Local Fashion Boutique — Instagram & TikTok',
    title:   'From Invisible to Unmissable: A Boutique\'s Social Transformation',
    desc:    'A local fashion boutique was posting inconsistently with zero engagement strategy. We rebuilt their content calendar, redesigned their visual identity, and launched a short-form video strategy — turning a dormant account into a community of loyal buyers.',
    metrics: [{ v: '312%', l: 'Reach Growth' }, { v: '4.2K', l: 'New Followers' }, { v: '68%', l: '↑ In-Store Traffic' }],
    badge:   { val: '↑ 4.2K', label: 'New Followers', color: '#4ade80' },
  },
  {
    id: 2,
    cat: 'ads',
    wide: false,
    // 📷 Card banner — skincare / e-commerce product photo
    bannerImg: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&h=280&q=80',
    bannerAlt: 'Skincare E-commerce Ads',
    cats:    ['Paid Advertising'],
    client:  'E-commerce Brand — Meta & TikTok Ads',
    title:   '8.4x ROAS on a $12K Meta Ad Budget',
    desc:    'An e-commerce skincare brand was burning budget on untargeted ads with 1.2x ROAS. We audited their funnel, rebuilt creative from scratch, and deployed a multi-stage Meta + TikTok campaign.',
    metrics: [{ v: '8.4x', l: 'ROAS' }, { v: '$101K', l: 'Revenue' }, { v: '↓64%', l: 'Cost Per Lead' }],
    statBox: { big: '8.4x', bigLabel: 'ROAS achieved', grid: [{ v: '$12K', l: 'Ad Spend', color: 'var(--text)' }, { v: '$101K', l: 'Revenue', color: '#4ade80' }] },
  },
  {
    id: 3,
    cat: 'strategy',
    wide: false,
    // 📷 Card banner — startup office / B2B tech
    bannerImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&h=280&q=80',
    bannerAlt: 'B2B SaaS LinkedIn Strategy',
    cats:    ['Strategy & Consulting'],
    client:  'B2B SaaS Startup — LinkedIn & Twitter/X',
    title:   'Zero to 50K: Building Authority for a Tech Startup',
    desc:    'A SaaS startup had a great product but zero social presence. We delivered a full audit, competitive analysis, and 90-day roadmap — building a following of 50K qualified decision-makers.',
    metrics: [{ v: '50K', l: 'Followers' }, { v: '220%', l: 'Inbound Leads' }, { v: '6mo', l: 'Timeline' }],
    badge:   { val: '0→50K', label: 'Followers in 6mo', color: '#4ade80' },
  },
  {
    id: 4,
    cat: 'management content',
    wide: false,
    // 📷 Card banner — content creator with phone
    bannerImg: 'https://images.unsplash.com/photo-1559628233-100c798642dc?auto=format&fit=crop&w=500&h=280&q=80',
    bannerAlt: 'Content Creator TikTok Growth',
    cats:    ['Content Creation', 'Account Management'],
    client:  'Lifestyle Creator — TikTok & Instagram',
    title:   '200 to 12K Followers in 4 Months Flat',
    desc:    'A lifestyle creator was posting sporadically with low traction. We built a consistent Reels + TikTok strategy aligned to trending audio and platform algorithms — turning their feed into a growth engine.',
    metrics: [{ v: '60x', l: 'Follower Growth' }, { v: '142K', l: 'Avg. Views/Reel' }],
  },
  {
    id: 5,
    cat: 'ads management',
    wide: false,
    // 📷 Card banner — restaurant / food ambiance
    bannerImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&h=280&q=80',
    bannerAlt: 'Restaurant Facebook Ads',
    cats:    ['Paid Advertising', 'Account Management'],
    client:  'Restaurant Chain — Facebook & Instagram',
    title:   'Local Restaurant Triples Monthly Bookings with Paid Social',
    desc:    'A multi-location restaurant was relying on word-of-mouth with zero digital ad spend. We launched a geo-targeted campaign, optimizing each week until reaching a 5.1x ROAS and 3x booking volume.',
    metrics: [{ v: '5.1x', l: 'ROAS' }, { v: '3x', l: 'Bookings' }, { v: '7mo', l: 'Timeline' }],
  },
];

const TABS = [
  { key: 'all',        label: 'All Work' },
  { key: 'content',   label: 'Content Creation' },
  { key: 'ads',       label: 'Paid Ads' },
  { key: 'management',label: 'Account Management' },
  { key: 'strategy',  label: 'Strategy' },
];

export default function Portfolio() {
  const [active, setActive] = useState('all');

  const visible = cases.filter(c =>
    active === 'all' || c.cat.includes(active)
  );

  return (
    <section id="portfolio">
      <div className="section-inner">

        <div data-reveal="up" data-dur="normal">
          <p className="section-eyebrow">Our Work</p>
          <h2 className="section-title">Real Results.<br />Real Clients.</h2>
          <p className="section-sub" style={{ maxWidth: '520px' }}>
            We let the numbers speak. Here's a look at what we've built for brands like yours.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="pf-tabs" data-reveal="up" data-dur="normal">
          {TABS.map(t => (
            <button key={t.key}
              className={`pf-tab${active === t.key ? ' active' : ''}`}
              onClick={() => setActive(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Case study grid */}
        <div className="portfolio-grid">
          {visible.map((c, i) => (
            <div key={c.id}
              className={`case-card${c.wide ? ' wide' : ''}`}
              data-reveal="up" data-delay={i % 3} data-dur="normal">

              {/* ── Banner ── */}
              <div className="case-banner">
                {c.wide ? (
                  /* Wide card: three real phone images */
                  <div className="case-banner-inner" style={{ background: 'linear-gradient(135deg,#1f2e42 0%,#0f1c2a 100%)' }}>
                    <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'28px 28px' }} />
                    <div style={{ position:'relative',display:'flex',gap:'14px',alignItems:'flex-end' }}>
                      {PHONES.map((src, pi) => (
                        <div key={pi} className="real-phone-frame" style={{ transform: PHONE_ROTATIONS[pi] }}>
                          <img src={src} alt={`Social media result ${pi+1}`} className="real-phone-img" loading="lazy" />
                          {PHONE_PILLS[pi] && (
                            <div className="mock-screen-pill">{PHONE_PILLS[pi]}</div>
                          )}
                        </div>
                      ))}
                      {c.badge && (
                        <div className="case-metric-bubble" style={{ top:'10px',right:'-20px' }}>
                          <span className="mbv" style={{ color: c.badge.color }}>{c.badge.val}</span>
                          <span className="mbl">{c.badge.label}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard card: real Unsplash photo as banner */
                  <div className="case-banner-photo">
                    <img src={c.bannerImg} alt={c.bannerAlt} className="case-banner-img" loading="lazy" />
                    <div className="case-banner-fade" />
                    {c.badge && (
                      <div className="case-metric-bubble" style={{ bottom:'12px',right:'12px' }}>
                        <span className="mbv" style={{ color: c.badge.color }}>{c.badge.val}</span>
                        <span className="mbl">{c.badge.label}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Body ── */}
              <div className="case-body">
                <div className="case-cats">
                  {c.cats.map(cat => <span key={cat} className="case-cat">{cat}</span>)}
                </div>
                <p className="case-client">{c.client}</p>
                <h3 className="case-title">{c.title}</h3>
                <p className="case-desc">{c.desc}</p>
                <div className="case-metrics-row">
                  {c.metrics.map(m => (
                    <div key={m.l} className="case-metric">
                      <span className="cmv">{m.v}</span>
                      <span className="cml">{m.l}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="case-link">Get similar results <span>→</span></a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="portfolio-cta-strip" data-reveal="up" data-dur="normal">
          <div className="pcs-text">
            <h3>Your brand could be our next success story.</h3>
            <p>Ready to see what a real strategy can do for your business? Let's talk.</p>
          </div>
          <a href="#contact" className="btn-primary">Book a Free Strategy Call →</a>
        </div>

      </div>
    </section>
  );
}
