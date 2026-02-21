'use client';

import { useState } from 'react';

const faqs = [
  { q: 'What platforms do you manage?',      a: 'We work across Instagram, Facebook, TikTok, LinkedIn, X (Twitter), and YouTube. We recommend the right platform mix based on your business type, audience, and goals.' },
  { q: 'How quickly will I see results?',    a: 'Most clients see engagement improvements within 30–60 days. Significant growth — followers, leads, and revenue impact — typically happens over 3–6 months of consistent strategy.' },
  { q: 'Do I need a long-term contract?',    a: 'No. We offer flexible monthly plans with no long-term commitment required. That said, we recommend at least 3 months together to see meaningful, compounding results.' },
  { q: 'Can I choose just one service?',     a: 'Absolutely. You can start with what you need most — whether that\'s content creation, ads, or just a strategy audit — and scale up as your business grows.' },
  { q: 'Will I approve content before it goes live?', a: 'Yes — always. You\'ll review and approve everything we create before it\'s published. Your brand, your voice, your final say.' },
  { q: 'Who do you typically work with?',    a: 'We work with small local businesses, e-commerce brands, startups & tech companies, and content creators or influencers who are serious about growing their online presence.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq">
      <div className="section-inner">
        <div className="faq-inner">

          <div>
            <div data-reveal="left" data-dur="normal">
              <p className="section-eyebrow">Got Questions?</p>
              <h2 className="section-title">Frequently Asked.</h2>
              <p className="section-sub">
                Everything you need to know before partnering with NEEDMO.
                If your question isn't here, just reach out.
              </p>
            </div>
            <a href="#contact" className="btn-primary"
              data-reveal="left" data-delay="2" data-dur="normal"
              style={{ marginTop: '32px', display: 'inline-flex' }}>
              Ask Us Directly →
            </a>
          </div>

          <div className="faq-list" data-reveal="right" data-delay="1" data-dur="normal">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span className="faq-icon">{open === i ? '−' : '+'}</span>
                </div>
                {open === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
