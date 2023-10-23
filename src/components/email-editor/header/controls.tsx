import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import { useState } from "react";
import Alert from "@mui/material/Alert";
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
        <Alert severity="info">
          This project is currently under development, and there is a high
          likelihood of issues that I am actively addressing
        </Alert>
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
