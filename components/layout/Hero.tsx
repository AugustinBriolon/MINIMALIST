import React, { useRef } from "react";
import BlurCard from "../ui/BlurCard";
import Button from "../ui/Button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { timeToLoad } from "./ScreenLoader";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = {
    one: useRef<HTMLDivElement>(null),
    two: useRef<HTMLDivElement>(null),
    three: useRef<HTMLDivElement>(null),
    four: useRef<HTMLDivElement>(null),
  };
  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowImageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(textRef.current, {
      type: "words",
    });

    gsap
      .timeline()
      .from(logoRef.current, {
        delay: timeToLoad,
        y: -100,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out",
      })
      .from(
        titleRef.current,
        {
          yPercent: 100,
          filter: "blur(10px)",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<",
      )
      .from(split.words, {
        y: 20,
        filter: "blur(10px)",
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      })
      .from(
        lineRef.one.current,
        {
          scaleX: 0,
          duration: 2,
          ease: "power2.out",
        },
        "<",
      )
      .from(
        lineRef.two.current,
        {
          scaleY: 0,
          duration: 1,
          ease: "none",
        },
        ">-1.5",
      )
      .from(
        lineRef.three.current,
        {
          scaleY: 0,
          duration: 1,
          ease: "power2.out",
        },
        ">",
      )
      .from(
        arrowRef.current,
        {
          borderWidth: 0,
          duration: 1,
          ease: "power2.out",
        },
        ">",
      )
      .from(
        arrowImageRef.current,
        {
          y: 100,
          filter: "blur(10px)",
          duration: 1,
          ease: "power2.out",
        },
        ">",
      )
      .from(
        lineRef.four.current,
        {
          scaleY: 0,
          duration: 1,
          ease: "power2.out",
        },
        ">",
      )
  });

  return (
    <div className="relative h-dvh w-full bg-[url(/images/hero.webp)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative grid h-2/3 min-h-fit w-full grid-cols-3 grid-rows-2">
        <div className="col-span-3 flex flex-col justify-between gap-12 p-4">
          <div className="overflow-hidden">
            <h1 ref={logoRef} className="text-4xl font-bold text-white">
              MN_
            </h1>
          </div>
          <div className="h-fit overflow-hidden">
            <Image
              ref={titleRef}
              className="h-auto w-full"
              src="/icons/Minimalist.svg"
              alt="Minimalist"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col items-start justify-start">
          <div
            ref={lineRef.one}
            className="h-px w-full origin-left bg-white/50"
          ></div>
          <div className="grid h-full w-full grid-cols-3">
            <p
              ref={textRef}
              className="col-span-3 p-4 text-pretty text-white/80 md:col-span-1 h-fit"
            >
              WE BELIEVE THAT SKINCARE IS NOT JUST A ROUTINE; IT'S A JOURNEY
              TOWARDS CONFIDENCE, VITALITY, AND SELF-EXPRESSION.
            </p>
            <div className="col-span-1 hidden w-full items-center justify-center md:flex">
              <div
                ref={lineRef.two}
                className="h-full w-px origin-top bg-white/50"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid h-1/3 w-full grid-cols-[1fr_auto_1fr]">
        <div className="col-span-1"></div>
        <div className="col-span-1 hidden flex-col items-center justify-center md:flex">
          <div
            ref={lineRef.three}
            className="h-full w-px origin-top bg-white/50"
          ></div>
          <div
            ref={arrowRef}
            className="rounded-full border border-white/50 p-2 backdrop-blur-sm"
          >
            <Image
              ref={arrowImageRef}
              src="/icons/arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
          <div
            ref={lineRef.four}
            className="h-full w-px origin-top bg-white/50"
          ></div>
        </div>
        <div className="col-span-3 flex items-center justify-end p-4 md:col-span-1 md:pl-12">
          <BlurCard ref={cardRef} className="flex w-full max-w-xl flex-col">
            <div className="flex items-center justify-between p-4">
              <p className="col-span-2 font-light text-white">
                Maleic Bond Repair <br /> Complex 5% Hair Serum
              </p>
              <Button>Buy Now</Button>
            </div>
            <div className="h-px w-full bg-white/50"></div>
            <div className="col-span-3 flex items-center justify-between p-4">
              <p className="text-sm text-white/90">Sulfate Free</p>
              <p className="text-sm text-white/90">Paraben Free</p>
              <p className="text-sm text-white/90">Silicone Free</p>
            </div>
          </BlurCard>
        </div>
      </div>
    </div>
  );
}
