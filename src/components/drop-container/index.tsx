import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import SectionPreview from "../preview-items/section.preview";
import useEmailStore from "@/store/email";
import { useState } from "react";
import ResponsiveControl from "@/components/drop-container/responsive-control";
import PreviewMode from "@/components/drop-container/preview-mode";
import HeroPreview from "@/components/preview-items/hero.preview";
import useEmailHistoryStore from "@/store/email-history";

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

  const EditMode = () => {
    return (
      <Box sx={{ width: "600px", bgcolor: "white", mt: "2rem" }}>
        {emailData["children"].map((section: any, index: number) => {
          return (
            <Box key={index}>
              <Box aria-haspopup="true" sx={{ cursor: "pointer" }}>
                {section.tagName === "mj-section" && (
                  <SectionPreview
                    section={section}
                    path={`children.${index}`}
                    index={index}
                    key={index}
                  />
                )}

                {section.tagName === "mj-hero" && (
                  <HeroPreview
                    section={section}
                    index={index}
                    key={index}
                    path={`children.${index}`}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
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
      </Box>
    </Box>
  );
};

export default DropContainer;
