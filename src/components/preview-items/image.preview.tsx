import { Box } from "@mui/material";
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
  columnIndex,
  path
}: IImagePreview) => {
  const { setActiveNode } = useEmailStore();

  const handleMouseClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const activeNode = {
      sectionIndex: index,
      imageIndex,
      columnIndex,
      section,
      path
    };

    setActiveNode(activeNode);
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
    </>
  );
};

export default ImagePreview;
