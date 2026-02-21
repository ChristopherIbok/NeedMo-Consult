'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="section-inner">
        <div className="contact-inner">

          {/* ── Left: info ── */}
          <div className="contact-info">
            <div data-reveal="left" data-dur="normal">
              <p className="section-eyebrow">Contact Us</p>
              <h2 className="section-title">Let's Talk About What<br />Your Brand Needs More Of.</h2>
              <p className="section-sub" style={{ marginTop: '14px' }}>
                Whether you're starting from scratch or ready to scale, we'd love to learn about
                your goals and show you how we can help.
              </p>
            </div>

            <div className="contact-items" data-reveal="left" data-delay="2" data-dur="normal">
              <div className="contact-item">
                <div className="ci-icon"><i className="fa-solid fa-envelope" /></div>
                <div>
                  <div className="ci-label">Email</div>
                  <div className="ci-val">
                    <a href="mailto:hello@needmoconsult.com">hello@needmoconsult.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><i className="fa-solid fa-phone" /></div>
                <div>
                  <div className="ci-label">Phone</div>
                  <div className="ci-val">
                    <a href="tel:+2347068984590">+234 706 898 4590</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><i className="fa-solid fa-location-dot" /></div>
                <div>
                  <div className="ci-label">Address</div>
                  <div className="ci-val">
                    4 Utang Street, Uyo<br />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Akwa Ibom State, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact-form" data-reveal="right" data-delay="1" data-dur="normal">
            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '6px' }}>
              Book a Free Strategy Call
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '28px' }}>
              30 minutes. No pressure. Just strategy.
            </p>

            {sent ? (
              <p style={{
                textAlign: 'center', color: '#4ade80', fontWeight: 600, padding: '16px',
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: '10px',
              }}>
                ✅ Message sent! We'll be in touch within 24 hours.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@yourcompany.com" required />
                </div>
                <div className="form-group">
                  <label>Business Type</label>
                  <select>
                    <option value="">Select your business type</option>
                    <option>Local Business</option>
                    <option>E-commerce Brand</option>
                    <option>Startup / Tech Company</option>
                    <option>Content Creator / Influencer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Service of Interest</label>
                  <select>
                    <option value="">What do you need?</option>
                    <option>Content Creation</option>
                    <option>Account Management</option>
                    <option>Paid Advertising</option>
                    <option>Strategy &amp; Consulting</option>
                    <option>Full-Service Package</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tell Us About Your Goals</label>
                  <textarea placeholder="What are you hoping to achieve with social media? Any specific goals or challenges?" />
                </div>
                <button type="submit" className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '15px' }}>
                  Book My Free Strategy Call →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
