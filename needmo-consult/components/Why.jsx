const cards = [
  { icon: 'fa-solid fa-crosshairs',    cls: 'icon-target', title: 'Strategy-Led',         body: 'We build custom plans tailored to your audience, platform, and goals. Every post has a purpose — and every purpose ties to your growth.' },
  { icon: 'fa-solid fa-chart-line',    cls: 'icon-chart',  title: 'Growth-Focused',        body: 'Everything we do ties to measurable outcomes — engagement, leads, sales, and ROI. We track what matters and optimize relentlessly.' },
  { icon: 'fa-solid fa-layer-group',   cls: 'icon-layers', title: 'Full-Service',          body: 'From content creation to paid ads and account management — we handle it all so you don\'t have to. Your team without the overhead.' },
  { icon: 'fa-solid fa-magnifying-glass', cls: 'icon-search', title: 'Transparent Reporting', body: 'Clear communication, honest reporting, and no hidden fees — ever. You always know exactly what we\'re doing and why it\'s working.' },
  { icon: 'fa-solid fa-bolt-lightning', cls: 'icon-flash', title: 'Fast Execution',       body: 'We move quickly. Most clients start seeing real engagement improvements within the first 30–60 days of working together.' },
  { icon: 'fa-solid fa-brain',          cls: 'icon-think', title: 'Growth Mindset',        body: 'We stay ahead of trends, test new platforms, and evolve our strategies with the digital landscape — so you never fall behind.' },
];

const delays = [0, 1, 2, 1, 2, 3];

export default function Why() {
  return (
    <section id="why">
      <div className="section-inner">
        <div data-reveal="up" data-dur="normal">
          <p className="section-eyebrow">Why NeedMo</p>
          <h2 className="section-title">Built Different.<br />Built for Results.</h2>
          <p className="section-sub">We don't just post content. We build systems that connect, convert, and grow your brand consistently.</p>
        </div>

        <div className="why-grid">
          {cards.map((c, i) => (
            <div key={c.title} className="why-card" data-reveal="up" data-delay={delays[i]} data-dur="normal">
              <div className="why-icon">
                <i className={`${c.icon} ${c.cls}`} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
