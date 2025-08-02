// next
import type { AppProps } from "next/app";

// providers
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/user";
import { SWRConfig } from "swr";

// styles
import "@/styles/globals.css";

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SWRConfig
        value={{
          errorRetryCount: 1,
          errorRetryInterval: 1000,
          onError: (error) => {
            // Only log errors in development, and only for actual errors
            if (process.env.NODE_ENV === 'development' && error.message) {
              console.warn('SWR Error:', error.message);
            }
          },
        }}
      >
        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}
