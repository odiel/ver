import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';

import '../styles/globals.css'
import { theme, createEmotionCache } from '../setup/';
import { storeWrapper } from '../business';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = {
    emotionCache: EmotionCache
} & AppProps

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
      <CacheProvider value={emotionCache}>
          <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
      </CacheProvider>
  )
}

export default storeWrapper.withRedux(MyApp);
