import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import { Box } from "@mui/material";
interface IResponsiveControl {
  setCurrentView: (view: currentView) => void;
  setIsMobile: (val: boolean) => void;
  currentView: currentView;
}

type currentView = "edit" | "preview" | "desktop-preview";

const ResponsiveControl = ({
  setCurrentView,
  setIsMobile,
  currentView
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
          color={currentView == "edit" ? "primary" : "default"}
          onClick={() => {
            setCurrentView("edit");
            setIsMobile(false);
          }}
        >
          <ComputerIcon />
        </IconButton>
        <IconButton
          aria-label="mobile"
          color={currentView == "preview" ? "primary" : "default"}
          onClick={() => {
            setCurrentView("preview");
            setIsMobile(true);
          }}
        >
          <SmartphoneIcon />
        </IconButton>
        <IconButton
          aria-label="preview"
          color={currentView == "desktop-preview" ? "primary" : "default"}
          onClick={() => {
            setCurrentView("desktop-preview");
            setIsMobile(false);
          }}
        >
          <PreviewIcon />
        </IconButton>
      </Box>
      <Box ml={4}>
        <IconButton aria-label="delete" disabled>
          <UndoIcon />
        </IconButton>
        <IconButton aria-label="delete" disabled>
          <RedoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResponsiveControl;
