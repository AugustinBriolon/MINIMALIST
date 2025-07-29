import React from 'react';

export default function WhoWeAre() {
  return (
    <section className="relative flex h-dvh items-center justify-center bg-white px-4 py-16">
      <div className="absolute inset-0 flex flex-col items-center justify-center md:flex-row">
        <div className="aspect-square h-full w-auto rounded-full border border-black/10 md:h-auto md:w-full"></div>
        <div className="h-px w-full origin-top bg-black/10 md:block md:h-full md:w-px"></div>
        <div className="aspect-square h-full w-auto rounded-full border border-black/10 md:h-auto md:w-full"></div>
      </div>

      <div className="z-10 mx-auto flex flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-lg text-orange-500">[ WHO WE ARE? ]</h2>
        <p className="px-6 text-4xl md:px-24">
          We are a team of skincare enthusiasts dedicated to crafting products that redefine beauty
          standards. Committed to innovation and quality, we blend science with nature to create
          skincare solutions that nourish and transform.
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 md:text-base">WELCOME TO OUR SKINCARE</p>
          <p className="text-sm font-medium text-gray-500 md:text-base">JOURNEY.</p>
        </div>
      </div>
    </section>
  );
}
