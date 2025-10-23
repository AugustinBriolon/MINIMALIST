import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import React, { useRef, useState } from 'react';
import BlurCard from '../ui/BlurCard';
import Image from 'next/image';

export default function Ingredient() {
  const [index, setIndex] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const spanIndexRef = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const cards = cardRefs.current.filter(Boolean);
    const positionCards = cardsContainerRef.current?.clientWidth ?? 0 / performanceData.length;

    gsap.set(cards, { xPercent: positionCards });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const { progress } = self;
          const currentCard = Math.round(progress * (performanceData.length - 1)) + 1;
          const clampedCard = Math.min(Math.max(currentCard, 1), performanceData.length);
          setIndex((prevIndex) => {
            if (clampedCard !== prevIndex) {
              return clampedCard;
            }
            return prevIndex;
          });
        },
      },
    });

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          xPercent: 0,
          duration: 1,
          ease: 'power2.out',
        },
        i <= 1 ? '>-1' : '>-2',
      ).to(
        spanIndexRef.current,
        {
          left: `${(i / (performanceData.length - 1)) * (100 - 2)}%`,
          duration: 1,
          ease: 'power2.out',
        },
        '<',
      );

      if (i < performanceData.length - 1) {
        tl.to(card, {
          xPercent: 1,
          yPercent: 1,
          opacity: 0.8,
          duration: 1,
          ease: 'power2.out',
        });
      }

      if (i <= 1) {
        tl.to(card, {
          xPercent: 2,
          yPercent: 2,
          opacity: 0.6,
          duration: 1,
          ease: 'power2.out',
        });
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col overflow-hidden md:flex-row"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/5"></div>
        <video
          className="h-full w-full object-cover"
          preload="metadata"
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
      <div className="z-10 flex w-full flex-col items-start justify-between gap-6 py-8 pr-8 pl-8 sm:gap-8 sm:pr-0 md:w-1/2 md:py-8 md:pl-8 lg:py-16 lg:pl-16 xl:py-22 xl:pl-22">
        <div className="flex flex-col gap-4 text-white sm:gap-6 lg:gap-8">
          <h2
            ref={titleRef}
            className="fade-in-title text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Scientifically Proven Ingredients
          </h2>
          <p className="fade-in-text text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl">
            Unlock the potential of our formulations with scientifically proven ingredients
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <NumberFlow
            className="font-bold text-white"
            value={index}
            format={{
              minimumIntegerDigits: 2,
            }}
          />
          <div ref={indicatorRef} className="relative flex items-center gap-3 sm:gap-4">
            <span
              ref={spanIndexRef}
              className="absolute top-0 left-0 h-4 w-[2px] max-w-[2px] min-w-[2px] bg-white sm:h-5 lg:h-6"
            ></span>
            {performanceData.map((_, index) => (
              <span
                key={index}
                className="h-4 w-[2px] max-w-[2px] min-w-[2px] bg-white/50 sm:h-5 lg:h-6"
              ></span>
            ))}
          </div>
          <p className="text-sm font-medium text-white sm:text-base lg:text-lg">
            0{performanceData.length}
          </p>
        </div>
      </div>
      <div
        ref={cardsContainerRef}
        className="relative z-10 flex h-full w-full flex-col items-end justify-end overflow-visible p-8 md:w-1/2 md:p-8 lg:p-16 xl:p-32"
      >
        {performanceData.map((performance, index) => (
          <BlurCard
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute flex h-[280px] w-[280px] flex-col justify-between overflow-hidden p-3 will-change-transform sm:h-[320px] sm:w-[320px] sm:p-4 md:h-[360px] md:w-[360px] lg:h-[400px] lg:w-[400px] lg:p-6 xl:h-[480px] xl:w-[480px]"
          >
            <p className="text-xs font-semibold text-white sm:text-sm lg:text-base">
              {performance.title}
            </p>
            <div className="h-full w-full">
              <Image
                alt={performance.title}
                className="mx-auto h-full max-h-[180px] w-auto py-4 sm:py-12 lg:max-h-[280px]"
                height={100}
                priority={index === 0}
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                src={performance.img}
                width={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {performance.stats}
              </p>
              <p className="text-xs leading-relaxed text-white sm:text-sm lg:text-base xl:text-lg">
                {performance.text}
              </p>
            </div>
          </BlurCard>
        ))}
      </div>
    </section>
  );
}
