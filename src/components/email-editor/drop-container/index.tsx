import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import SectionPreview from "../preview-items/section.preview";
import useEmailStore from "@/store/email";
import { useState } from "react";
import Popper from "@/components/email-editor/popper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { getDefaultTags } from "@/lib/util/get-default-tags";
import ResponsiveControl from "@/components/email-editor/drop-container/responsive-control";
import PreviewMode from "@/components/email-editor/drop-container/preview-mode";
import HeroPreview from "@/components/email-editor/preview-items/hero.preview";

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
  const { emailData, setEmailData } = useEmailStore();
  const totalSection = emailData.children.length || 0;
  const [isPopperOpen, setPopperVisibility] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentView, setCurrentView] = useState("edit");
  const [isMobile, setIsMobile] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [collectedProps, drop] = useDrop(() => ({
    accept: ["mj-section", "mj-hero"],
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        addSection(item);
      }
    }
  }));

  const addSection = (item: any) => {
    let currentObjClone: any = { ...emailData };
    let currentObj = currentObjClone;
    const keys = item["keys"].split(".");

    for (let i = 0; i < keys.length; i++) {
      currentObj = currentObj[keys[i]];
    }

    if (item["type"] == "mj-section")
      currentObj.push(getDefaultTags("mj-section"));

    if (item["type"] == "mj-hero") currentObj.push(getDefaultTags("mj-hero"));

    setEmailData(currentObjClone);
  };

  const handlePopoverOpen = (event: any, index: number) => {
    if (isPopperOpen && event.currentTarget === anchorEl) {
      setCurrentIndex(index);
      setPopperVisibility(false);
      setAnchorEl(null);
      return;
    }

    setCurrentIndex(index);
    setPopperVisibility(true);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleDelete = () => {
    setPopperVisibility(false);
    const emailDataClone = { ...emailData };

    emailDataClone.children.splice(currentIndex, 1);
    setEmailData(emailDataClone);
  };

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
      <Box sx={{ width: "600px", bgcolor: "white" }}>
        {emailData["children"].map((section: any, index: number) => {
          const isDownDisabled = totalSection - 1 === currentIndex;
          const isUpDisabled = currentIndex === 0;

          return (
            <Box key={index}>
              <Box
                onClick={e => handlePopoverOpen(e, index)}
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                sx={{ cursor: "pointer" }}
              >
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
              <Popper open={isPopperOpen} anchorEl={anchorEl}>
                <Box display="flex" flexDirection="column">
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon
                      onClick={handleDelete}
                      fontSize="small"
                      color="warning"
                    />
                  </IconButton>
                  <IconButton
                    aria-label="upward"
                    size="small"
                    onClick={() => handleSequence("up")}
                    disabled={isUpDisabled}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="downward"
                    size="small"
                    onClick={() => handleSequence("down")}
                    disabled={isDownDisabled}
                  >
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Popper>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={style} ref={drop}>
      <ResponsiveControl
        setCurrentView={setCurrentView}
        setIsMobile={setIsMobile}
      />
      {currentView == "edit" && <EditMode />}
      {currentView == "preview" && <PreviewMode isMobile={isMobile} />}
    </Box>
  );
};

export default DropContainer;
