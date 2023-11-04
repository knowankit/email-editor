import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

interface ImagePreview {
  formData: {
    "background-url": string;
  };
  height?: string;
  width?: string;
}

const ImagePreview = ({
  formData,
  height = "100px",
  width = "100px"
}: ImagePreview) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box
      sx={{
        height,
        width,
        marginRight: "1rem",
        backgroundImage: `url("${formData["background-url"]}")`,
        backgroundSize: "cover"
      }}
    >
      <Box
        height="inherit"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          aria-label="view image"
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          <VisibilityIcon fontSize="small" sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {isOpen && (
        <Dialog open={isOpen} onClose={() => setOpen(false)}>
          <DialogContent
            sx={{
              backgroundImage: `url("${formData["background-url"]}")`,
              backgroundSize: "cover",
              height: "31.25rem",
              width: "31.25rem"
            }}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default ImagePreview;
