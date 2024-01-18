import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import "src/styles/globals.css";
import theme from "../styles/theme";
import NextNProgress from "nextjs-progressbar";
import SnackBar from "@/lib/ui/snackbar";
import ErrorBoundary from "@/pages/error-boundary";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "@/lib/util/analytics";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    const handleRouteChange = () => {
      logPageView();
    };

    // When the component is mounted, subscribe to router changes
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <SnackBar />
          <NextNProgress color="#00AB55" />
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  );
}
