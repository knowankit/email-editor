import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Box } from "@mui/material";
import useEmailStore from "@/store/email";
import CreateTemplateButton from "@/components/email-editor/drop-container/create-template-button";
import useEmailHistoryStore from "@/store/email-history";
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
  const { emailData, resetEmailData } = useEmailStore();

  const {
    redoStack,
    undoStack,
    popFromUndoStack,
    popFromRedoStack,
    resetStack
  } = useEmailHistoryStore();

  const undoEmail = () => {
    popFromUndoStack();
  };

  const redoEmail = () => {
    popFromRedoStack();
  };

  return (
    <Box
      sx={{
        width: "inherit",
        backgroundColor: "white",
        height: "52px",
        textAlign: "center",
        borderBottom: "0px solid #e5e6ec",
        borderTop: "2px solid #e5e6ec",
        display: "flex"
      }}
    >
      <Box
        sx={{
          flex: 1
        }}
      >
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
      <Box
        ml={4}
        sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton
            aria-label="undo"
            disabled={!undoStack.length}
            onClick={undoEmail}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            aria-label="redo"
            disabled={!redoStack.length}
            onClick={redoEmail}
          >
            <RedoIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            aria-label="reset"
            disabled={!emailData["children"].length}
            onClick={() => {
              resetEmailData();
              resetStack();
            }}
          >
            <ResetTvIcon />
          </IconButton>
          <CreateTemplateButton />
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveControl;
