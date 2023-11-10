import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";
import HoverInfo from "@/lib/ui/hover-info";
import useEmailStore from "@/store/email";

interface ITextPreview {
  section: any;
  index: number;
  textIndex: number;
  path: string;
}

const hoverStyle = {
  "&:hover": {
    outline: "2px dashed white"
  }
};

const defaultStyle = {
  position: "relative"
};

const TextPreview = ({ section, index, textIndex, path }: ITextPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveNode, activeNode } = useEmailStore();
  const objectCss = objectToCSS(getCamelCasedAttributes(section.attributes));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const activeNode = {
      sectionIndex: index,
      section,
      path
    };

    setActiveNode(activeNode);
  };

  const getStyle = () => {
    const activeSectionId = activeNode && activeNode["section"]?.id;
    const currentSectionId = section.id;

    if (activeSectionId === currentSectionId) {
      const activeCss = {
        outline: "4px solid #1939B7"
      };

      return { ...defaultStyle, ...objectCss, ...activeCss };
    }

    return { ...defaultStyle, ...objectCss, ...hoverStyle };
  };

  return (
    <Box
      sx={getStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {section.content}
      {isHovered && <HoverInfo section={section} path={path} />}
    </Box>
  );
};
export default TextPreview;
