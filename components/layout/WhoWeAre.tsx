import React, { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = {
    one: useRef<SVGCircleElement>(null),
    two: useRef<HTMLDivElement>(null),
    three: useRef<SVGCircleElement>(null),
  };
  const whoWeAreRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lastTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !sectionRef.current) return;

    const split = new SplitText(textRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    const scrolltrigger = {
      trigger: sectionRef.current,
      toggleActions: 'play none none none',
      start: 'top 60%',
      end: 'bottom 20%',
    };

    gsap
      .timeline({
        scrollTrigger: scrolltrigger,
      })
      .from(lineRefs.two.current, {
        scaleY: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      .to(
        lineRefs.one.current,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '<',
      )
      .to(
        lineRefs.three.current,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '<',
      )
      .from(
        whoWeAreRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.6',
      )
      .from(
        split.lines,
        {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.05,
        },
        '-=0.8',
      )
      .from(
        lastTextRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.8',
      );
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh items-center justify-center bg-white px-4 py-16"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center md:flex-row">
        <svg
          className="aspect-square h-full w-auto md:h-auto md:w-full"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            ref={lineRefs.one}
            cx="12"
            cy="12"
            fill="none"
            r="11"
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="69.1"
            strokeDashoffset="69.1"
            strokeLinecap="round"
            strokeWidth="0.05"
          />
        </svg>
        <div
          ref={lineRefs.two}
          className="h-px w-full origin-top bg-black/10 md:block md:h-full md:w-px"
        ></div>
        <svg
          className="aspect-square h-full w-auto md:h-auto md:w-full"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            ref={lineRefs.three}
            cx="12"
            cy="12"
            fill="none"
            r="11"
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="69.1"
            strokeDashoffset="69.1"
            strokeLinecap="round"
            strokeWidth="0.05"
            transform="rotate(180 12 12)"
          />
        </svg>
      </div>

      <div className="z-1 mx-auto flex flex-col items-center justify-center gap-8 text-center">
        <h2 ref={whoWeAreRef} className="text-lg text-orange-500">
          [ WHO WE ARE? ]
        </h2>
        <p ref={textRef} className="px-6 text-4xl md:px-24">
          We are a team of skincare enthusiasts dedicated to crafting products that redefine beauty
          standards. Committed to innovation and quality, we blend science with nature to create
          skincare solutions that nourish and transform.
        </p>

        <div ref={lastTextRef} className="space-y-2">
          <p className="text-md text-gray-500 md:text-base">WELCOME TO OUR SKINCARE</p>
          <p className="text-md text-gray-500 md:text-base">JOURNEY.</p>
        </div>
      </div>
    </section>
  );
}
