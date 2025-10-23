import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { useRef } from 'react';
import { HouseOne, HouseTwo } from '../ui/Icons';
import { useFontReady } from '@/hook/useFontReady';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WhereToBuy() {
  const isFontReady = useFontReady();
  const sectionRef = useRef(null);
  const titleRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLHeadingElement>(null),
  };
  const imagesRef = {
    one: useRef<SVGSVGElement>(null),
    two: useRef<SVGSVGElement>(null),
  };
  const textRef = {
    one: useRef<HTMLParagraphElement>(null),
    two: useRef<HTMLParagraphElement>(null),
  };
  const addressRef = {
    one: useRef<HTMLParagraphElement>(null),
    two: useRef<HTMLParagraphElement>(null),
  };
  const phoneRef = {
    one: useRef<HTMLParagraphElement>(null),
    two: useRef<HTMLParagraphElement>(null),
  };
  const emailRef = {
    one: useRef<HTMLParagraphElement>(null),
    two: useRef<HTMLParagraphElement>(null),
  };

  useGSAP(() => {
    if (!sectionRef.current || !isFontReady) return;

    const addressOneSplit = new SplitText(addressRef.one.current, {
      type: 'words',
      mask: 'words',
    });
    const addressTwoSplit = new SplitText(addressRef.two.current, {
      type: 'words',
      mask: 'words',
    });

    const scrolltrigger = {
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      toggleActions: 'play reverse play reverse',
    };

    const tl = gsap.timeline({
      scrollTrigger: scrolltrigger,
    });

    tl.from([titleRef.subtitle.current, titleRef.title.current], {
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(
        [imagesRef.one.current, imagesRef.two.current],
        {
          y: 20,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<+0.1',
      )
      .from(
        [textRef.one.current, textRef.two.current],
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<+0.1',
      )
      .from(
        [addressOneSplit.words, addressTwoSplit.words],
        {
          y: 20,
          opacity: 0,
          duration: 1.2,
          stagger: 0.01,
          ease: 'power2.out',
        },
        '<+0.1',
      )
      .from(
        [phoneRef.one.current, phoneRef.two.current],
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<+0.5',
      )
      .from(
        [emailRef.one.current, emailRef.two.current],
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<+0.2',
      );
  }, [isFontReady]);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-dvh flex-col items-center justify-between gap-12 bg-white px-4 py-16 md:gap-16 md:py-32"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-8">
        <h2
          ref={titleRef.subtitle}
          className="text-sm font-normal text-orange-500 sm:text-base lg:text-lg"
        >
          [ WHERE TO BUY? ]
        </h2>
        <h3 ref={titleRef.title} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
          Buy our products <br /> in stores
        </h3>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:gap-8">
        <div className="flex h-full max-w-2/3 flex-col items-center justify-start gap-4 md:gap-8">
          <HouseOne
            ref={imagesRef.one}
            className="h-32 w-auto fill-black/30 transition-colors hover:fill-orange-500 md:h-46"
          />
          <h2
            ref={textRef.one}
            className="text-xs font-normal text-orange-500 sm:text-base lg:text-lg"
          >
            [ STORE-1 ]
          </h2>
          <h3
            ref={addressRef.one}
            className="h-16 min-h-fit text-center text-lg text-pretty sm:text-3xl md:text-4xl lg:h-32"
          >
            Career Mallorca, 123, 08036 Barcelona, Spain
          </h3>
          <p ref={phoneRef.one} className="text-xs font-normal sm:text-base lg:text-lg">
            +34 123 456 789
          </p>
          <p ref={emailRef.one} className="text-xs font-normal sm:text-base lg:text-lg">
            info@minimalist.com
          </p>
        </div>
        <div className="flex h-full max-w-2/3 flex-col items-center justify-start gap-4 md:gap-8">
          <HouseTwo
            ref={imagesRef.two}
            className="h-32 w-auto fill-black/30 transition-colors hover:fill-orange-500 md:h-46"
          />
          <h2
            ref={textRef.two}
            className="text-xs font-normal text-orange-500 sm:text-base lg:text-lg"
          >
            [ STORE-2 ]
          </h2>
          <h3
            ref={addressRef.two}
            className="h-16 min-h-fit text-center text-lg text-pretty sm:text-3xl md:text-4xl lg:h-32"
          >
            123 Oxford Street, London, W1D 1LU, United Kingdom
          </h3>
          <p ref={phoneRef.two} className="text-xs font-normal sm:text-base lg:text-lg">
            +44 20 1234 5678
          </p>
          <p ref={emailRef.two} className="text-xs font-normal sm:text-base lg:text-lg">
            info@minimalist.com.uk
          </p>
        </div>
      </div>
    </section>
  );
}
