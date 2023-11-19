import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useEmailStore from "@/store/email";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

const Dimension = () => {
  const [expanded, setExpanded] = useState("dimension");

  const {
    activeNode,
    updateAttributes,
    updateActiveNodeAttributes
  } = useEmailStore();
  const { section } = activeNode;
  const defaultAttributes = section.attributes;

  const [formData, setFormData] = useState({
    width: defaultAttributes["width"],
    height: defaultAttributes["height"],
    "padding-top": defaultAttributes["padding-top"],
    "padding-bottom": defaultAttributes["padding-bottom"],
    "padding-left": defaultAttributes["padding-left"],
    "padding-right": defaultAttributes["padding-right"]
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

  const debouncedApplyChanges = useCallback(
    debounce(newAttributes => {
      applyChanges(newAttributes);
    }, 400),
    []
  );

  const applyChanges = (newAttributes: any) => {
    updateAttributes(newAttributes, activeNode.path);
    updateActiveNodeAttributes("attributes", newAttributes);
  };

  return (
    <Accordion
      expanded={expanded === "dimension"}
      onChange={() => setExpanded(expanded === "dimension" ? "" : "dimension")}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default Dimension;
