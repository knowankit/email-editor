import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import { Typography, Box, TextField } from "@mui/material";
import { TextAttributesAccordionType } from "@/types/email-editor.types";
import { useState } from "react";
import useEmailStore from "@/store/email";

interface IBorder {
  expanded: TextAttributesAccordionType;
  changeTab: (value: TextAttributesAccordionType) => void;
}

const Extra = ({ expanded, changeTab }: IBorder) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    "css-class": attributes["css-class"]
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Accordion
      expanded={expanded === "extra"}
      onChange={() => changeTab(expanded === "extra" ? "" : "extra")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="extra">
        <Typography fontSize="0.8rem">Extra</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">
          <TextField
            label="Class name"
            name="css-class"
            value={formData["css-class"]}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%" }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Extra;
