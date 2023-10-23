import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "src/styles/globals.css";
import theme from "../styles/theme";
import NextNProgress from 'nextjs-progressbar';
import Snackar from '@/lib/ui/snackbar'
import ErrorBoundary from "@/pages/error-boundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Snackar />
        <NextNProgress color="#00AB55" />
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
