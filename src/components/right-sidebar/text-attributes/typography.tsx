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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { debounce } from "lodash";

interface ITextTypography {
  expanded: TextAttributesAccordionType;
  changeTab: (value: TextAttributesAccordionType) => void;
}

const TextTypography = ({ expanded, changeTab }: ITextTypography) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;
  const defaultAttributes = section.attributes;

  const [formData, setFormData] = useState({
    "letter-spacing": defaultAttributes["letter-spacing"],
    "line-height": defaultAttributes["line-height"],
    "text-decoration": defaultAttributes["text-decoration"],
    "font-family": defaultAttributes["font-family"],
    "font-size": defaultAttributes["font-size"],
    "font-style": defaultAttributes["font-style"],
    "font-weight": defaultAttributes["font-weight"],
    align: defaultAttributes["align"]
  });

  const fontWeights = [
    "Normal",
    "Bold",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600"
  ];

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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    const newAttributes = {
      ...defaultAttributes,
      ...formData,
      [name]: value
    };
    setFormData(newAttributes);
    debouncedApplyChanges(newAttributes);
  };

  const applyChanges = (newAttributes: any) => {
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
          <FormControl sx={{ width: "45%" }}>
            <InputLabel>Font family</InputLabel>
            <Select
              size="small"
              value={formData["font-family"]}
              label="Font family"
              name="font-family"
              onChange={handleSelectChange}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
              <MenuItem value="Helvetica">Helvetica</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl sx={{ width: "45%" }}>
            <InputLabel>Font weight</InputLabel>
            <Select
              size="small"
              value={formData["font-weight"]}
              label="Font weight"
              name="font-weight"
              onChange={handleSelectChange}
            >
              {fontWeights.map((f, index) => (
                <MenuItem value={f.toLowerCase()} key={index}>
                  {f}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <Box component="p">Align</Box>
            <RadioGroup
              value={formData["align"]}
              row
              name="align"
              onChange={handleChange}
            >
              <FormControlLabel
                value="left"
                control={<Radio size="small" />}
                label="Left"
              />
              <FormControlLabel
                value="right"
                control={<Radio size="small" />}
                label="Right"
              />
              <FormControlLabel
                value="center"
                control={<Radio size="small" />}
                label="Center"
              />
              <FormControlLabel
                value="justify"
                control={<Radio size="small" />}
                label="Justify"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <Box component="p">Font style</Box>
            <RadioGroup
              value={formData["font-style"]}
              row
              name="font-style"
              onChange={handleChange}
            >
              <FormControlLabel
                value="normal"
                control={<Radio size="small" />}
                label="Normal"
              />
              <FormControlLabel
                value="italic"
                control={<Radio size="small" />}
                label="Italic"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TextTypography;
