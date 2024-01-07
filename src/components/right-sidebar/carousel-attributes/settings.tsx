import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";
import { produce } from "immer";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
interface ISetting {
  expanded: ImageAttributesAccordionType;
  changeTab: (value: ImageAttributesAccordionType) => void;
}

const Settings = ({ expanded, changeTab }: ISetting) => {
  const {
    activeNode,
    updateChildren,
    updateActiveNodeAttributes
  } = useEmailStore();
  const { section } = activeNode;

  const [formData, setFormData] = useState({
    children: section.children
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    setFormData(children => {
      return produce(children, (draftState: any) => {
        draftState.children[index].attributes.src = value;
      });
    });
  };

  const applyChanges = () => {
    updateChildren(formData.children, activeNode.path);
    updateActiveNodeAttributes("children", formData.children);
  };

  const addSlide = () => {
    setFormData(children => {
      return produce(children, (draftState: any) => {
        draftState.children.push(draftState.children[0]);
      });
    });

    // applyChanges();
  };

  const deleteSlide = (index: number) => {
    setFormData(draft => {
      return produce(draft, (draftState: any) => {
        draftState.children.splice(index, 1);
      });
    });

    // applyChanges();
  };

  const slides = formData.children;

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
          {slides.map((_slide: any, index: number) => (
            <Box sx={{ mt: 2 }}>
              <Typography fontSize="1rem"> Slide {index + 1}</Typography>

              <Box
                sx={{
                  height: "200px",
                  width: "100%",
                  backgroundImage: `url("${formData.children[index]?.attributes.src}")`,
                  backgroundSize: "cover"
                }}
              />
              <TextField
                value={formData.children[index]?.attributes.src}
                name="src"
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
                variant="outlined"
              />
              <IconButton
                disabled={slides.length === 1}
                aria-label="delete"
                size="small"
                onClick={() => deleteSlide(index)}
              >
                <DeleteIcon
                  fontSize="small"
                  sx={{ fontSize: "1rem" }}
                  color="error"
                />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ mt: "1rem" }}>
            <Button
              size="small"
              variant="contained"
              onClick={applyChanges}
              sx={{ textTransform: "capitalize" }}
            >
              Apply
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={addSlide}
              sx={{ textTransform: "capitalize", ml: 2 }}
            >
              Add slide
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Settings;
