import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import useEmailStore from "@/store/email";
import TemplateModel from "@/lib/ui/model";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import useTemplatesStore from "@/store/templates";
import { v4 as uuidv4 } from "uuid";

const CreateTemplateButton = () => {
  const [isOpen, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const { emailData } = useEmailStore();
  const { createNewTemplate } = useTemplatesStore();

  const handleClose = () => {
    setOpen(prev => !prev);
    setTemplateName("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(event.target.value);
  };

  const handleCreateTemplate = () => {
    createNewTemplate({ ...emailData, templateName, templateId: uuidv4() });

    handleClose();
  };

  return (
    <>
      <Tooltip title="Create template" placement="top" arrow>
        <Box component="span" className="step-5">
          <IconButton
            aria-label="save"
            disabled={!emailData["children"].length}
            onClick={handleClose}
          >
            <SaveIcon />
          </IconButton>
        </Box>
      </Tooltip>
      {isOpen && (
        <TemplateModel
          isOpen={isOpen}
          handleClick={handleClose}
          handlePrimary={handleCreateTemplate}
          title="Create a template"
        >
          <Box textAlign="center" sx={{ p: 1 }}>
            <TextField
              label="Template name"
              variant="outlined"
              size="small"
              onChange={handleNameChange}
            />
          </Box>
        </TemplateModel>
      )}
    </>
  );
};

export default CreateTemplateButton;
