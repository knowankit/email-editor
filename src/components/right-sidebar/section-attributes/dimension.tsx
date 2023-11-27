import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HeroAttributesAccordionType } from "@/types/email-editor.types";
import TextField from "@mui/material/TextField";
import useEmailStore from "@/store/email";
import { useState } from "react";
import { Button } from "@mui/material";
interface ISetting {
  expanded: HeroAttributesAccordionType;
  changeTab: (value: HeroAttributesAccordionType) => void;
}

const Dimension = ({ expanded, changeTab }: ISetting) => {
  const {
    activeNode,
    updateAttributes,
    updateActiveNodeAttributes
  } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    width: attributes["width"],
    "background-height": attributes["background-height"],
    // "background-position": attributes["background-position"],
    height: attributes["height"],
    padding: attributes["padding"]
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
    updateActiveNodeAttributes("attributes", newAttributes);
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
        <Box component="p">Padding</Box>
        <TextField
          label="Top"
          size="small"
          name="padding"
          onChange={handleChange}
          value={formData["padding"]}
          fullWidth
          type="number"
          multiline
          maxRows={4}
        />
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
