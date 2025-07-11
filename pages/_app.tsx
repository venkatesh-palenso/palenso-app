import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider } from '@/components/UserProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='palenso-theme'>
      <UserProvider>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
}
