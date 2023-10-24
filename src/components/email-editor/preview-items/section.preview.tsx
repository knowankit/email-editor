import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import useEmailStore from "@/store/email";
import modifyObjectData from "@/lib/util/modify-data-object";
import ColumnPreview from "@/components/email-editor/preview-items/column.preview";
import HoverInfo from "@/lib/ui/hover-info";
import { useState } from "react";
import { getDefaultTags } from "@/lib/util/get-default-tags";

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

  const { emailData, setEmailData } = useEmailStore();
  const [collectedProps, drop] = useDrop(() => ({
    accept: ["mj-column"],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        modifyEmailData(item);
      }
    }
  }));

  const modifyEmailData = (item: any) => {
    const key = item["type"];
    switch (key) {
      case "mj-column":
        {
          const newData = modifyObjectData(
            emailData,
            `${path}.children.push`,
            getDefaultTags("mj-column"),
            "add"
          );

          setEmailData(newData);
        }
        break;
    }
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
            path={`children.${index}.children.${tindex}`}
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
