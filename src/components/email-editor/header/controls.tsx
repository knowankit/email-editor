import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const FullScreenPreview = dynamic(
  () => import("@/components/email-editor/share-modal"),
  {
    ssr: false
  }
);

const Controls = () => {
  const [isOpen, setModalVisibility] = useState(false);

  return (
    <Box mb={"1rem"} display="flex" justifyContent="space-between">
      <Box>
        <IconButton aria-label="delete" size="small">
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box>
        <Button
          color="secondary"
          size="small"
          onClick={() => setModalVisibility(true)}
          startIcon={<SendIcon />}
          sx={{ textTransform: "none" }}
        >
          Share
        </Button>
      </Box>
      <FullScreenPreview
        open={isOpen}
        onClose={val => setModalVisibility(val)}
      />
    </Box>
  );
};

export default Controls;
