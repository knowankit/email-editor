import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextAttributesAccordionType } from "@/types/email-editor.types";
import TextField from "@mui/material/TextField";
import useEmailStore from "@/store/email";
import { useState } from "react";
import { Button } from "@mui/material";

interface ISetting {
  expanded: TextAttributesAccordionType;
  changeTab: (value: TextAttributesAccordionType) => void;
}

const Dimension = ({ expanded, changeTab }: ISetting) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    width: attributes["width"],
    height: attributes["height"],
    "padding-top": attributes["padding-top"],
    "padding-bottom": attributes["padding-bottom"],
    "padding-left": attributes["padding-left"],
    "padding-right": attributes["padding-right"]
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
      expanded={expanded === "dimension"}
      onChange={() => changeTab(expanded === "dimension" ? "" : "dimension")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="dimension">
        <Typography fontSize="0.8rem">Dimension</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          size="small"
          sx={{ width: "100%" }}
        />
        <Box component="p">Padding</Box>
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Top"
            size="small"
            name="padding-top"
            onChange={handleChange}
            value={formData["padding-top"]}
            type="number"
            multiline
            maxRows={4}
            sx={{ width: "45%" }}
          />
          <TextField
            label="Right"
            size="small"
            name="padding-right"
            multiline
            onChange={handleChange}
            value={formData["padding-right"]}
            type="number"
            maxRows={4}
            sx={{ width: "45%" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <TextField
            label="Bottom"
            size="small"
            name="padding-bottom"
            onChange={handleChange}
            value={formData["padding-bottom"]}
            type="number"
            multiline
            maxRows={4}
            sx={{ width: "45%" }}
          />
          <TextField
            type="number"
            onChange={handleChange}
            name="padding-left"
            label="Left"
            value={formData["padding-left"]}
            size="small"
            multiline
            maxRows={4}
            sx={{ width: "45%" }}
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

export default Dimension;
