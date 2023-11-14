import { Box } from "@mui/material";
import React, { useState } from "react";
import HoverInfo from "@/lib/ui/hover-info";
import useEmailDataStore from "@/store/email";

import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";

interface IButtonPreview {
  section: any;
  index: number;
  textIndex: number;
  path: string;
}

const hoverStyle = {
  "&:hover": {
    outline: "2px dashed white",
    outlineOffset: "2px"
  }
};

const defaultStyle = {
  display: "inline-block",
  backgroundColor: "#414141",
  color: "#ffffff",
  fontFamily: "Ubuntu, Helvetica, Arial, sans-serif",
  fontSize: "13px",
  fontWeight: "normal",
  lineHeight: "120%",
  textDecoration: "none",
  textTransform: "none",
  margin: "10px 25px",
  padding: "10px 25px",
  backgroundPosition: "center center"
};

const ButtonPreview = ({ section, index, textIndex, path }: IButtonPreview) => {
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <Box textAlign="center">
      <Box
        id="button"
        component="a"
        position="relative"
        className="testbutton"
        href={section.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        sx={{
          ...getStyle(),
          ...defaultStyle,
          ...objectCss
        }}
      >
        {section.content}
        {(isHovered || showControls) && (
          <HoverInfo section={section} path={path} />
        )}
      </Box>
    </Box>
  );
};
export default ButtonPreview;
