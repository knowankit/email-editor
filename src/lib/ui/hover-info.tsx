import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import modifyObjectData from "@/lib/util/modify-data-object";
import useEmailDataStore from "@/store/email";

interface IHoverInfo {
  section: any;
  path: string;
}

const defaultStyle = {
  position: "absolute",
  top: "0px",
  left: "-5px",
  background: "white",
  color: "black",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "20px"
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

const removeFromArray = (object: any, path: string) => {
  // Extract the index from the last character of the path
  const index = parseInt(path.slice(-1));

  // Split the path into segments
  const segments = path.split(".");

  // Start with the root object
  let current = object;

  // Traverse the path and remove the element at the specified index
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    current = current[segment];
  }

  // Remove the element at the specified index from the array
  if (Array.isArray(current)) {
    current.splice(index, 1);
  }

  return object;
};

const HoverInfo = ({ section, path }: IHoverInfo) => {
  const { emailData, setEmailData } = useEmailDataStore();

  const handleDelete = () => {
    const data = removeFromArray(emailData, path);

    setEmailData(data);
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
