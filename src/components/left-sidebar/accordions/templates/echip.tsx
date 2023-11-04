import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import useEmailStore from "@/store/email";

interface IEChip {
  handleClick: () => void;
  handleDelete: () => void;
  template: {
    templateName?: string;
    templateId?: string;
  };
}

const EChip = ({ handleClick, handleDelete, template }: IEChip) => {
  const { emailData } = useEmailStore();

  return (
    <Chip
      label={template.templateName}
      onClick={handleClick}
      color={
        template.templateId === emailData.templateId ? "primary" : "default"
      }
      sx={{ mr: 1 }}
      onDelete={handleDelete}
      deleteIcon={<DeleteIcon />}
    />
  );
};

export default EChip;
