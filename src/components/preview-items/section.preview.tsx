import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import ColumnPreview from "@/components/preview-items/column.preview";
import SpacerPreview from "@/components/preview-items/spacer.preview";
import useEmailDataStore from "@/store/email";
import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";
import HoverInfo from "@/lib/ui/hover-info";
import { useState } from "react";

const defaultStyle = {
  minHeight: "200px",
  position: "relative"
};

interface ISectionPreview {
  section: any;
  index: number;
  path: string;
}

const hoverStyle = {
  "&:hover": {
    outline: "2px dashed black"
  }
};

const SectionPreview = ({ section, index, path }: ISectionPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const { activeNode, setActiveNode, pushTagElement } = useEmailDataStore();

  const activeSectionId = activeNode && activeNode["section"]?.id;
  const currentSectionId = section.id;
  const showControls = activeSectionId === currentSectionId;
  const objectCss = objectToCSS(getCamelCasedAttributes(section.attributes));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ["mj-column", "mj-spacer"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        pushTagElement(item["type"], path);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

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
    event.stopPropagation();

    setActiveNode(null);
    setActiveNode({
      section,
      path,
      sectionIndex: index
    });
  };
  return (
    <Box ref={drop}>
      <Box
        display="flex"
        sx={{
          ...getBoxStyle()
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
        {(isHovered || showControls) && (
          <HoverInfo section={section} path={path} />
        )}
      </Box>
    </Box>
  );
};

export default SectionPreview;
