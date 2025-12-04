import { useFontReady } from '@/hook/useFontReady';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ContentData {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const contentData: ContentData[] = [
  {
    id: '01',
    number: '[01]',
    title: 'Enhanced\nPerformance',
    description:
      'Our products deliver unparalleled performance, addressing a spectrum of concerns for both hair and skin types. From revitalizing damaged strands to rejuvenating tired complexions, we prioritize efficacy above all else.',
    image: '/images/ingredient1.webp',
  },
  {
    id: '02',
    number: '[02]',
    title: 'Scientific\nPrecision',
    description:
      'Backed by science, our formulations are meticulously crafted with proven ingredients that target specific skincare and haircare needs. We prioritize functionality, ensuring each product delivers optimal results without compromise.',
    image: '/images/ingredient2.webp',
  },
  {
    id: '03',
    number: '[03]',
    title: 'Versatility and\nAdaptability',
    description:
      "Whether you're seeking hydration, repair, or protection, our diverse range of products caters to a variety of concerns and preferences. With minimalist yet effective formulations, you can trust that our cosmetics will meet—and exceed— your expectations.",
    image: '/images/ingredient3.webp',
  },
];

export default function Performance() {
  const isFontReady = useFontReady();
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleSplitRefs = useRef<SplitText[]>([]);
  const descriptionSplitRefs = useRef<SplitText[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !isFontReady) return;

    const section = sectionRef.current;
    const numbers = numberRefs.current;
    const titles = titleRefs.current;
    const descriptions = descriptionRefs.current;
    const images = imageRefs.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * (contentData.length + 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
      },
    });

    titles.forEach((title, index) => {
      if (title) {
        const titleSplit = new SplitText(title, {
          type: 'words',
          mask: 'words',
        });
        titleSplitRefs.current[index] = titleSplit;
      }
    });

    descriptions.forEach((description, index) => {
      if (description) {
        const descriptionSplit = new SplitText(description, {
          type: 'words',
          mask: 'words',
        });
        descriptionSplitRefs.current[index] = descriptionSplit;
      }
    });

    titleSplitRefs.current.slice(1).forEach((titleSplit) => {
      if (titleSplit) {
        gsap.set(titleSplit.words, { yPercent: 100 });
      }
    });

    descriptionSplitRefs.current.slice(1).forEach((descriptionSplit) => {
      if (descriptionSplit) {
        gsap.set(descriptionSplit.words, { yPercent: 100 });
      }
    });

    gsap.set(numbers.slice(1), { yPercent: 100 });
    gsap.set(images.slice(1), { clipPath: 'inset(100% 0 0 0)' });

    contentData.forEach((_, index) => {
      if (index === 0) return;

      const duration = 1;
      const startTime = (index - 1) * duration;

      const prevTitleSplit = titleSplitRefs.current[index - 1];
      const prevDescriptionSplit = descriptionSplitRefs.current[index - 1];
      if (prevTitleSplit && prevDescriptionSplit) {
        tl.to(
          [prevTitleSplit.words, prevDescriptionSplit.words],
          {
            yPercent: -100,
            duration: duration * 0.5,
            ease: 'power2.in',
          },
          startTime,
        );
      }

      tl.to(
        [numbers[index - 1]],
        {
          yPercent: -100,
          duration: duration * 0.5,
          ease: 'power2.in',
        },
        startTime,
      ).to(
        images[index - 1],
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: duration * 0.7,
          ease: 'power2.inOut',
        },
        startTime + duration * 0.3,
      );

      const currentTitleSplit = titleSplitRefs.current[index];
      const currentDescriptionSplit = descriptionSplitRefs.current[index];
      if (currentTitleSplit && currentDescriptionSplit) {
        tl.to(
          [currentTitleSplit.words, currentDescriptionSplit.words],
          {
            yPercent: 0,
            opacity: 1,
            duration: duration * 0.5,
            ease: 'power2.out',
            stagger: 0.005,
          },
          startTime + duration * 0.5,
        );
      }

      tl.to(
        [numbers[index]],
        {
          yPercent: 0,
          opacity: 1,
          duration: duration * 0.5,
          ease: 'power2.out',
        },
        startTime + duration * 0.5,
      ).to(
        images[index],
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: duration * 0.7,
          ease: 'power2.inOut',
        },
        startTime + duration * 0.3,
      );
    });
  }, [isFontReady]);

  return (
    <div
      ref={sectionRef}
      className="flex h-dvh w-full flex-col items-center justify-center bg-white lg:flex-row"
      data-section="ingredients"
    >
      <div className="relative flex h-full w-full flex-col items-start justify-between md:w-1/2">
        {contentData.map((content, index) => (
          <div
            key={content.id}
            className={`absolute inset-0 flex h-full w-full flex-col items-start justify-between p-8 sm:p-12 md:p-16 lg:p-32 ${
              index === 0 ? 'relative' : ''
            }`}
          >
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
              <div className="overflow-hidden">
                <p
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="text-sm font-normal text-orange-500 sm:text-base lg:text-lg"
                >
                  {content.number}
                </p>
              </div>
              <h2
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="text-2xl leading-tight font-normal whitespace-pre-line sm:text-3xl md:text-4xl lg:text-6xl"
              >
                {content.title}
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                ref={(el) => {
                  descriptionRefs.current[index] = el;
                }}
                className="text-sm leading-relaxed font-light text-black/50 sm:text-base lg:text-lg"
              >
                {content.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-1/2 w-full min-w-1/2 md:w-1/2 lg:h-full">
        {contentData.map((content, index) => (
          <div
            key={`image-${content.id}`}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className={`absolute inset-0 h-full w-full ${index === 0 ? 'relative' : ''}`}
          >
            <Image
              alt={`Ingredients ${content.id}`}
              className="h-full w-full object-cover"
              height={1988}
              src={content.image}
              width={1600}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
