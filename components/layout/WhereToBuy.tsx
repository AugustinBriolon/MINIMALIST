import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import { HouseOne, HouseTwo } from '../ui/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function WhereToBuy() {
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
    if (!sectionRef.current) return;

    const scrolltrigger = {
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 30%',
      toggleActions: 'play reverse play reverse',
    };

    gsap.from([titleRef.subtitle.current, titleRef.title.current], {
      scrollTrigger: scrolltrigger,
      y: 100,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from([imagesRef.one.current, imagesRef.two.current], {
      scrollTrigger: scrolltrigger,
      y: 80,
      opacity: 0,
      stagger: 0.1,
    });

    gsap.from([textRef.one.current, textRef.two.current], {
      scrollTrigger: scrolltrigger,
      y: 80,
      opacity: 0,
      stagger: 0.1,
    });

    gsap.from([addressRef.one.current, addressRef.two.current], {
      scrollTrigger: scrolltrigger,
      y: 80,
      opacity: 0,
      stagger: 0.1,
    });

    gsap.from([phoneRef.one.current, phoneRef.two.current], {
      scrollTrigger: scrolltrigger,
      y: 80,
      opacity: 0,
      stagger: 0.1,
    });

    gsap.from([emailRef.one.current, emailRef.two.current], {
      scrollTrigger: scrolltrigger,
      y: 80,
      opacity: 0,
      stagger: 0.1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-dvh flex-col items-center justify-between gap-16 bg-white px-4 py-32"
    >
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <h2 ref={titleRef.subtitle} className="text-lg text-orange-500">
          [ WHERE TO BUY? ]
        </h2>
        <h3 ref={titleRef.title} className="text-6xl">
          Buy our products <br /> in stores
        </h3>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
        <div className="flex h-full max-w-2/3 flex-col items-center justify-center gap-8">
          <HouseOne
            ref={imagesRef.one}
            className="h-46 w-auto fill-black/30 transition-colors hover:fill-orange-500"
          />
          <h2 ref={textRef.one} className="text-lg text-orange-500">
            [ STORE-1 ]
          </h2>
          <h3
            ref={addressRef.one}
            className="flex h-44 max-h-fit items-start justify-center text-center text-4xl text-pretty lg:h-32"
          >
            Career Mallorca, 123, 08036 Barcelona, Spain
          </h3>
          <p ref={phoneRef.one}>+34 123 456 789</p>
          <p ref={emailRef.one}>info@minimalist.com</p>
        </div>
        <div className="flex h-full max-w-2/3 flex-col items-center justify-center gap-8">
          <HouseTwo
            ref={imagesRef.two}
            className="h-46 w-auto fill-black/30 transition-colors hover:fill-orange-500"
          />
          <h2 ref={textRef.two} className="text-lg text-orange-500">
            [ STORE-2 ]
          </h2>
          <h3
            ref={addressRef.two}
            className="flex h-44 max-h-fit items-start justify-center text-center text-4xl text-pretty lg:h-32"
          >
            123 Oxford Street, London, W1D 1LU, United Kingdom
          </h3>
          <p ref={phoneRef.two}>+44 20 1234 5678</p>
          <p ref={emailRef.two}>info@minimalist.com.uk</p>
        </div>
      </div>
    </section>
  );
}
