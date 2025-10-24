import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

const globalScrollState = {
  isLocked: false,
  listeners: new Set<() => void>(),
};

const notifyListeners = () => {
  globalScrollState.listeners.forEach((listener) => listener());
};

const updateScrollState = (isLocked: boolean) => {
  globalScrollState.isLocked = isLocked;
  notifyListeners();
};

export const useScroll = () => {
  const [isLocked, setIsLocked] = useState(globalScrollState.isLocked);
  const lenis = useLenis();

  useEffect(() => {
    const listener = () => setIsLocked(globalScrollState.isLocked);
    globalScrollState.listeners.add(listener);
    return () => {
      globalScrollState.listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const lockScroll = (shouldLock: boolean) => {
    if (shouldLock) {
      lenis?.scrollTo(0, { immediate: true });
      lenis?.stop();
      updateScrollState(true);
    } else {
      lenis?.start();
      updateScrollState(false);
    }
  };

  return { isLocked, lockScroll };
};
