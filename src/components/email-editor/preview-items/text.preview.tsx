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

const defaultStyle = {
  position: "relative",
  // border: "1px dashed white",
  "&:hover": {
    outline: "2px dashed white",
    outlineOffset: "2px"
  }
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px dashed white",
  outlineOffset: "2px"
};

const TextPreview = ({ section, index, textIndex, path }: ITextPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { setActiveNode } = useEmailStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const activeNode = {
      sectionIndex: index,
      section,
      path
    };

    setActiveNode(activeNode);
    setIsActive(true);
  };

  console.log("cs", objectToCSS(getCamelCasedAttributes(section.attributes)));
  return (
    <Box
      sx={{
        ...(isActive ? activeStyle : defaultStyle),
        ...objectToCSS(getCamelCasedAttributes(section.attributes))
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {section.content}
      {(isHovered || isActive) && <HoverInfo section={section} path={path} />}
    </Box>
  );
};
export default TextPreview;
