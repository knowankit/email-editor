import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HeroAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import { updateAttributes, updateContent } from "@/lib/util/data-crud";
import IconButton from "@mui/material/IconButton";

interface ISetting {
  expanded: HeroAttributesAccordionType;
  changeTab: (value: HeroAttributesAccordionType) => void;
}

const Settings = ({ expanded, changeTab }: ISetting) => {
  const { activeNode, emailData, setEmailData } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    "container-background-color": attributes["container-background-color"],
    color: attributes["color"]
  });
  const [content, setContent] = useState(section.content);

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

    const data = updateAttributes(emailData, activeNode.path, newAttributes);
    const updateContentObj = updateContent(data, activeNode.path, content);

    setEmailData(updateContentObj);
  };

  return (
    <Accordion
      expanded={expanded === "setting"}
      onChange={() => changeTab(expanded === "setting" ? "" : "setting")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="setting">
        <Typography fontSize="0.8rem">Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <TextField
            label="Background color"
            fullWidth
            name="container-background-color"
            value={formData["container-background-color"]}
            size="small"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="color" size="small">
                    <ColorLensIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            variant="outlined"
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Text color"
            fullWidth
            name="color"
            value={formData["color"]}
            size="small"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="color" size="small">
                    <ColorLensIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            variant="outlined"
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Text content"
            fullWidth
            name="content"
            value={content}
            size="small"
            onChange={event => setContent(event.target.value)}
            variant="outlined"
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

export default Settings;
