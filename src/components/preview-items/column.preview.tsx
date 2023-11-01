import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import React, { useState } from "react";
import useEmailStore from "@/store/email";
import ImagePreview from "@/components/preview-items/image.preview";
import TextPreview from "@/components/preview-items/text.preview";

import HoverInfo from "@/lib/ui/hover-info";

interface ITextPreview {
  section: any;
  index: number;
  columnIndex: number;
  path: string;
}

const defaultStyle = {
  minHeight: "200px",
  outline: "2px dashed black",
  position: "relative",
  "&:hover": {
    outline: "2px dashed orange",
    outlineOffset: "2px"
  }
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px dashed orange",
  outlineOffset: "2px"
};

const ColumnPreview = ({ section, index, columnIndex, path }: ITextPreview) => {
  const { pushTagElement } = useEmailStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [collectedProps, drop] = useDrop(() => ({
    accept: ["mj-image", "mj-text"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        pushTagElement(item["type"], path);
      }
    }
  }));

  const hasChildren = section["children"];

  const loadHtmlElements = (pSection: any, tindex: number) => {
    switch (pSection.tagName) {
      case "mj-image": {
        return (
          <ImagePreview
            section={pSection}
            imageIndex={tindex}
            columnIndex={columnIndex}
            index={index}
            key={index}
            path={`${path}.children.${tindex}.children`}
          />
        );
      }

      case "mj-text": {
        return (
          <TextPreview
            section={pSection}
            index={index}
            textIndex={tindex}
            key={index}
            path={`${path}.children.${tindex}.children`}
          />
        );
      }

      default:
        break;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsActive(true);
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    event.stopPropagation();
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    event.stopPropagation();
  };

  return (
    <Box sx={{ flex: "1", margin: "1rem" }} ref={drop}>
      <Box
        sx={{
          ...(isActive ? activeStyle : defaultStyle)
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
      >
        {hasChildren.length > 0 &&
          hasChildren.map((tsection: any, tindex: any) => {
            return loadHtmlElements(tsection, tindex);
          })}
        {(isHovered || isActive) && <HoverInfo section={section} path={path} />}
      </Box>
    </Box>
  );
};

export default ColumnPreview;
