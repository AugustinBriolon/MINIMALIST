import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import React, { useRef, useState } from 'react';

export default function Ingredientss() {
  const [index, setIndex] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const spanIndexRef = useRef<HTMLSpanElement>(null);
  const performanceData = [
    {
      title: '[HYALURONIC ACID]',
      img: '/images/performances/hyaluronan.svg',
      stats: '40%',
      text: 'Increase in skin hydration levels',
    },
    {
      title: '[VITAMIN C]',
      img: '/images/performances/vitamin-c.svg',
      stats: '25%',
      text: 'Reduction in hyperpigmentation',
    },
    {
      title: '[PEPTIDES]',
      img: '/images/performances/peptides.svg',
      stats: '50%',
      text: 'Increase in collagen production',
    },
    {
      title: '[NIACINAMIDE]',
      img: '/images/performances/niacinamide.svg',
      stats: '40%',
      text: 'Reduction in pore size',
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col overflow-hidden md:flex-row"
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          preload="metadata"
          style={{ willChange: 'auto' }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/water-drop.webm" type="video/webm" />
          <source src="/videos/water-drop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="z-10 flex w-full flex-col items-start justify-between gap-6 py-4 pl-4 sm:gap-8 sm:py-6 sm:pl-6 md:w-1/2 md:py-8 md:pl-8 lg:py-16 lg:pl-16 xl:py-32 xl:pl-32">
        <div className="flex flex-col gap-4 text-white sm:gap-6 lg:gap-8">
          <h2 className="fade-in-title text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Scientifically Proven Ingredients
          </h2>
          <p className="fade-in-text text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl">
            Unlock the potential of our formulations with scientifically proven ingredients
          </p>
        </div>

        {/* Indicateur de progression responsive */}
        <div
          ref={indicatorRef}
          className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8"
        >
          <NumberFlow
            className="font-bold text-white"
            value={index}
            format={{
              minimumIntegerDigits: 2,
            }}
          />
          <div className="relative flex gap-2 sm:gap-3">
            <span
              ref={spanIndexRef}
              className="absolute top-0 h-4 w-0.5 transform rounded-full bg-white sm:h-5 lg:h-6"
            ></span>
            {performanceData.map((_, index) => (
              <span key={index} className="h-4 w-0.5 rounded-full bg-white/50 sm:h-5 lg:h-6"></span>
            ))}
          </div>
          <p className="text-sm font-medium text-white sm:text-base lg:text-lg">
            0{performanceData.length}
          </p>
        </div>
      </div>
    </section>
  );
}
