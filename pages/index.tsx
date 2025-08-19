import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Ingredients from '@/components/layout/Ingredients';
import Inside from '@/components/layout/Inside';
import Performance from '@/components/layout/Performance';
import Stats from '@/components/layout/Stats';
import Testimonials from '@/components/layout/Testimonials';
import WhoWeAre from '@/components/layout/WhoWeAre';

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Performance />
      <Inside />
      <Ingredients />
      <Stats />
      <Testimonials />
      <Footer />
    </>
  );
}
