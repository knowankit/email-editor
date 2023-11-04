import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface ImagePreview {
  formData: {
    "background-url": string;
  };
  height?: string;
  handleImageChange: (data: any) => void;
  width?: string;
}

const ImagePreview = ({
  formData,
  handleImageChange,
  height = "100px",
  width = "100px"
}: ImagePreview) => {
  const [isOpen, setOpen] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  const handleClearImage = () => {
    handleImageChange({
      type: "background-url",
      value: ""
    });
  };

  return (
    <Box
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      sx={{
        height,
        width,
        marginRight: "1rem",
        backgroundColor: "#f1f1f1",
        backgroundImage: `url("${formData["background-url"]}")`,
        backgroundSize: "cover"
      }}
    >
      {formData["background-url"] && mouseEnter && (
        <Box
          height="inherit"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0, 0, 0, 0.5)"
          sx={{ cursor: "pointer" }}
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
          <IconButton
            aria-label="view image"
            size="small"
            onClick={handleClearImage}
          >
            <ClearIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </Box>
      )}
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
