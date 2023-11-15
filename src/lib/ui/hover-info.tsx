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
  top: "-30px",
  left: "-5px",
  background: "white",
  color: "black",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "20px",
  borderRadius: "10px",
  fontFamily: "Open Sans, sans-serif"
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
  const { popTagElement, activeNode } = useEmailDataStore();

  const handleDelete = () => {
    popTagElement(path);
  };

  const activeSectionId = activeNode && activeNode["section"]?.id;
  const currentSectionId = section.id;

  const showControls = activeSectionId === currentSectionId;

  return (
    <Box sx={defaultStyle}>
      <Box component="span" fontSize="0.8rem">
        {getTagName(section.tagName)}
      </Box>
      {showControls && (
        <IconButton aria-label="delete" size="small" onClick={handleDelete}>
          <DeleteIcon
            fontSize="small"
            sx={{ fontSize: "1rem" }}
            color="error"
          />
        </IconButton>
      )}
    </Box>
  );
};

export default HoverInfo;
