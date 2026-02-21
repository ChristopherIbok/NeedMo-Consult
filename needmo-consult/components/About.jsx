const values = [
  { title: 'Results Over Vanity',     body: 'We focus on metrics that matter: leads, sales, and real engagement — not just follower counts.' },
  { title: 'Strategic Creativity',    body: 'Every piece of content is backed by strategy. Beautiful posts mean nothing without purpose.' },
  { title: 'Client Partnership',      body: "We're not just vendors. We're an extension of your team, invested in your long-term success." },
  { title: 'Transparency Always',     body: 'Clear communication, honest reporting, and no hidden fees — ever.' },
];

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-inner">

          {/* ── LEFT ── */}
          <div>
            <div data-reveal="left" data-dur="normal">
              <p className="section-eyebrow">About Us</p>
              <h2 className="section-title">Results-Driven.<br />No Excuses.</h2>
              <p className="section-sub">
                NEEDMO CONSULT is built for brands that refuse to settle. We work with small businesses,
                e-commerce brands, startups, and creators to build powerful online presences that actually convert.
              </p>
            </div>

            <div className="about-values" data-reveal="left" data-delay="2" data-dur="slow">
              {values.map(v => (
                <div key={v.title} className="value-item">
                  <div className="value-dot" />
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="about-right" data-reveal="right" data-dur="slow">

            {/* 📷 TEAM PHOTO — Replace src with your real team photo (800×500 recommended) */}
            <div className="about-team-photo">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="NeedMo Consult Team"
                className="about-team-img"
                loading="lazy"
              />
              <div className="about-team-overlay" />
              <div className="about-team-badge">
                <img src="/NeedMo_Logo.png" alt="NeedMo Consult" className="about-team-logo" />
              </div>
              <div className="sc-placeholder-label">
                <i className="fa-solid fa-camera" /> Your Team Photo
              </div>
            </div>

            <div className="about-quote-card" style={{ marginTop: '24px' }}>
              <blockquote>
                We don't believe in vanity metrics. We believe in{' '}
                <strong>strategy, creativity, and consistency</strong> — and we measure success by the
                results we deliver for every client we work with.
                <br /><br />
                Your wins are our wins. We're invested in your{' '}
                <strong>long-term success</strong> — not just the next post.
              </blockquote>
            </div>

            <div className="about-stats-row" style={{ marginTop: '16px' }}>
              <div className="about-stat">
                <div className="num" data-counter="6" data-suffix="+">0</div>
                <div className="lbl">Platforms</div>
              </div>
              <div className="about-stat">
                <div className="num">30<span style={{ fontSize: '1rem' }}>d</span></div>
                <div className="lbl">First Results</div>
              </div>
              <div className="about-stat">
                <div className="num" data-counter="0">0</div>
                <div className="lbl">Hidden Fees</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '12px', padding: '20px 22px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text)' }}>Our Mission</strong><br />
                To help every client show up online with confidence, clarity, and content that connects
                with their audience and drives real business growth.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
