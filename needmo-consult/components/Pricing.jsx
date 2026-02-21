const plans = [
  {
    name: 'STARTER',
    price: '₦150K',
    period: '/month',
    desc: 'Perfect for small businesses just beginning their social media journey.',
    tag: null,
    features: [
      '1 platform managed',
      '12 posts/month',
      'Basic graphic design',
      'Monthly report',
      'Email support',
    ],
    cta: 'Get Started',
    ctaCls: 'btn-full-outline',
  },
  {
    name: 'GROWTH',
    price: '₦350K',
    period: '/month',
    desc: 'Our most popular plan for businesses ready to grow fast and consistently.',
    tag: 'Most Popular',
    features: [
      '2–3 platforms managed',
      '20 posts/month',
      'Custom graphics & short-form video',
      'Paid ads management (up to ₦200K budget)',
      'Bi-weekly strategy calls',
      'Detailed analytics & reporting',
    ],
    cta: 'Start Growing',
    ctaCls: 'btn-primary',
  },
  {
    name: 'DOMINATOR',
    price: '₦750K',
    period: '/month',
    desc: 'Full-service, multi-platform powerhouse for brands ready to dominate.',
    tag: null,
    features: [
      '3–4 platforms managed',
      'Unlimited content creation',
      'Full ad campaign management',
      'Influencer outreach & collaboration',
      'Weekly strategy sessions',
      'Priority support & dedicated account manager',
    ],
    cta: 'Let\'s Dominate',
    ctaCls: 'btn-full-outline',
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="section-inner">
        <div data-reveal="up" data-dur="normal">
          <p className="section-eyebrow">Pricing</p>
          <h2 className="section-title">Simple, Transparent Pricing.<br />No Surprises.</h2>
          <p className="section-sub">
            Choose the plan that fits your goals. Every plan includes a free onboarding strategy session.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div key={p.name}
              className={`price-card${p.tag ? ' featured' : ''}`}
              data-reveal="up" data-delay={i} data-dur="normal">
              {p.tag && (
                <div className="price-badge">{p.tag}</div>
              )}
              <div className="price-name">{p.name}</div>
              <div className="price-amount">
                {p.price}<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>{p.period}</span>
              </div>
              <p className="price-desc">{p.desc}</p>
              <div className="price-divider" />
              <ul className="price-features">
                {p.features.map(f => (
                  <li key={f}><span className="check">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#contact" className={`${p.ctaCls} btn-block`}>{p.cta}</a>
            </div>
          ))}
        </div>

        <p className="pricing-note" data-reveal="up" data-dur="normal">
          All plans are billed monthly. <strong>No contracts. Cancel anytime.</strong>{' '}
          Custom enterprise plans available — <a href="#contact" style={{ color: 'var(--orange)' }}>contact us</a>.
        </p>
      </div>
    </section>
  );
}
