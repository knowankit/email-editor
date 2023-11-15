import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import { Typography, TextField } from "@mui/material";
import { ButtonAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import { useState } from "react";
import { debounce } from "lodash";

interface IBorder {
  expanded: ButtonAttributesAccordionType;
  changeTab: (value: ButtonAttributesAccordionType) => void;
}

const Border = ({ expanded, changeTab }: IBorder) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;

  const defaultAttributes = section.attributes;
  const [formData, setFormData] = useState({
    border: defaultAttributes["border"],
    "border-radius": defaultAttributes["border-radius"]
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newAttributes = {
      ...defaultAttributes,
      ...formData,
      [name]: value
    };
    setFormData(newAttributes);
    debouncedApplyChanges(newAttributes);
  };

  const debouncedApplyChanges = debounce(newAttributes => {
    applyChanges(newAttributes);
  }, 400);

  const applyChanges = (newAttributes: any) => {
    updateAttributes(newAttributes, activeNode.path);
  };

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
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Border"
            size="small"
            name="border"
            onChange={handleChange}
            value={formData["border"]}
            sx={{ width: "45%" }}
          />
          <TextField
            label="Border radius"
            size="small"
            name="border-radius"
            multiline
            onChange={handleChange}
            value={formData["border-radius"]}
            sx={{ width: "45%" }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Border;
