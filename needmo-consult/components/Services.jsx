const services = [
  {
    featured: true,
    tag: 'Most Popular',
    icon: 'fa-solid fa-pen-nib',
    iconCls: 'icon-write',
    title: 'Content Creation',
    // 📷 Replace with your own content/portfolio photo (800×600 recommended)
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    imgAlt: 'Content Creation',
    stat: { val: '+78%', label: 'Avg. Engagement Lift' },
    body: 'We create scroll-stopping content — graphics, reels, captions, and stories — designed for your brand voice and optimized for every platform.',
    items: ['Custom graphic design & video editing', 'Copywriting with brand voice alignment', 'Hashtag research and strategy', 'Monthly content calendar'],
    delay: 0,
  },
  {
    icon: 'fa-solid fa-calendar-check',
    iconCls: 'icon-bounce',
    title: 'Account Management',
    // 📷 Replace with your team / workspace photo (700×400 recommended)
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    imgAlt: 'Account Management',
    body: 'We manage your social profiles end-to-end so you can focus on running your business. Posting, engagement, and reporting — all handled.',
    items: ['Scheduled posting (daily/weekly)', 'Comment and DM monitoring', 'Community engagement', 'Monthly performance reports'],
    delay: 1,
  },
  {
    icon: 'fa-solid fa-chart-line',
    iconCls: 'icon-rise',
    title: 'Paid Advertising',
    // 📷 Replace with your ads / analytics photo (700×400 recommended)
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    imgAlt: 'Paid Advertising',
    body: 'We run targeted ad campaigns on Facebook, Instagram, TikTok, and LinkedIn — turning your budget into measurable growth and real leads.',
    items: ['Campaign strategy & audience targeting', 'Ad creative and copywriting', 'A/B testing and optimization', 'Detailed performance tracking'],
    delay: 2,
  },
  {
    icon: 'fa-solid fa-chess',
    iconCls: 'icon-chess',
    title: 'Strategy & Consulting',
    // 📷 Replace with your strategy / meeting photo (700×400 recommended)
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80',
    imgAlt: 'Strategy & Consulting',
    body: "Not sure where to start? We audit your current presence and build a clear roadmap aligned with your business goals and audience.",
    items: ['Social media audit', 'Competitor analysis', 'Platform recommendations', 'Custom content strategy'],
    delay: 3,
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="section-inner">
        <div className="services-header">
          <div data-reveal="left" data-dur="normal">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title">Everything Your Brand Needs<br />to Win on Social.</h2>
          </div>
          <a href="#contact" className="btn-primary" data-reveal="right" data-dur="normal">
            Get Started →
          </a>
        </div>

        <div className="services-grid">
          {services.map((s) =>
            s.featured ? (
              /* ── Featured wide card ── */
              <div key={s.title} className="service-card featured-svc"
                data-reveal="up" data-delay={s.delay} data-dur="normal">
                <div className="sc-visual-panel">
                  <img src={s.img} alt={s.imgAlt} className="sc-panel-img" loading="lazy" />
                  <div className="sc-panel-overlay" />
                  <div className="sc-placeholder-label">
                    <i className="fa-solid fa-camera" /> Your Photo Here
                  </div>
                  <div className="sc-panel-badge">
                    <i className={`${s.icon} ${s.iconCls}`} />
                  </div>
                  <div className="sc-panel-stat">
                    <span style={{ fontFamily:'var(--font-head)', fontWeight:900, fontSize:'1.5rem', color:'var(--orange)' }}>
                      {s.stat.val}
                    </span>
                    <span style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.7)', display:'block', marginTop:'2px' }}>
                      {s.stat.label}
                    </span>
                  </div>
                </div>
                <div className="sc-body">
                  <div className="service-tag">{s.tag}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="service-includes">
                    {s.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              /* ── Standard cards ── */
              <div key={s.title} className="service-card"
                data-reveal="up" data-delay={s.delay} data-dur="normal">
                <div className="sc-img-wrap">
                  <img src={s.img} alt={s.imgAlt} className="sc-img" loading="lazy" />
                  <div className="sc-img-overlay" />
                  <div className="sc-placeholder-label">
                    <i className="fa-solid fa-camera" /> Your Photo Here
                  </div>
                </div>
                <div className="sc-body">
                  <div className="sc-icon-badge">
                    <i className={`${s.icon} ${s.iconCls}`} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="service-includes">
                    {s.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
