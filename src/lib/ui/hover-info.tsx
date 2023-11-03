import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import useEmailDataStore from "@/store/email";

interface IHoverInfo {
  section: any;
  path: string;
}

const defaultStyle = {
  position: "absolute",
  top: "-35px",
  left: "-5px",
  background: "white",
  color: "black",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "20px",
  borderRadius: "10px"
};

const getTagName = (tagName: string) => {
  switch (tagName) {
    case "mj-button":
      return "Button";

    case "mj-text":
      return "Text";

    case "mj-section":
      return "Section";

    case "mj-column":
      return "Column";
    case "mj-hero":
      return "Hero";

    default:
      break;
  }
};

const HoverInfo = ({ section, path }: IHoverInfo) => {
  const { popTagElement } = useEmailDataStore();

  const handleDelete = () => {
    popTagElement(path);
  };

  return (
    <Box sx={defaultStyle}>
      {getTagName(section.tagName)}
      <IconButton aria-label="delete" size="small" onClick={handleDelete}>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Box>
  );
};

export default HoverInfo;
