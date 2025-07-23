// next
import type { AppProps } from "next/app";

// providers
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/user";

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
      <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
    </ThemeProvider>
  );
}
