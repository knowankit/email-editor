import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import { Typography, Box, TextField, Button } from "@mui/material";
import { TextAttributesAccordionType } from "@/types/email-editor.types";
import { useState } from "react";
import useEmailStore from "@/store/email";

interface IBorder {
  expanded: TextAttributesAccordionType;
  changeTab: (value: TextAttributesAccordionType) => void;
}

const Extra = () => {
  const [expanded, setExpanded] = useState("extra");

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

  const applyChanges = () => {
    const newAttributes = {
      ...attributes,
      ...formData
    };

    updateAttributes(newAttributes, activeNode.path);
  };

  return (
    <Accordion
      expanded={expanded === "extra"}
      onChange={() => setExpanded(expanded === "extra" ? "" : "extra")}
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
        <Box sx={{ mt: "1rem" }}>
          <Button size="small" variant="contained" onClick={applyChanges}>
            Apply
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Extra;
