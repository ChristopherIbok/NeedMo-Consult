import Image from 'next/image';

const socials = [
  { icon: 'fa-brands fa-instagram',  title: 'Instagram', href: '#' },
  { icon: 'fa-brands fa-facebook-f', title: 'Facebook',  href: '#' },
  { icon: 'fa-brands fa-tiktok',     title: 'TikTok',    href: '#' },
  { icon: 'fa-brands fa-linkedin-in',title: 'LinkedIn',  href: '#' },
  { icon: 'fa-brands fa-x-twitter',  title: 'X/Twitter', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">

          <div className="footer-brand">
            <a href="#hero" className="logo">
              <Image src="/NeedMo_Logo.png" alt="NeedMo Consult" width={140} height={48}
                className="logo-img logo-img--footer" />
            </a>
            <p>
              A results-driven social media agency helping businesses, creators, and brands
              turn their online presence into real, measurable growth.
            </p>
            <div className="social-links">
              {socials.map(s => (
                <a key={s.title} href={s.href} className="social-link" title={s.title} aria-label={s.title}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              {['Content Creation','Account Management','Paid Advertising','Strategy & Consulting'].map(l => (
                <li key={l}><a href="#services">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get Started</h4>
            <ul className="footer-links">
              <li><a href="#contact">Book a Strategy Call</a></li>
              <li><a href="mailto:hello@needmoconsult.com">hello@needmoconsult.com</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {year} NeedMo Consult. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
