import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import useEmailStore from "@/store/email";
import ColumnPreview from "@/components/preview-items/column.preview";
import SpacerPreview from "@/components/preview-items/spacer.preview";

import HoverInfo from "@/lib/ui/hover-info";
import { useState } from "react";

const defaultStyle = {
  minHeight: "200px",
  position: "relative"
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px dashed orange",
  outlineOffset: "2px"
};

interface ISectionPreview {
  section: any;
  index: number;
  path: string;
}

const SectionPreview = ({ section, index, path }: ISectionPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { pushTagElement } = useEmailStore();
  const [collectedProps, drop] = useDrop(() => ({
    accept: ["mj-column", "mj-spacer"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        pushTagElement(item["type"], path);
      }
    }
  }));

  const hasChildren = section["children"];

  const loadHtmlElements = (pSection: any, tindex: number) => {
    switch (pSection.tagName) {
      case "mj-column": {
        return (
          <ColumnPreview
            section={pSection}
            index={index}
            columnIndex={tindex}
            key={tindex}
            path={`children.${index}.children.${tindex}.children`}
          />
        );
      }

      case "mj-spacer": {
        return (
          <SpacerPreview
            section={pSection}
            index={index}
            key={tindex}
            path={`children.${index}.children.${tindex}.children`}
          />
        );
      }

      default:
        break;
    }
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    event.stopPropagation();
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    event.stopPropagation();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsActive(true);
    event.stopPropagation();
  };

  return (
    <Box ref={drop}>
      <Box
        display="flex"
        sx={{
          ...(isActive ? activeStyle : defaultStyle)
        }}
        minHeight="200px"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
      >
        {hasChildren.length > 0 &&
          hasChildren.map((tsection: any, tindex: number) => {
            return loadHtmlElements(tsection, tindex);
          })}
        {(isHovered || isActive) && <HoverInfo section={section} path={path} />}
      </Box>
    </Box>
  );
};

export default SectionPreview;
