import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

interface IEChip {
  handleClick: () => void;
  handleDelete: () => void;
  template: {
    templateName: string;
  };
}

const EChip = ({ handleClick, handleDelete, template }: IEChip) => {
  return (
    <Chip
      label={template.templateName}
      onClick={handleClick}
      sx={{ mr: 1 }}
      onDelete={handleDelete}
      deleteIcon={<DeleteIcon />}
    />
  );
};

export default EChip;
