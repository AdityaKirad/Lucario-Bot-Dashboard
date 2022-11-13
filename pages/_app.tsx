import '../styles/globals.css';
import '../styles/nprogress.css';
import "@fontsource/arvo";
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material';
import { theme } from "../utils/theme";
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import nProgress from 'nprogress';
import Router from 'next/router';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  useEffect(() => {
    const handleRouteStart = () => nProgress.start();
    const handleRouteDone = () => nProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeError", handleRouteDone);
    Router.events.on("routeChangeComplete", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeError", handleRouteDone);
      Router.events.off("routeChangeComplete", handleRouteDone);
    };
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <React.StrictMode>
            <Component {...pageProps} />
          </React.StrictMode>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default MyApp
