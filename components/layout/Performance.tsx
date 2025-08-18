import NumberFlow from '@number-flow/react';
import React, { useRef } from 'react';
import BlurCard from '../ui/BlurCard';
import Image from 'next/image';

export default function Performance() {
  const spanindexRef = useRef<HTMLSpanElement>(null);

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
      text: 'Reduction in poer size',
    },
  ];

  return (
    <div className="relative flex h-dvh w-full flex-col md:flex-row">
      <div className="absolute inset-0">
        <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
          <source src="/videos/water-drop.webm" type="video/webm" />
          <source src="/videos/water-drop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="z-1 flex w-full flex-col items-start justify-between gap-8 md:w-1/2 md:p-16 lg:p-32">
        <div className="flex flex-col gap-8 text-white">
          <h2 className="text-6xl">Scientifically Proven Ingredients</h2>
          <p>Unlock the potential of our formulations with scientifically proven ingredients</p>
        </div>
        <div className="flex items-center justify-center gap-8">
          <NumberFlow
            className="text-white"
            value={1}
            format={{
              minimumIntegerDigits: 2,
            }}
          />
          <div className="relative flex gap-4">
            <span ref={spanindexRef} className="absolute top-0 h-8 w-px bg-white"></span>
            <span className="h-8 w-px bg-white/50"></span>
            <span className="h-8 w-px bg-white/50"></span>
            <span className="h-8 w-px bg-white/50"></span>
            <span className="h-8 w-px bg-white/50"></span>
          </div>
          <p className="text-white">04</p>
        </div>
      </div>
      <div className="z-1 flex h-full w-full flex-col items-end justify-end gap-8 md:w-1/2 md:p-16 lg:p-32">
        {performanceData.map((performance, index) => (
          <BlurCard
            key={index}
            className="flex aspect-square w-full max-w-lg flex-col justify-between p-4"
          >
            <p className="text-white">{performance.title}</p>
            <Image
              alt="hyaluronic-acid"
              height={100}
              src={performance.img}
              width={100}
              className="h-auto w-1/2"
            />
            <p>{performance.stats}</p>
            <p>{performance.text}</p>
          </BlurCard>
        ))}
      </div>
    </div>
  );
}
