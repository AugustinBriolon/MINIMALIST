import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import { useFontReady } from '@/hook/useFontReady';
import { useIsScreenLoader } from '@/hook/useIsScreenLoader';

gsap.registerPlugin(SplitText);

export const timeToLoad = useIsScreenLoader() ? 2.5 : 0;

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

    gsap.set(panelRefs.left.current, { scaleX: 0.8 });
    gsap.set(panelRefs.right.current, { scaleX: 0.8 });
    gsap.set(panelRefs.bottom.current, { scaleY: 0 });
    gsap.set(panelRefs.top.current, { scaleY: 1 });

    gsap
      .timeline()
      .to([panelRefs.top.current, panelRefs.bottom.current], {
        scaleY: (i) => [0.25, 0.25][i],
        delay: (i) => [0.5, 0.7][i],
        duration: 1.6,
        ease: 'power3.out',
      })
      .to(
        [panelRefs.left.current, panelRefs.right.current],
        {
          scaleX: 0,
          duration: 1.8,
          ease: 'power4.inOut',
        },
        '>-0.5',
      )
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          scaleY: 0,
          duration: 1.8,
          ease: 'power4.inOut',
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
          className="absolute top-0 left-0 h-screen w-1/2 origin-left bg-black"
        ></div>
        <div
          ref={panelRefs.right}
          className="absolute top-0 right-0 h-screen w-1/2 origin-right bg-black"
        ></div>

        <div
          ref={panelRefs.top}
          className="absolute top-0 left-0 h-screen w-screen origin-top bg-black"
        ></div>
        <div
          ref={panelRefs.bottom}
          className="absolute bottom-0 left-0 h-screen w-screen origin-bottom bg-black"
        ></div>
      </div>
    </div>
  );
}
