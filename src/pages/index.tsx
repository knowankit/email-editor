import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";

const EmailEditor = dynamic(() => import("@/components"), {
  ssr: false
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
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,800&family=Signika+Negative:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <EmailEditor />
    </Box>
  );
};

export default EmailEditorPage;
