import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import EditorSkeletonLoader from "@/components/editor-skeleton-loader";
import Script from "next/script";

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
      </Head>
      <EmailEditor />
    </Box>
  );
};

export default EmailEditorPage;
