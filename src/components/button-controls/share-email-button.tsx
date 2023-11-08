import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useEmailDataStore from "@/store/email";

const ShareModal = dynamic(() => import("@/components/share-modal"), {
  ssr: false
});

const ShareEmailButton = () => {
  const [isOpen, setModalVisibility] = useState(false);
  const { status } = useSession();
  const { emailData } = useEmailDataStore();

  return (
    <>
      <IconButton
        color="secondary"
        className="step-7"
        size="small"
        disabled={
          !(status === "authenticated") || !emailData["children"].length
        }
        onClick={() => setModalVisibility(true)}
        sx={{ textTransform: "none", mr: "1rem" }}
      >
        <SendIcon />
      </IconButton>
      {status === "authenticated" && (
        <ShareModal open={isOpen} onClose={val => setModalVisibility(val)} />
      )}
    </>
  );
};

export default ShareEmailButton;
