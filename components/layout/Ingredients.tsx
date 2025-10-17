import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BlurCard from '../ui/BlurCard';

gsap.registerPlugin(ScrollTrigger);

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
};

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const spanIndexRef = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const screenSize = useResponsive();

  const performanceData = useMemo(
    () => [
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
    ],
    [],
  );

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el;
    },
    [],
  );

  // Configuration responsive pour les animations
  const getResponsiveConfig = useCallback(() => {
    switch (screenSize) {
      case 'mobile':
        return {
          stackOffset: { x: 8, y: 8 },
          stackScale: 0.08,
          stackRotation: 1,
          cardScale: 0.95,
          animationDuration: 0.3,
          scrollMultiplier: 3,
          padding: 16,
          cardPositioning: { right: '16px', bottom: '16px' },
        };
      case 'tablet':
        return {
          stackOffset: { x: 12, y: 12 },
          stackScale: 0.06,
          stackRotation: 1.5,
          cardScale: 0.92,
          animationDuration: 0.25,
          scrollMultiplier: 3.5,
          padding: 24,
          cardPositioning: { right: '24px', bottom: '24px' },
        };
      default: // desktop
        return {
          stackOffset: { x: 15, y: 15 },
          stackScale: 0.05,
          stackRotation: 2,
          cardScale: 0.9,
          animationDuration: 0.25,
          scrollMultiplier: 4,
          padding: 32,
          cardPositioning: { right: '32px', bottom: '32px' },
        };
    }
  }, [screenSize]);

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const spanIndex = spanIndexRef.current;
    const config = getResponsiveConfig();

    // Nettoyer seulement les ScrollTriggers de ce composant
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * config.scrollMultiplier}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const { progress } = self;
          const currentCard = Math.floor(progress * performanceData.length) + 1;
          const clampedCard = Math.min(currentCard, performanceData.length);
          setIndex(clampedCard);
        },
      },
    });

    // Configuration initiale des cartes avec valeurs responsives
    gsap.set(cards, {
      x: screenSize === 'mobile' ? '50%' : '100%',
      opacity: 0,
      rotation: screenSize === 'mobile' ? 3 : 5,
      transformOrigin: 'center center',
    });

    cards.forEach((card, index) => {
      const progress = index / performanceData.length;

      // Animation d'entrée responsive
      tl.fromTo(
        card,
        {
          x: screenSize === 'mobile' ? '50%' : '100%',
          opacity: 0,
          rotation: screenSize === 'mobile' ? 3 : 5,
          scale: config.cardScale,
        },
        {
          x: '0%',
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: config.animationDuration,
          ease: 'power2.out',
        },
        progress,
      );

      // Animation de stack pour les cartes précédentes
      for (let prevIndex = 0; prevIndex < index; prevIndex++) {
        const prevCard = cards[prevIndex];
        if (prevCard) {
          const offsetMultiplier = index - prevIndex;

          tl.to(
            prevCard,
            {
              x: `${offsetMultiplier * config.stackOffset.x}px`,
              y: `${offsetMultiplier * config.stackOffset.y}px`,
              scale: 1 - offsetMultiplier * config.stackScale,
              rotation: offsetMultiplier * config.stackRotation,
              duration: config.animationDuration,
              ease: 'power2.out',
            },
            progress,
          );

          // Gestion de l'opacité responsive
          const maxVisibleCards = screenSize === 'mobile' ? 2 : 3;
          if (offsetMultiplier >= maxVisibleCards) {
            tl.to(
              prevCard,
              {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.inOut',
              },
              progress,
            );
          } else if (offsetMultiplier === maxVisibleCards - 1) {
            tl.to(
              prevCard,
              {
                opacity: screenSize === 'mobile' ? 0.4 : 0.6,
                duration: 0.2,
                ease: 'power2.inOut',
              },
              progress,
            );
          }
        }
      }
    });

    // Animation de l'indicateur de progression
    if (spanIndex) {
      const spacing = screenSize === 'mobile' ? 3 : 4;
      const gap = spacing * (screenSize === 'mobile' ? 2.5 : 3);
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

    // Animation des textes avec délai responsive
    const titleElements = section.querySelectorAll('.fade-in-title');
    const textElements = section.querySelectorAll('.fade-in-text');

    gsap.set([titleElements, textElements], {
      opacity: 0,
      y: screenSize === 'mobile' ? 30 : 50,
    });

    gsap.to([titleElements, textElements], {
      opacity: 1,
      y: 0,
      duration: screenSize === 'mobile' ? 0.8 : 1,
      stagger: screenSize === 'mobile' ? 0.15 : 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [performanceData.length, screenSize, getResponsiveConfig]);

  return (
    <div
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

      {/* Section de gauche - Layout responsive amélioré */}
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

      <div
        ref={cardsContainerRef}
        className="relative z-10 flex h-full w-full flex-col items-end justify-end overflow-visible p-4 sm:p-6 md:w-1/2 md:p-8 lg:p-16 xl:p-32"
      >
        {performanceData.map((performance, index) => {
          const config = getResponsiveConfig();
          return (
            <BlurCard
              key={index}
              ref={setCardRef(index)}
              className="absolute flex aspect-square w-[280px] flex-col justify-between overflow-hidden p-3 will-change-transform sm:w-[320px] sm:p-4 md:w-[360px] lg:w-[400px] lg:p-6 xl:w-[480px]"
              style={{
                zIndex: performanceData.length + index,
                transformOrigin: 'center center',
                right: config.cardPositioning.right,
                bottom: config.cardPositioning.bottom,
                aspectRatio: '1',
              }}
            >
              <p className="text-xs font-semibold text-white sm:text-sm lg:text-base">
                {performance.title}
              </p>
              <div className="h-full w-full">
                <Image
                  alt={performance.title}
                  className="mx-auto h-full max-h-[280px] w-auto py-12"
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
          );
        })}
      </div>
    </div>
  );
}
