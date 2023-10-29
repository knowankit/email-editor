import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Box } from "@mui/material";
import useEmailStore from "@/store/email";
import { useState } from "react";
import CreateTemplateButton from "@/components/email-editor/drop-container/create-template-button";

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
  const [isOpen, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const { emailData, resetEmailData } = useEmailStore();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "inherit",
        backgroundColor: "white",
        height: "48px",
        textAlign: "center",
        borderBottom: "2px solid #e5e6ec",
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
          <IconButton aria-label="undo" disabled>
            <UndoIcon />
          </IconButton>
          <IconButton aria-label="redo" disabled>
            <RedoIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            aria-label="reset"
            disabled={!emailData["children"].length}
            onClick={resetEmailData}
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
