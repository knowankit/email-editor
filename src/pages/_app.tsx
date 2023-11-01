import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "src/styles/globals.css";
import theme from "../styles/theme";
import NextNProgress from 'nextjs-progressbar';
import SnackBar from '@/lib/ui/snackbar'
import ErrorBoundary from "@/pages/error-boundary";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', {
          scope: '/'
        })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <SnackBar />
        <NextNProgress color="#00AB55" />
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
