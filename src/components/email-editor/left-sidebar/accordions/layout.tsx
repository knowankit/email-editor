import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { TbSection } from "react-icons/tb";
import { FcAddColumn } from "react-icons/fc";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ElementCard from "@/components/email-editor/left-sidebar/drag/element-card";

const elements = [
  {
    tagName: "mj-section",
    icon: <TbSection fontSize="1.5rem" />,
    text: "Section"
  },
  {
    tagName: "mj-column",
    icon: <FcAddColumn fontSize="1.5rem" />,
    text: "Column"
  }
];

const Layout = () => {
  const [expanded, setExpanded] = useState("layout");

  return (
    <Accordion
      expanded={expanded === "layout"}
      onChange={() => setExpanded(expanded === "layout" ? "" : "layout")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="content">
        <Typography fontSize="0.8rem">Layout</Typography>
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

export default Layout;
