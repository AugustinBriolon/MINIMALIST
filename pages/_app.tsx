import ScreenLoader from '@/components/layout/ScreenLoader';
import { useIsScreenLoader } from '@/hook/useIsScreenLoader';
import SmoothScrolling from '@/layout/lenix';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const isScreenLoader = useIsScreenLoader();

  return (
    <>
      {isScreenLoader && <ScreenLoader />}
      <SmoothScrolling>
        <Component {...pageProps} />
      </SmoothScrolling>
    </>
  );
}
