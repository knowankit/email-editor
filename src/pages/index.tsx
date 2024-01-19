import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import EditorSkeletonLoader from "@/components/editor-skeleton-loader";

const EmailEditor = dynamic(() => import("@/components"), {
  ssr: false,
  loading: () => <EditorSkeletonLoader />
});

const EmailEditorPage = () => {
  return (
    <Box
      sx={{
        height: "100vh"
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ANALYTICS}', {
                page_path: window.location.pathname
              });
            `
          }}
        />
      </Head>
      <EmailEditor />
    </Box>
  );
};

export default EmailEditorPage;
