import React, { useRef } from "react";
import BlurCard from "../ui/BlurCard";
import Button from "../ui/Button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { timeToLoad } from "./ScreenLoader";

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
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap
      .timeline()
      .from(logoRef.current, {
        delay: timeToLoad,
        y: 100,
        duration: 1,
        ease: "power2.out",
      })
      .from(
        titleRef.current,
        {
          yPercent: 100,
          duration: 1,
          ease: "power2.out",
        },
        "<",
      )
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
        ">-1",
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
        lineRef.four.current,
        {
          scaleY: 0,
          duration: 1,
          ease: "power2.out",
        },
        ">",
      )
      .from(
        textRef.current,
        {
          y: 100,
          duration: 1,
          ease: "power2.out",
        },
        "<",
      );
  });

  return (
    <div className="h-dvh w-full bg-[url(/images/hero.webp)] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative grid grid-cols-3 grid-rows-2 h-2/3 w-full h-fit">
        <div className="col-span-3 flex flex-col justify-between gap-12 p-4">
          <div className="overflow-hidden">
            <h1 ref={logoRef} className="text-4xl font-bold text-white">
              MN_
            </h1>
          </div>
          <div className="overflow-hidden h-fit">
            <Image
              ref={titleRef}
              className="w-full h-auto"
              src="/icons/Minimalist.svg"
              alt="Minimalist"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col justify-start items-start">
          <div
            ref={lineRef.one}
            className="h-px w-full origin-left bg-white/50 origin-left"
          ></div>
          <div className="grid grid-cols-3 w-full h-full">
            <p
              ref={textRef}
              className="col-span-3 md:col-span-1 text-white/80 p-4 text-pretty"
            >
              WE BELIEVE THAT SKINCARE IS NOT JUST A ROUTINE; IT'S A JOURNEY
              TOWARDS CONFIDENCE, VITALITY, AND SELF-EXPRESSION.
            </p>
            <div className="hidden col-span-1 w-full md:flex items-center justify-center">
              <div ref={lineRef.two} className="w-px h-full bg-white/50 origin-top"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-[1fr_auto_1fr] h-1/3 w-full">
        <div className="col-span-1"></div>
        <div className="col-span-1 hidden md:flex flex-col items-center justify-center">
          <div ref={lineRef.three} className="w-px h-full bg-white/50 origin-top"></div>
          <div
            ref={arrowRef}
            className="border border-white/50 rounded-full p-2 backdrop-blur-sm"
          >
            <Image src="/icons/arrow.svg" alt="arrow" width={24} height={24} />
          </div>
          <div ref={lineRef.four} className="w-px h-full bg-white/50 origin-top"></div>
        </div>
        <div className="col-span-3 md:col-span-1 flex items-center justify-end md:pl-12 p-4">
          <BlurCard ref={cardRef} className="flex flex-col w-full max-w-xl">
            <div className="flex items-center justify-between p-4">
              <p className="col-span-2 text-white  font-light">
                Maleic Bond Repair <br /> Complex 5% Hair Serum
              </p>
              <Button>Buy Now</Button>
            </div>
            <div className="h-px w-full bg-white/50"></div>
            <div className="col-span-3 flex items-center justify-between p-4">
              <p className="text-white/90 text-sm">Sulfate Free</p>
              <p className="text-white/90 text-sm">Paraben Free</p>
              <p className="text-white/90 text-sm">Silicone Free</p>
            </div>
          </BlurCard>
        </div>
      </div>
    </div>
  );
}
