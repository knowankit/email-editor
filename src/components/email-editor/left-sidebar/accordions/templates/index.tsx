import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";

import useTemplatesStore from "@/store/templates";
import useEmailDataStore, { initialState } from "@/store/email";
import EChip from "@/components/email-editor/left-sidebar/accordions/templates/echip";

const Templates = () => {
  const [expanded, setExpanded] = useState("templates");
  const { templates, deleteTemplate } = useTemplatesStore();
  const { setEmailData } = useEmailDataStore();

  const handleClick = (index: number) => {
    setEmailData(templates[index]);
  };

  const handleDelete = (index: number) => {
    deleteTemplate(index);
    setEmailData(initialState.emailData);
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
            <Alert severity="info">Added templates will be shown here</Alert>
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
