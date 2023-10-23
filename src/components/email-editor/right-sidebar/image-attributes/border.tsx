import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";

interface IBorder {
  expanded: ImageAttributesAccordionType;
  changeTab: (value: ImageAttributesAccordionType) => void;
}

const Border = ({ expanded, changeTab }: IBorder) => {
  return (
    <Accordion
      expanded={expanded === "border"}
      onChange={() => changeTab(expanded === "border" ? "" : "border")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="border">
        <Typography fontSize="0.8rem">Border</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">Border</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Border;
