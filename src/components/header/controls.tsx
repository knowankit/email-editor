import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import OnlineOfflineStatus from "@/components/header/online-offline-status";
import IntroButton from "@/components/header/intro-button";
import GithubAuth from "@/components/header/github-auth";
import { useSession } from "next-auth/react";

const FullScreenPreview = dynamic(() => import("@/components/share-modal"), {
  ssr: false
});

const Controls = () => {
  const { status } = useSession();

  const [isOpen, setModalVisibility] = useState(false);

  return (
    <Box mb={"1rem"} display="flex" justifyContent="space-between">
      <Box display="flex">
        <IntroButton />
        <OnlineOfflineStatus />
        <Button
          color="secondary"
          size="small"
          disabled={!(status === "authenticated")}
          onClick={() => setModalVisibility(true)}
          startIcon={<SendIcon />}
          sx={{ textTransform: "none", mr: "1rem" }}
        >
          Share
        </Button>
        <GithubAuth />
      </Box>

      <Link
        component="a"
        fontSize="0.875rem"
        href="https://github.com/knowankit/email-editor"
        sx={{
          textTransform: "none",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          color: "black"
        }}
      >
        <GitHubIcon />
      </Link>
      <FullScreenPreview
        open={isOpen}
        onClose={val => setModalVisibility(val)}
      />
    </Box>
  );
};

export default Controls;
