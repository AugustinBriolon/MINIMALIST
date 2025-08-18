import { useCallback } from 'react';
import { SplitText } from 'gsap/SplitText';

export const useSplitTextWrapper = () => {
  const wrapSplitTextLines = useCallback((splitText: SplitText) => {
    splitText.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'overflow-hidden';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  }, []);

  return { wrapSplitTextLines };
};
