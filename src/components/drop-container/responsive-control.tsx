import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import IconButton from "@mui/material/IconButton";

import PreviewIcon from "@mui/icons-material/Preview";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Box, Tooltip } from "@mui/material";
import useEmailStore from "@/store/email";
import CreateTemplateButton from "@/components/drop-container/buttons/create-template-button";
import UndoRedoButton from "@/components/drop-container/buttons/undo-redo";

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

  const getTooltipTitle = (type: string) => {
    switch (type) {
      case "mobile": {
        if (!emailData["children"].length) {
          return "Please add any data";
        } else {
          return "Mobile view";
        }
      }
      case "desktop": {
        if (!emailData["children"].length) {
          return "Please add any data";
        } else {
          return "Desktop view";
        }
      }

      case "reset":
        {
          if (!emailData["children"].length) {
            return "Please add any data";
          } else {
            return "Reset";
          }
        }

        break;

      default:
        break;
    }
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
        className="step-4"
      >
        <Tooltip title="Edit view" placement="top" arrow>
          <Box component="span">
            <IconButton
              aria-label="edit view"
              color={currentView == "edit" ? "primary" : "default"}
              onClick={() => {
                setCurrentView("edit");
                setIsMobile(false);
              }}
            >
              <ComputerIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title={getTooltipTitle("mobile")} placement="top" arrow>
          <Box component="span">
            <IconButton
              aria-label="mobile view"
              disabled={!emailData["children"].length}
              color={currentView == "preview" ? "primary" : "default"}
              onClick={() => {
                setCurrentView("preview");
                setIsMobile(true);
              }}
            >
              <SmartphoneIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title={getTooltipTitle("desktop")} placement="top" arrow>
          <Box component="span">
            <IconButton
              aria-label="Desktop view"
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
        </Tooltip>
      </Box>
      <Box
        ml={4}
        sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
      >
        <UndoRedoButton />
        <Box>
          <Tooltip title={getTooltipTitle("reset")} placement="top" arrow>
            <Box component="span">
              <IconButton
                aria-label="reset"
                disabled={!emailData["children"].length}
                onClick={() => {
                  resetEmailData();
                }}
              >
                <ResetTvIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <CreateTemplateButton />
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveControl;
