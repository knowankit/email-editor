import { Box } from "@mui/material";
import React from "react";
import HoverInfo from "@/lib/ui/hover-info";
import useEmailDataStore from "@/store/email";

import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";

interface IButtonPreview {
  section: any;
  index: number;
  path: string;
}

const hoverStyle = {
  "&:hover": {
    outline: "2px dashed white",
    outlineOffset: "2px"
  }
};

const defaultStyle = {
  fontFamily: "Ubuntu, Helvetica, Arial, sans-serif",
  fontSize: "18px",
  fontWeight: "normal",
  lineHeight: "120%",
  textDecoration: "none",
  textTransform: "none",
  margin: "10px 25px",
  padding: "10px 25px"
};

const CarouselPreview = ({ section, index, path }: IButtonPreview) => {
  // const [isHovered, setIsHovered] = useState(false);
  const { setActiveNode, activeNode } = useEmailDataStore();
  const objectCss = objectToCSS(getCamelCasedAttributes(section.attributes));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setActiveNode({
      section,
      path,
      sectionIndex: index
    });
  };

  const activeSectionId = activeNode && activeNode["section"]?.id;
  const currentSectionId = section.id;
  const showControls = activeSectionId === currentSectionId;

  const getStyle = () => {
    if (showControls) {
      const activeCss = {
        outline: "4px solid #1939B7"
      };

      return { ...activeCss };
    }

    return { ...hoverStyle };
  };

  const getBoxStyle = () => {
    // For currently active node border color
    if (showControls) {
      const activeCss = {
        outline: "4px solid #1939B7"
      };

      return { ...defaultStyle, ...objectCss, ...activeCss };
    }

    // Default behaviour
    return { ...defaultStyle, ...objectCss, ...hoverStyle };
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="120px"
      width="inherit"
      position="relative"
      sx={{
        ...getBoxStyle()
      }}
      onClick={handleClick}
    >
      The carousel preview is not real-time
      {showControls && <HoverInfo section={section} path={path} />}
    </Box>
  );
};
export default CarouselPreview;
