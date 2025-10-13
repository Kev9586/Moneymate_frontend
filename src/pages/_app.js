import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import '../lib/firebase'; // Initialize Firebase
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppErrorBoundary from '../components/organisms/AppErrorBoundary';
import OfflineBanner from '../components/molecules/OfflineBanner';
import { ToastProvider } from '../context/ToastContext';
import muiTheme from '../styles/muiTheme';
import createEmotionCache from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

  return (
    <CacheProvider value={emotionCache}>
      <AppErrorBoundary>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ToastProvider>
            <OfflineBanner />
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </ToastProvider>
        </ThemeProvider>
      </AppErrorBoundary>
    </CacheProvider>
  );
}