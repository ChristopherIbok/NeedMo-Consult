const testimonials = [
  {
    text: '"NEEDMO completely transformed our Instagram presence. Within 60 days we saw a 3x jump in engagement and our DMs were flooded with new inquiries. They don\'t just post — they build strategy."',
    name: 'Amara R.',
    role: 'Founder, Local Boutique',
    initials: 'AR',
    gradient: 'linear-gradient(135deg,#FF6B35,#ffaa00)',
  },
  {
    text: '"We spent months trying to figure out social media on our own. One month with NEEDMO and we finally understood why it wasn\'t working — and watched it get fixed. Worth every dollar."',
    name: 'David K.',
    role: 'CEO, Tech Startup',
    initials: 'DK',
    gradient: 'linear-gradient(135deg,#818cf8,#6366f1)',
  },
  {
    text: '"Our TikTok went from 200 to 12,000 followers in 4 months. The content quality is insane and they actually understand our brand voice. It feels like we have an in-house creative team."',
    name: 'Sofia N.',
    role: 'Content Creator & Influencer',
    initials: 'SN',
    gradient: 'linear-gradient(135deg,#4ade80,#22c55e)',
  },
];

const delays = [0, 2, 4];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="section-inner">
        <div className="testimonials-header" data-reveal="up" data-dur="normal">
          <p className="section-eyebrow">Social Proof</p>
          <h2 className="section-title">Trusted by Brands That<br />Refuse to Settle.</h2>
          <p className="section-sub">
            From local businesses to e-commerce brands and creators — here's what clients say about NEEDMO.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className="testi-card"
              data-reveal="up" data-delay={delays[i]} data-dur="normal">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: t.gradient }}>{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
