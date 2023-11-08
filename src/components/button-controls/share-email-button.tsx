import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ShareModal = dynamic(() => import("@/components/share-modal"), {
  ssr: false
});

const ShareEmailButton = () => {
  const [isOpen, setModalVisibility] = useState(false);
  const { status } = useSession();

  return (
    <>
      <IconButton
        color="secondary"
        className="step-7"
        size="small"
        disabled={!(status === "authenticated")}
        onClick={() => setModalVisibility(true)}
        sx={{ textTransform: "none", mr: "1rem" }}
      >
        <SendIcon />
      </IconButton>
      <ShareModal open={isOpen} onClose={val => setModalVisibility(val)} />
    </>
  );
};

export default ShareEmailButton;
