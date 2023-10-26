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
  path: string;
}

const defaultStyle = {
  backgroundColor: "#414141",
  color: "#ffffff",
  "&:hover": {
    outline: "2px dashed white",
    outlineOffset: "2px"
  }
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px solid white",
  outlineOffset: "2px"
};

const SpacerPreview = ({ section, index, path }: IButtonPreview) => {
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
      ></Box>
    </Box>
  );
};
export default SpacerPreview;
