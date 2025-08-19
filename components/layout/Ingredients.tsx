import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useState } from 'react';
import BlurCard from '../ui/BlurCard';

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const spanIndexRef = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);

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

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const spanIndex = spanIndexRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const { progress } = self;
          const currentCard = Math.floor(progress * performanceData.length) + 1;
          const clampedCard = Math.min(currentCard, performanceData.length);
          setIndex(clampedCard);
        },
      },
    });

    gsap.set(cards, {
      x: '100%',
      opacity: 0,
      rotation: 5,
      transformOrigin: 'center center',
    });

    cards.forEach((card, index) => {
      const progress = index / performanceData.length;

      tl.fromTo(
        card,
        {
          x: '100%',
          opacity: 0,
          rotation: 5,
          scale: 0.9,
        },
        {
          x: '0%',
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
        },
        progress,
      );

      for (let prevIndex = 0; prevIndex < index; prevIndex++) {
        const prevCard = cards[prevIndex];
        if (prevCard) {
          const offsetMultiplier = index - prevIndex;

          tl.to(
            prevCard,
            {
              x: `${offsetMultiplier * 15}px`,
              y: `${offsetMultiplier * 15}px`,
              scale: 1 - offsetMultiplier * 0.05,
              rotation: offsetMultiplier * 2,
              duration: 0.25,
              ease: 'power2.out',
            },
            progress,
          );

          if (offsetMultiplier >= 3) {
            tl.to(
              prevCard,
              {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.inOut',
              },
              progress,
            );
          } else if (offsetMultiplier === 2) {
            tl.to(
              prevCard,
              {
                opacity: 0.6,
                duration: 0.2,
                ease: 'power2.inOut',
              },
              progress,
            );
          }
        }
      }
    });

    if (spanIndex) {
      const spacing = 4;
      const gap = spacing * 3;
      const barWidth = spacing * 0.5;
      const totalWidth = (performanceData.length - 1) * (gap + barWidth);

      tl.to(
        spanIndex,
        {
          x: totalWidth,
          duration: 1,
          ease: 'power2.inOut',
        },
        0,
      );
    }

    const titleElements = section.querySelectorAll('.fade-in-title');
    const textElements = section.querySelectorAll('.fade-in-text');

    gsap.set([titleElements, textElements], {
      opacity: 0,
      y: 50,
    });

    gsap.to([titleElements, textElements], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [performanceData.length]);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col overflow-hidden md:flex-row"
    >
      {/* Vidéo de fond */}
      <div className="absolute inset-0">
        <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
          <source src="/videos/water-drop.webm" type="video/webm" />
          <source src="/videos/water-drop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Section de gauche */}
      <div className="z-10 flex w-full flex-col items-start justify-between gap-8 md:w-1/2 md:p-16 lg:p-32">
        <div className="flex flex-col gap-8 text-white">
          <h2 className="fade-in-title text-6xl">Scientifically Proven Ingredients</h2>
          <p className="fade-in-text">
            Unlock the potential of our formulations with scientifically proven ingredients
          </p>
        </div>

        {/* Indicateur de progression */}
        <div ref={indicatorRef} className="flex items-center justify-center gap-8">
          <NumberFlow
            className="text-white"
            value={index}
            format={{
              minimumIntegerDigits: 2,
            }}
          />
          <div className="relative flex gap-3">
            <span
              ref={spanIndexRef}
              className="absolute top-0 h-6 w-0.5 transform rounded-full bg-white"
            ></span>
            {performanceData.map((_, index) => (
              <span key={index} className="h-6 w-0.5 rounded-full bg-white/50"></span>
            ))}
          </div>
          <p className="text-white">0{performanceData.length}</p>
        </div>
      </div>

      {/* Section des cartes */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 flex h-full w-full flex-col items-end justify-end overflow-visible md:w-1/2 md:p-16 lg:p-32"
      >
        {performanceData.map((performance, index) => (
          <BlurCard
            key={index}
            ref={setCardRef(index)}
            className="absolute right-16 bottom-16 flex aspect-square w-full max-w-lg flex-col justify-between p-4 will-change-transform md:right-16 md:bottom-16 lg:right-32 lg:bottom-32"
            style={{
              zIndex: performanceData.length + index,
              transformOrigin: 'center center',
            }}
          >
            <p className="font-semibold text-white">{performance.title}</p>
            <div className="flex h-fit w-full items-center justify-center p-4">
              <Image
                alt={performance.title}
                className="h-full w-auto"
                height={100}
                src={performance.img}
                width={100}
              />
            </div>
            <p className="text-6xl font-bold text-white">{performance.stats}</p>
            <p className="text-lg text-white">{performance.text}</p>
          </BlurCard>
        ))}
      </div>
    </div>
  );
}
