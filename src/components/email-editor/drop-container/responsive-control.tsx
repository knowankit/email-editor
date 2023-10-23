import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import { Box } from "@mui/material";
interface IResponsiveControl {
  setCurrentView: (view: string) => void;
  setIsMobile: (val: boolean) => void;
}

const ResponsiveControl = ({
  setCurrentView,
  setIsMobile
}: IResponsiveControl) => {
  return (
    <Box
      sx={{
        width: "inherit",
        backgroundColor: "white",
        height: "50px",
        textAlign: "center",
        borderBottom: "2px solid #e5e6ec",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Box>
        <IconButton
          aria-label="desktop"
          onClick={() => {
            setCurrentView("edit");
            setIsMobile(false);
          }}
        >
          <ComputerIcon />
        </IconButton>
        <IconButton
          aria-label="mobile"
          onClick={() => {
            setCurrentView("preview");
            setIsMobile(true);
          }}
        >
          <SmartphoneIcon />
        </IconButton>
        <IconButton
          aria-label="preview"
          onClick={() => {
            setCurrentView("preview");
            setIsMobile(false);
          }}
        >
          <PreviewIcon />
        </IconButton>
      </Box>
      <Box ml={4}>
        <IconButton aria-label="delete">
          <UndoIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <RedoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResponsiveControl;
