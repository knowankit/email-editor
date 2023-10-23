import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccordionType } from "@/types/email-editor.types";

interface ILayout {
  expanded: AccordionType;
  handleChange: (value: AccordionType) => void;
}

const Layout = ({ expanded, handleChange }: ILayout) => {
  return (
    <Accordion
      expanded={expanded === "layout"}
      onChange={() => handleChange(expanded === "layout" ? "" : "layout")}
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
