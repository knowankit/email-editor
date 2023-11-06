import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { Box, IconButton, Tooltip } from "@mui/material";
import useEmailStore from "@/store/email";
import { useEffect } from "react";

const UndoRedo = () => {
  const {
    history,
    undoEmail,
    redoEmail,
    currentHistoryIndex
  } = useEmailStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        // Prevent the default browser undo action
        event.preventDefault();

        undoEmail();
      }

      // Check if CMD/CTRL key is held down and 'Y' is pressed for redo
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        // Prevent the default browser redo action
        event.preventDefault();
        redoEmail();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Box>
      <Tooltip title="Undo" placement="top" arrow>
        <Box component="span">
          <IconButton
            aria-label="Undo"
            disabled={!history.length || currentHistoryIndex === -1}
            onClick={undoEmail}
          >
            <UndoIcon />
          </IconButton>
        </Box>
      </Tooltip>
      <Tooltip title="Redo" placement="top" arrow>
        <Box component="span">
          <IconButton
            aria-label="Redo"
            disabled={
              !history.length || currentHistoryIndex === history.length - 1
            }
            onClick={redoEmail}
          >
            <RedoIcon />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default UndoRedo;
