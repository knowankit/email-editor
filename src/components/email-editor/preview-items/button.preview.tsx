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

const defaultStyle = {
  // border: "1px dashed white",
  display: "inline-block",
  backgroundColor: "#414141",
  color: "#ffffff",
  "&:hover": {
    outline: "2px dashed white",
    outlineOffset: "2px"
  },
  fontFamily: "Ubuntu, Helvetica, Arial, sans-serif",
  fontSize: "13px",
  fontWeight: "normal",
  lineHeight: "120%",
  margin: "0",
  textDecoration: "none",
  textTransform: "none",
  padding: "10px 25px"
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px solid white",
  outlineOffset: "2px"
};

const ButtonPreview = ({ section, index, textIndex, path }: IButtonPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { setActiveNode } = useEmailDataStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActiveNode({
      section,
      path,
      sectionIndex: index
    });
    setIsActive(true);
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
          ...(isActive ? activeStyle : defaultStyle),
          ...objectToCSS(getCamelCasedAttributes(section.attributes))
        }}
      >
        {section.content}
        {(isHovered || isActive) && <HoverInfo section={section} path={path} />}
      </Box>
    </Box>
  );
};
export default ButtonPreview;
