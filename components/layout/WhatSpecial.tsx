import NumberFlow from '@number-flow/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WhatSpecial() {
  const [percent, setPercent] = useState(0);
  const barRef = {
    orange: useRef<HTMLDivElement>(null),
    black: useRef<HTMLDivElement>(null),
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
  };
  const textRef = {
    description: useRef<HTMLParagraphElement>(null),
    usual: useRef<HTMLParagraphElement>(null),
    minimalist: useRef<HTMLParagraphElement>(null),
    percent: useRef<HTMLParagraphElement>(null),
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const targetValuePercent = { value: 0 };

    const titleSplit = new SplitText(titleRef.title.current, {
      type: 'lines',
      mask: 'lines',
    });

    const subtitleSplit = new SplitText(titleRef.subtitle.current, {
      type: 'lines',
      mask: 'lines',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      })
      .to(targetValuePercent, {
        value: 22.9,
        duration: 3,
        ease: 'power4.inOut',
        onUpdate: () => {
          setPercent(targetValuePercent.value);
        },
      })
      .from(
        [titleSplit.lines, subtitleSplit.lines],
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        textRef.description.current,
        {
          yPercent: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        [textRef.usual.current, textRef.minimalist.current],
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        [barRef.black.current, barRef.orange.current],
        {
          scaleX: 0,
          duration: 1.8,
          ease: 'power4.inOut',
        },
        '+0.5',
      )
      .from(textRef.percent.current, {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex h-dvh w-full flex-col gap-8 p-8 md:flex-row md:gap-16 md:p-16"
    >
      <div className="flex h-auto w-full flex-col items-start md:h-full md:w-1/3 md:justify-between">
        <div className="overflow-hidden">
          <h2
            ref={titleRef.title}
            className="text-2xl leading-tight font-normal whitespace-pre-line sm:text-3xl md:text-4xl lg:text-6xl"
          >
            What makes it special ?
          </h2>
        </div>
        <p className="text-sm font-normal text-orange-500 sm:text-base lg:text-lg">
          [ IN-VITRO STUDIES ]
        </p>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-between md:w-2/3">
        <div className="flex flex-col gap-4">
          <h3
            className="text-[25vw] font-normal text-black/10 md:text-[10vw] md:text-[15vw] md:leading-50"
            style={{ '--number-flow-char-height': '0.85em' } as React.CSSProperties}
          >
            <NumberFlow
              locales="en-US"
              suffix="%"
              value={percent}
              format={{
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
                minimumIntegerDigits: 2,
              }}
            />
          </h3>
          <p ref={titleRef.subtitle} className="text-4xl">
            Revolutionary Patent Pending Blend
          </p>
          <p ref={textRef.description} className="max-w-3/4 text-black/60">
            Our serum delivers a remarkable 22.9% increase in the tensile strength of hair fibers
            after just one wash, surpassing competitors' results.
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-8">
          <div>
            <div className="overflow-hidden">
              <p ref={textRef.usual} className="text-xl text-black/60">
                Usual Serum
              </p>
            </div>
            <div ref={barRef.black} className="h-10 w-1/2 origin-left bg-black/10"></div>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <p ref={textRef.minimalist} className="text-xl text-black">
                  Minimalist Serum
                </p>
              </div>
              <p ref={textRef.percent} className="text-xl text-orange-500">
                + 22.9%
              </p>
            </div>
            <div ref={barRef.orange} className="h-10 w-full origin-left bg-orange-500"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 flex h-full w-px -translate-x-1/2 -translate-y-2/5 flex-col items-center text-xs">
            <span>▼</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>l</span>
            <span>▲</span>
          </div>
        </div>
      </div>
    </section>
  );
}
