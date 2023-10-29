import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import useTemplatesStore from "@/store/templates";
import EChip from "@/components/email-editor/left-sidebar/accordions/templates/echip";

const Templates = () => {
  const [expanded, setExpanded] = useState("templates");
  const { templates, deleteTemplate } = useTemplatesStore();

  const handleClick = (index: number) => {};
  const handleDelete = (index: number) => {
    deleteTemplate(index);
  };

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
          {!templates.length && (
            <Paper elevation={2} sx={{ p: 2 }}>
              Added tempaltes will be shown here
            </Paper>
          )}

          {templates.map((t, index) => {
            return (
              <EChip
                key={index}
                template={t}
                handleClick={() => handleClick(index)}
                handleDelete={() => handleDelete(index)}
              />
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Templates;
