import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Ingredients from '@/components/layout/Ingredients';
import Performance from '@/components/layout/Performance';
import WhatInside from '@/components/layout/WhatInsid';
import WhatSpecial from '@/components/layout/WhatSpecial';
import WhereToBuy from '@/components/layout/WhereToBuy';
import WhoWeAre from '@/components/layout/WhoWeAre';

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Performance />
      <WhatInside />
      <Ingredients />
      {/* <Ingredientss /> */}
      <WhatSpecial />
      <WhereToBuy />
      <Footer />
    </>
  );
}
