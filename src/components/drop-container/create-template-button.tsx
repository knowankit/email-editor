import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import useEmailStore from "@/store/email";
import TemplateModel from "@/lib/ui/model";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import useTemplatesStore from "@/store/templates";

const CreateTemplateButton = () => {
  const [isOpen, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const { emailData } = useEmailStore();
  const { createNewTemplate } = useTemplatesStore();

  const handleClick = () => {
    setOpen(prev => !prev);
    setTemplateName("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(event.target.value);
  };

  const handleCreateTemplate = () => {
    createNewTemplate({ templateName, ...emailData });
    handleClick();
  };

  return (
    <>
      <IconButton
        aria-label="save"
        disabled={!emailData["children"].length}
        onClick={handleClick}
      >
        <SaveIcon />
      </IconButton>
      {isOpen && (
        <TemplateModel
          isOpen={isOpen}
          handleClick={handleClick}
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
