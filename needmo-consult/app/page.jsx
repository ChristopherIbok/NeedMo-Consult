import Navbar    from '@/components/Navbar';
import Hero      from '@/components/Hero';
import Why       from '@/components/Why';
import Services  from '@/components/Services';
import About     from '@/components/About';
import Pricing   from '@/components/Pricing';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FAQ       from '@/components/FAQ';
import Contact   from '@/components/Contact';
import Footer    from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Why />
        <Services />
        <About />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
