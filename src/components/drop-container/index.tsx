import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import useEmailStore from "@/store/email";
import { useState } from "react";
import ResponsiveControl from "@/components/drop-container/responsive-control";
import PreviewMode from "@/components/drop-container/preview-mode";
import useEmailHistoryStore from "@/store/email-history";
import EditMode from "@/components/drop-container/edit-mode";
import InboxIcon from "@mui/icons-material/Inbox";

const style = {
  width: "50vw",
  border: "2px solid #e5e6ec",
  overflowY: "scroll",
  bgcolor: "#f4f4f4",
  display: "flex",
  alignItems: "center",
  height: "100%",
  flexDirection: "column"
};

const DropContainer = () => {
  const { emailData, setEmailData, pushTagElement } = useEmailStore();
  const { pushToUndoStack } = useEmailHistoryStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentView, setCurrentView] = useState<
    "edit" | "preview" | "desktop-preview"
  >("edit");
  const [isMobile, setIsMobile] = useState(false);

  const [collectedProps, drop] = useDrop(() => ({
    accept: ["mj-section", "mj-hero"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        pushToUndoStack(emailData);
        pushTagElement(item["type"], item["keys"]);
      }
    }
  }));

  const handleSequence = (direction: "up" | "down") => {
    const emailDataClone = { ...emailData };

    const sections = emailDataClone.children;
    if (direction === "up" && currentIndex > 0) {
      // Move the element up by swapping it with the previous element
      const temp = sections[currentIndex];
      sections[currentIndex] = sections[currentIndex - 1];
      sections[currentIndex - 1] = temp;
    } else if (direction === "down" && currentIndex < sections.length - 1) {
      // Move the element down by swapping it with the next element
      const temp = sections[currentIndex];
      sections[currentIndex] = sections[currentIndex + 1];
      sections[currentIndex + 1] = temp;
    }

    emailDataClone.children = sections;
    setEmailData(emailDataClone);
  };

  return (
    <Box display="flex" flexDirection="column">
      <ResponsiveControl
        setCurrentView={setCurrentView}
        setIsMobile={setIsMobile}
        currentView={currentView}
      />
      <Box sx={style} ref={drop}>
        {currentView == "edit" && <EditMode />}
        {["preview", "desktop-preview"].includes(currentView) && (
          <PreviewMode isMobile={isMobile} />
        )}
        {currentView == "edit" && (
          <Box
            sx={{
              height: "200px",
              width: "600px",
              border: "2px dashed grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              mt: 1
            }}
          >
            <InboxIcon /> Drop Hero or Section or Wrapper here
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DropContainer;
