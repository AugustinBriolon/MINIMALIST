import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface IngredientData {
  ingredient: string;
  formula: string;
  function: string;
}

const ingredientsData: IngredientData[] = [
  {
    ingredient: 'Maleic Acid',
    formula: '[C4H4O4]',
    function: 'Repairing disulfide bonds in hair',
  },
  {
    ingredient: 'Transglutaminase',
    formula: '[C27H44O3H2O]',
    function: 'Acts as a hair-strengthening adhesive',
  },
  {
    ingredient: 'Amino Acid',
    formula: '[H2NCHRCOOH]',
    function: 'Protect hair & fiber against heat-induced stress',
  },
  {
    ingredient: 'Argan Oil',
    formula: '[C18H34O2]',
    function: 'Promotes healthier hair',
  },
];

export default function WhatInside() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.4,
      ease: 'power2.out',
    });
    if (window.innerWidth > 1024) {
      tl.from(
        '.ingredient-row',
        {
          y: 50,
          opacity: 0,
          filter: 'blur(10px)',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power2.out',
        },
        '<0.5',
      );
    } else {
      tl.from(
        '.ingredient-card',
        {
          y: 150,
          opacity: 0,
          filter: 'blur(10px)',
          stagger: 0.05,
          duration: 1.2,
          ease: 'power2.out',
        },
        '<+0.5',
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="flex h-fit flex-col items-center justify-center bg-white">
      <div className="flex h-[50vh] items-center justify-center">
        <h2
          ref={titleRef}
          className="text-[10vw] font-bold text-black/20 md:text-[8vw] lg:text-[6vw]"
        >
          What's Inside ?
        </h2>
      </div>

      <div className="hidden w-full px-8 py-16 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black/10">
                <th className="p-6 text-left text-lg font-medium text-black/70">INGREDIENT</th>
                <th className="p-6 text-left text-lg font-medium text-black/70">FORMULA</th>
                <th className="p-6 text-left text-lg font-medium text-black/70">FUNCTION</th>
              </tr>
            </thead>
            <tbody>
              {ingredientsData.map((item, index) => (
                <tr
                  key={index}
                  className="ingredient-row border-b border-black/5 transition-colors hover:bg-black/2"
                >
                  <td className="p-6 text-base font-medium text-black/80">{item.ingredient}</td>
                  <td className="p-6 font-mono text-base text-black/60">{item.formula}</td>
                  <td className="p-6 text-base leading-relaxed text-black/70">{item.function}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cartes Mobile */}
      <div className="w-full px-4 py-8 lg:hidden">
        <div className="space-y-4">
          {ingredientsData.map((item, index) => (
            <div
              key={index}
              className="ingredient-card rounded-lg border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-black/80">{item.ingredient}</h3>
                <p className="inline-block rounded bg-black/5 px-3 py-1 font-mono text-sm text-black/60">
                  {item.formula}
                </p>
              </div>
              <p className="text-base leading-relaxed text-black/70">{item.function}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
