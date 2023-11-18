import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useEmailStore from "@/store/email";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import React, { useState, useEffect, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import ColorPicker from "@/lib/ui/color-picker";
import { debounce } from "lodash";

const Settings = () => {
  const [expanded, setExpanded] = useState("setting");

  const [isColorPickerOpen, setColorPickerStatus] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const {
    activeNode,
    updateAttributes,
    updateContent,
    updateActiveNodeAttributes
  } = useEmailStore();

  const { section } = activeNode;
  const [content, setContent] = useState(section.content);
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultAttributes = section.attributes;

  useEffect(() => {
    setContent(section.content);

    setFormData({
      "container-background-color":
        defaultAttributes["container-background-color"],
      color: defaultAttributes["color"]
    });
  }, [section]);

  const [formData, setFormData] = useState({
    "container-background-color":
      defaultAttributes["container-background-color"],
    color: defaultAttributes["color"]
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("hellooo deb");

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
    updateContent(content, activeNode.path);
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
    const newAttributes = {
      ...defaultAttributes,
      ...formData,
      [fieldName]: col.hex
    };

    setFormData(newAttributes);
    debouncedApplyChanges(newAttributes);

    setColorPickerStatus(false);
    setAnchorEl(null);
  };

  return (
    <Accordion
      expanded={expanded === "setting"}
      onChange={() => setExpanded(expanded === "setting" ? "" : "setting")}
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
                  <IconButton
                    aria-label="color"
                    sx={{
                      color: formData["container-background-color"],
                      backgroundColor: "#f1f1f1"
                    }}
                    size="small"
                    onClick={event =>
                      handleColorPicker(event, "container-background-color")
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
                  <IconButton
                    aria-label="color"
                    sx={{
                      color: formData["color"],
                      backgroundColor: "#f1f1f1"
                    }}
                    size="small"
                    onClick={event => handleColorPicker(event, "color")}
                  >
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
        <ColorPicker
          open={isColorPickerOpen}
          color=""
          anchorEl={anchorEl}
          onChange={col => handleColorChange(col)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Settings;
