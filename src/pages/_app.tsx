import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache, Global, css } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@/components/ui/theme/theme';
import { Globals } from '@/components/ui/theme/global.styles';
import createEmotionCache from '@/components/ui/theme/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export default function App(props: AppProps & { emotionCache?: EmotionCache }) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={css(Globals)} />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
