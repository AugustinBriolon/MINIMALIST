import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import { useFontReady } from "@/hook/useFontReady";

gsap.registerPlugin(SplitText);

export const timeToLoad = 5.5;

export default function ScreenLoader() {
  const panelRefs = {
    top: useRef(null),
    bottom: useRef(null),
    left: useRef(null),
    right: useRef(null),
  };
  const titleRef = useRef(null);
  const isFontReady = useFontReady();
  const screenLoaderRef = useRef(null);

  useGSAP(() => {
    if (!isFontReady) return;

    const split = SplitText.create(titleRef.current, {
      type: "chars",
    });

    gsap.set(titleRef.current, {
      opacity: 1,
    });

    gsap
      .timeline()
      .from(split.chars, {
        delay: 0.5,
        y: 100,
        filter: "blur(10px)",
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        split.chars,
        {
          y: -100,
          opacity: 0,
          stagger: { each: 0.05, from: "end" },
          duration: 0.5,
          ease: "power2.out",
        },
        "<+1.5",
      )
      .to(panelRefs.top, {
        y: 100,
      })
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          yPercent: (i) => [-50, 50][i],
          duration: 0.8,
          ease: "power1.out",
        },
        "<+0.5",
      )
      .to(
        [panelRefs.left.current, panelRefs.right.current],
        {
          scaleX: 0,
          duration: 2,
          ease: "power2.out",
        },
        "<+1.5",
      )
      .to(
        [panelRefs.top.current, panelRefs.bottom.current],
        {
          scaleY: 0,
          duration: 2,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        screenLoaderRef.current,
        {
          display: "none",
          opacity: 0,
          duration: 0,
        }
      );
  }, [isFontReady]);

  return (
    <div
      ref={screenLoaderRef}
      className="fixed h-dvh w-full bg-transparent z-10"
    >
      <div className="relative h-full w-full">
        <div
          ref={panelRefs.left}
          className="absolute top-0 bg-black w-1/2 h-full -left-2/12 origin-left"
        ></div>
        <div
          className="absolute top-0 bg-black w-1/2 h-full -right-2/12 origin-right"
          ref={panelRefs.right}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-11">
          <h1
            className="text-white text-7xl font-bold z-11 opacity-0"
            ref={titleRef}
          >
            MINIMALIST
          </h1>
        </div>

        <div
          className="absolute left-0 bg-black w-full h-1/2 top-0 origin-top"
          ref={panelRefs.top}
        ></div>
        <div
          className="absolute left-0 bg-black w-full h-1/2 bottom-0 origin-bottom"
          ref={panelRefs.bottom}
        ></div>
      </div>
    </div>
  );
}
