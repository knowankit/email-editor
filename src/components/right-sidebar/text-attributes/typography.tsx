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
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";

interface ITextTypography {
  expanded: TextAttributesAccordionType;
  changeTab: (value: TextAttributesAccordionType) => void;
}

const TextTypography = ({ expanded, changeTab }: ITextTypography) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    "letter-spacing": attributes["letter-spacing"],
    "line-height": attributes["line-height"],
    "text-decoration": attributes["text-decoration"],
    "font-family": attributes["font-family"],
    "font-size": attributes["font-size"],
    "font-weight": attributes["font-weight"]
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
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
      expanded={expanded === "typography"}
      onChange={() => changeTab(expanded === "typography" ? "" : "typography")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="typography">
        <Typography fontSize="0.8rem">Typography</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Font family"
            name="font-family"
            value={formData["font-family"]}
            onChange={handleChange}
            size="small"
            sx={{ width: "45%" }}
          />
          <TextField
            label="Font size"
            name="font-size"
            value={formData["font-size"]}
            onChange={handleChange}
            size="small"
            sx={{ width: "45%" }}
          />
        </Box>
        <Box component="p">Padding</Box>
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Line height"
            size="small"
            name="line-height"
            onChange={handleChange}
            value={formData["line-height"]}
            type="number"
            multiline
            maxRows={4}
            sx={{ width: "45%" }}
          />
          <TextField
            label="Letter spacing"
            size="small"
            name="letter-spacing"
            multiline
            onChange={handleChange}
            value={formData["letter-spacing"]}
            type="number"
            maxRows={4}
            sx={{ width: "45%" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <FormControl sx={{ width: "45%" }}>
            <InputLabel>Text decoration</InputLabel>
            <Select
              size="small"
              value={formData["text-decoration"]}
              label="Text Decoration"
              name="text-decoration"
              onChange={handleSelectChange}
            >
              <MenuItem value="underline">Underline</MenuItem>
              <MenuItem value="overline">Overline</MenuItem>
              <MenuItem value="line-through">Line through</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            onChange={handleChange}
            name="font-weight"
            label="Font weight"
            value={formData["font-weight"]}
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

export default TextTypography;
