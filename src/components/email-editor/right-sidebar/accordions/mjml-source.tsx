import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const MjmlSource = () => {
  const [expanded, setExpanded] = useState("mjml");

  return (
    <Accordion
      expanded={expanded === "mjml"}
      onChange={() => setExpanded(expanded === "mjml" ? "" : "mjml")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="content">
        <Typography fontSize="0.8rem">Mjml Source</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">Layout</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MjmlSource;
