import ScreenLoader from '@/components/layout/ScreenLoader';
import { useIsScreenLoader } from '@/hook/useIsScreenLoader';
import SmoothScrolling from '@/layout/lenix';
import '@/styles/main.scss';
import 'lenis/dist/lenis.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const isScreenLoader = useIsScreenLoader();

  return (
    <>
      <SmoothScrolling>
        {isScreenLoader && <ScreenLoader />}
        <Component {...pageProps} />
      </SmoothScrolling>
    </>
  );
}
