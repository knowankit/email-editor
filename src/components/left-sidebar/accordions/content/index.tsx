import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import ImageIcon from "@mui/icons-material/Image";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import TitleIcon from "@mui/icons-material/Title";
import Box from "@mui/material/Box";
import ElementCard from "@/components/left-sidebar/drag/element-card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PiCodeBlockFill } from "react-icons/pi";
import { useState } from "react";

const elements = [
  {
    tagName: "mj-image",
    icon: <ImageIcon />,
    text: "Image"
  },
  {
    tagName: "mj-text",
    icon: <TitleIcon />,
    text: "Text"
  },
  {
    tagName: "mj-hero",
    icon: <PiCodeBlockFill fontSize="1.5rem" />,
    text: "Hero"
  },
  {
    tagName: "mj-button",
    icon: <SmartButtonIcon />,
    text: "Button"
  }
];

const Content = () => {
  const [expanded, setExpanded] = useState("content");

  return (
    <Accordion
      expanded={expanded === "content"}
      onChange={() => setExpanded(expanded === "content" ? "" : "content")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="content">
        <Typography fontSize="0.8rem">Content</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexWrap="wrap">
          {elements.map((element, index) => (
            <Paper
              elevation={2}
              sx={{
                m: "0.4rem",
                flex: "1 1 calc(33.33% - 1rem)",
                maxWidth: "calc(33.33% - 1rem)"
              }}
              key={index}
            >
              <ElementCard element={element} index={index} key={index} />
            </Paper>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Content;
