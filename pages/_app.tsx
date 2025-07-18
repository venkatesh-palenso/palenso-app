import "@/styles/globals.css";

// react
import type { ReactElement, ReactNode } from "react";

// next
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// context
import { ThemeProvider, UserProvider } from "@/context";

// providers
import SWRProvider from "@/components/providers/swr-provider";

// type
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SWRProvider>
        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
      </SWRProvider>
    </ThemeProvider>
  );
}
