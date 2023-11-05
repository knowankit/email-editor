import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import { Box, Button } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ImageIcon from "@mui/icons-material/Image";
// import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useState } from "react";
import React from "react";

interface ISetting {
  expanded: ImageAttributesAccordionType;
  changeTab: (value: ImageAttributesAccordionType) => void;
}

const Settings = ({ expanded, changeTab }: ISetting) => {
  const {
    activeNode,
    updateAttributes,
    updateActiveNodeAttributes
  } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    src: attributes.src,
    "background-color": ""
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
      expanded={expanded === "setting"}
      onChange={() => changeTab(expanded === "setting" ? "" : "setting")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="setting">
        <Typography fontSize="0.8rem">Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Box
            sx={{
              height: "100px",
              width: "100px",
              backgroundImage: `url("${activeNode?.section.attributes.src}")`,
              backgroundSize: "cover"
            }}
          ></Box>
          <Box mt={2} display="flex">
            <TextField
              label="Image source"
              value={formData.src}
              name="src"
              // fullWidth
              size="small"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon />
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </Box>

          {/* <Box mt={2}>
            <TextField
              label="Background color"
              fullWidth
              name="background-color"
              value={formData["background-color"]}
              size="small"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="delete" size="small">
                      <ColorLensIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </Box> */}
          <Box sx={{ mt: "1rem" }}>
            <Button size="small" variant="contained" onClick={applyChanges}>
              Apply
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Settings;
