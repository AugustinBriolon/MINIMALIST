import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import { useFontReady } from '@/hook/useFontReady';
import { useIsScreenLoader } from '@/hook/useIsScreenLoader';

gsap.registerPlugin(SplitText);

export const timeToLoad = useIsScreenLoader() ? 3 : 0;

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

    gsap
      .timeline()
      .to(panelRefs.top, {
        delay: 1,
        y: 100,
      })
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          yPercent: (i) => [-50, 50][i],
          duration: 0.8,
          ease: 'power1.out',
        },
        '<+0.5',
      )
      .to(
        [panelRefs.left.current, panelRefs.right.current],
        {
          scaleX: 0,
          duration: 2,
          ease: 'power2.out',
        },
        '<+1.5',
      )
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          scaleY: 0,
          duration: 2,
          ease: 'power2.out',
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
    <div ref={screenLoaderRef} className="fixed z-10 h-dvh w-full bg-transparent">
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
          className="absolute top-0 left-0 h-1/2 w-full origin-top bg-black"
        ></div>
        <div
          ref={panelRefs.bottom}
          className="absolute bottom-0 left-0 h-1/2 w-full origin-bottom bg-black"
        ></div>
      </div>
    </div>
  );
}
