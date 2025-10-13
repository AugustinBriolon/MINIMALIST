import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import { useFontReady } from '@/hook/useFontReady';
import { useIsScreenLoader } from '@/hook/useIsScreenLoader';

gsap.registerPlugin(SplitText);

export const timeToLoad = useIsScreenLoader() ? 2 : 0;

export default function ScreenLoader() {
  const panelRefs = {
    top: useRef(null),
    bottom: useRef(null),
    left: useRef(null),
    right: useRef(null),
  };
  const isFontReady = useFontReady();
  const screenLoaderRef = useRef(null);

  useGSAP(() => {
    if (!isFontReady) return;

    gsap.set(panelRefs.bottom.current, { yPercent: 125 });

    gsap
      .timeline()
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          yPercent: (i) => [-75, 75][i],
          duration: 0.8,
          ease: 'power1.out',
        },
        '<+0.5',
      )
      .to(
        [panelRefs.left.current, panelRefs.right.current],
        {
          scaleX: 0,
          duration: 1,
          ease: 'power1.out',
        },
        '<+1.5',
      )
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          scaleY: 0,
          duration: 3.5,
          ease: 'power1.out',
        },
        '<',
      )
      .to(screenLoaderRef.current, {
        display: 'none',
        opacity: 0,
        duration: 0,
      });
  }, [isFontReady]);

  return (
    <div ref={screenLoaderRef} className="fixed z-10 h-dvh w-full overflow-hidden bg-transparent">
      <div className="relative h-full w-full">
        <div
          ref={panelRefs.left}
          className="absolute top-0 -left-2/12 h-full w-1/2 origin-left bg-black"
        ></div>
        <div
          ref={panelRefs.right}
          className="absolute top-0 -right-2/12 h-full w-1/2 origin-right bg-black"
        ></div>

        <div
          ref={panelRefs.top}
          className="absolute top-0 left-0 h-full w-full origin-top bg-black"
        ></div>
        <div
          ref={panelRefs.bottom}
          className="absolute bottom-0 left-0 h-full w-full origin-bottom bg-black"
        ></div>
      </div>
    </div>
  );
}
