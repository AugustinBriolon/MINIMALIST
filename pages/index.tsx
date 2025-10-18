import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Ingredients from '@/components/layout/Ingredients';
import Performance from '@/components/layout/Performance';
import WhatInside from '@/components/layout/WhatInsid';
import WhatSpecial from '@/components/layout/WhatSpecia';
import WhereToBuy from '@/components/layout/WhereToBu';
import WhoWeAre from '@/components/layout/WhoWeAr';

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
