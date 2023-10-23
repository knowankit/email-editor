import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

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
        <Box display="flex">Layout</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Layout;
