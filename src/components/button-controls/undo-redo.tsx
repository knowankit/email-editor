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

  const isUndoDisabled = !history.length || currentHistoryIndex === -1;
  const isRedoDisabled =
    !history.length || currentHistoryIndex === history.length - 1;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        // Prevent the default browser undo action
        event.preventDefault();
        if (!isUndoDisabled) undoEmail();
      }

      // Check if CMD/CTRL key is held down and 'Y' is pressed for redo
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        // Prevent the default browser redo action
        event.preventDefault();

        if (!isRedoDisabled) redoEmail();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isUndoDisabled, isRedoDisabled]);

  const getTitle = (key: "undo" | "redo") => {
    if (key == "undo") {
      return (
        <Box>
          <Box component="span" mr="0.5rem">
            Undo
          </Box>
          <Box component="kbd">ctrl/cmd + z</Box>
        </Box>
      );
    }

    return (
      <Box>
        <Box component="span" mr="0.5rem">
          Redo
        </Box>
        <Box component="kbd">ctrl/cmd + y</Box>
      </Box>
    );
  };

  return (
    <Box>
      <Tooltip title={getTitle("undo")} placement="top" arrow>
        <Box component="span">
          <IconButton
            aria-label="Undo"
            disabled={isUndoDisabled}
            onClick={undoEmail}
          >
            <UndoIcon />
          </IconButton>
        </Box>
      </Tooltip>
      <Tooltip title={getTitle("redo")} placement="top" arrow>
        <Box component="span">
          <IconButton
            aria-label="Redo"
            disabled={isRedoDisabled}
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
