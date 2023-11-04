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
import ImageIcon from "@mui/icons-material/Image";
import { Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import UnsplashModel from "@/lib/ui/unsplash/model";
import ImagePreview from "@/lib/ui/image-preview";
interface ISetting {
  expanded: HeroAttributesAccordionType;
  changeTab: (value: HeroAttributesAccordionType) => void;
}

const Settings = ({ expanded, changeTab }: ISetting) => {
  const { activeNode, updateAttributes } = useEmailStore();
  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    "background-url": attributes["background-url"],
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
  };

  const handleImageChange = (data: any) => {
    setFormData({
      ...formData,
      [data.type]: data.value
    });
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
          <Box display="flex">
            <ImagePreview formData={formData} />
            <UnsplashModel
              handleImageChange={data => handleImageChange(data)}
              field="background-url"
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Image source"
              value={formData["background-url"]}
              name="background-url"
              fullWidth
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
