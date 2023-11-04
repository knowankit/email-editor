import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  return (
    <Box
      sx={{
        height,
        width,
        marginRight: "1rem",
        backgroundImage: `url("${formData["background-url"]}")`,
        backgroundSize: "cover",
        opacity: "0.8"
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
            alert("Show model with full image");
          }}
        >
          <VisibilityIcon fontSize="small" color="info" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImagePreview;
