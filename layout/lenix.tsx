import gsap from 'gsap';
import { LenisRef, ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

function SmoothScrolling({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} options={{ lerp: 0.1, duration: 1.5 }} root>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
