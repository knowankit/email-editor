import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SourceAccordionType } from "@/types/email-editor.types";

interface ILayout {
  expanded: SourceAccordionType;
  handleChange: (value: SourceAccordionType) => void;
}

const MjmlSource = ({ expanded, handleChange }: ILayout) => {
  return (
    <Accordion
      expanded={expanded === "mjml"}
      onChange={() => handleChange(expanded === "mjml" ? "" : "mjml")}
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
