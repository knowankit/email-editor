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
import ColorLensIcon from "@mui/icons-material/ColorLens";
import IconButton from "@mui/material/IconButton";
import ColorPicker from "@/lib/ui/color-picker";

interface ISetting {
  expanded: HeroAttributesAccordionType;
  changeTab: (value: HeroAttributesAccordionType) => void;
}

const Settings = ({ expanded, changeTab }: ISetting) => {
  const {
    activeNode,
    updateAttributes,
    updateActiveNodeAttributes
  } = useEmailStore();
  const [fieldName, setFieldName] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [isColorPickerOpen, setColorPickerStatus] = useState(false);

  const { section } = activeNode;
  const attributes = section.attributes;

  const [formData, setFormData] = useState({
    "background-url": attributes["background-url"],
    "background-color": attributes["background-color"]
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

  const handleImageChange = (data: any) => {
    setFormData({
      ...formData,
      [data.type]: data.value
    });
  };

  const handleColorPicker = (event: any, name: string) => {
    setFieldName(name);

    if (isColorPickerOpen) {
      setColorPickerStatus(false);
      setAnchorEl(null);
      return;
    }

    setColorPickerStatus(true);
    setAnchorEl(event.currentTarget);
  };

  const handleColorChange = (col: any) => {
    setFormData({
      ...formData,
      [fieldName]: col.hex
    });

    setColorPickerStatus(false);
    setAnchorEl(null);
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
            <ImagePreview
              formData={formData}
              handleImageChange={data => handleImageChange(data)}
            />
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
          <Box mt={2}>
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
                    <IconButton
                      aria-label="color"
                      size="small"
                      sx={{
                        color: formData["background-color"],
                        backgroundColor: "#f1f1f1"
                      }}
                      onClick={event =>
                        handleColorPicker(event, "background-color")
                      }
                    >
                      <ColorLensIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </Box>
          <ColorPicker
            open={isColorPickerOpen}
            color=""
            anchorEl={anchorEl}
            onChange={col => handleColorChange(col)}
          />
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
