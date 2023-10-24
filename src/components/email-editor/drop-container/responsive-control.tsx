import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import { Box } from "@mui/material";
import useEmailStore from "@/store/email";

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
  const { emailData } = useEmailStore();

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
          disabled={!emailData["children"].length}
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
          disabled={!emailData["children"].length}
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
        <IconButton aria-label="undo" disabled>
          <UndoIcon />
        </IconButton>
        <IconButton aria-label="redo" disabled>
          <RedoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResponsiveControl;
