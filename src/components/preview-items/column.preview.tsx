import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import React, { useState } from "react";
import ImagePreview from "@/components/preview-items/image.preview";
import TextPreview from "@/components/preview-items/text.preview";
import CarouselPreview from "@/components/preview-items/carousel.preview";

import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";
import HoverInfo from "@/lib/ui/hover-info";
import useEmailDataStore from "@/store/email";

interface ITextPreview {
  section: any;
  index: number;
  columnIndex: number;
  path: string;
}

const defaultStyle = {
  minHeight: "150px",
  outline: "2px dashed black",
  position: "relative"
};

const hoverStyle = {
  "&:hover": {
    outline: "2px dashed black"
  }
};

const ColumnPreview = ({ section, index, columnIndex, path }: ITextPreview) => {
  const [isHovered, setIsHovered] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ["mj-image", "mj-text", "mj-carousel"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        const nestedPath = `${path}.children`;

        pushTagElement(item["type"], nestedPath);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const hasChildren = section["children"];
  const objectCss = objectToCSS(getCamelCasedAttributes(section.attributes));
  const { activeNode, setActiveNode, pushTagElement } = useEmailDataStore();

  const activeSectionId = activeNode && activeNode["section"]?.id;
  const currentSectionId = section.id;
  const showControls = activeSectionId === currentSectionId;

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
            path={`${path}.children.${tindex}`}
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
            path={`${path}.children.${tindex}`}
          />
        );
      }

      case "mj-carousel": {
        return (
          <CarouselPreview
            section={pSection}
            index={index}
            key={index}
            path={`${path}.children.${tindex}`}
          />
        );
      }

      default:
        break;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setActiveNode(null);
    setActiveNode({
      section,
      path,
      sectionIndex: index
    });
  };

  const getBoxStyle = () => {
    const isActiveOver = isOver && canDrop;

    // For showing green border on success element hover
    if (isActiveOver) {
      const hoverCss = {
        outline: "4px solid #00AB55 !important"
      };

      return { ...defaultStyle, ...objectCss, ...hoverCss };
    }

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
          ...getBoxStyle()
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
      >
        {hasChildren.length > 0 &&
          hasChildren.map((tsection: any, tindex: any) => {
            return loadHtmlElements(tsection, tindex);
          })}
        {(isHovered || showControls) && (
          <HoverInfo section={section} path={path} />
        )}
      </Box>
    </Box>
  );
};

export default ColumnPreview;
