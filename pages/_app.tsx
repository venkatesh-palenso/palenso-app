import "@/styles/globals.css";
import * as React from 'react';
import type { AppProps } from "next/app";

import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';

import theme, { roboto, inter } from '@/lib/theme';
import Layout from '@/components/Layout';

// Create emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        
        <div className={`${roboto.variable} ${inter.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}



