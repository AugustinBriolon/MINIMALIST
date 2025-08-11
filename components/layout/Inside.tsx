import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Enregistrer le plugin ScrollTrigger
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

export default function Inside() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: ({ progress }) => {
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              y: 100 * (1 - progress),
              opacity: progress,
            });
          }
        },
      },
    });

    rowRefs.current.filter(Boolean).forEach((row, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${20 + index * 10}% 80%`,
          end: `top+=${20 + index * 10}% 20%`,
          scrub: 1,
          onUpdate: ({ progress }) => {
            if (row) {
              gsap.set(row, {
                y: 50 * (1 - progress),
                opacity: progress,
              });
            }
          },
        },
      });
    });

    gsap.set(titleRef.current, { opacity: 0, y: 100 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity: 0, y: 50 });
  }, []);

  return (
    <div ref={sectionRef} className="flex h-fit flex-col items-center justify-center bg-white">
      <div className="flex h-[50vh] items-center justify-center">
        <div className="overflow-hidden">
          <h2 ref={titleRef} className="text-[10vw] font-bold text-black/20">
            What's Inside ?
          </h2>
        </div>
      </div>

      <div className="w-full px-8 py-16">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border-collapse">
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
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className="border-b border-black/5 transition-colors hover:bg-black/2"
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
    </div>
  );
}
