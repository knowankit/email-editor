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
import SpaceBarIcon from "@mui/icons-material/SpaceBar";

const Templates = () => {
  const [expanded, setExpanded] = useState("templates");

  return (
    <Accordion
      expanded={expanded === "templates"}
      onChange={() => setExpanded(expanded === "templates" ? "" : "templates")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="templates">
        <Typography fontSize="0.8rem">Templates</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexWrap="wrap">
          <h1>templates</h1>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Templates;
