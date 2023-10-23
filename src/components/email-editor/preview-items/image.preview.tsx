import { Box } from "@mui/material";
import Popper from "@/components/email-editor/popper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import useEmailStore from "@/store/email";

interface IImagePreview {
  section: any;
  index: number;
  imageIndex: number;
  columnIndex: number;
  path: string;
}

const ImagePreview = ({
  section,
  index,
  imageIndex,
  columnIndex
}: IImagePreview) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { emailData, setEmailData, setActiveNode } = useEmailStore();
  const [isPopperOpen, setPopperVisibility] = useState(false);

  const handleMouseClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const activeNode = {
      sectionIndex: index,
      imageIndex,
      columnIndex,
      section
    };

    setActiveNode(activeNode);

    if (isPopperOpen) {
      handleClose();
      return;
    }

    setAnchorEl(event.currentTarget);
    setPopperVisibility(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopperVisibility(false);
  };

  const handleDelete = () => {
    setActiveNode(null);
    const imageId = section.id;

    const sectionList = emailData.children[index].children;
    const filteredList = sectionList.filter((item: any) => item.id != imageId);

    const emailDataClone = { ...emailData };

    emailDataClone.children[index].children = filteredList;
    setEmailData(emailDataClone);
  };

  return (
    <>
      <Box
        onClick={handleMouseClick}
        component="img"
        sx={{ cursor: "pointer" }}
        src={section.attributes.src}
        width={section.attributes.width}
        height={section.attributes.height}
        paddingLeft={section.attributes["padding-left"]}
        paddingRight={section.attributes["padding-right"]}
        paddingTop={section.attributes["padding-top"]}
        paddingBottom={section.attributes["padding-bottom"]}
      />
      <Popper anchorEl={anchorEl} open={isPopperOpen} placement="bottom">
        <Box>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" color="warning" />
          </IconButton>
          <IconButton aria-label="edit" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popper>
    </>
  );
};

export default ImagePreview;
