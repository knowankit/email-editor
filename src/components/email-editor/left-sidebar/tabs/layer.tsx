import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import useEmailStore from "@/store/email";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Crop54Icon from "@mui/icons-material/Crop54";
import Box from "@mui/material/Box";
import { FcAddColumn } from "react-icons/fc";
import { PiCodeBlockFill } from "react-icons/pi";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { TbSection } from "react-icons/tb";

let nodeIds: string[] = [];

const getTagIcons = (tagName: string) => {
  switch (tagName) {
    case "mjml":
      return <DescriptionIcon fontSize="small" />;
    case "mj-body":
      return <Crop54Icon fontSize="small" />;
    case "mj-section":
      return <TbSection fontSize="small" />;
    case "mj-image":
      return <ImageIcon fontSize="small" />;
    case "mj-column":
      return <FcAddColumn />;
    case "mj-hero":
      return <PiCodeBlockFill />;
    case "mj-button":
      return <SmartButtonIcon fontSize="small" />;

    default:
      break;
  }
};

const Layer = () => {
  const { emailData } = useEmailStore();

  const withHtml = {
    tagName: "mjml",
    attributes: {},
    children: [emailData]
  };

  const getLabel = (tagName: string) => {
    return (
      <Box display="flex">
        {getTagIcons(tagName)}
        <Box component="span" ml={1}>
          {tagName}
        </Box>
      </Box>
    );
  };

  const renderTree = (data: any) => {
    nodeIds.push(data.id);
    return (
      <TreeItem
        key={data.tagName}
        nodeId={data.id}
        label={getLabel(data.tagName)}
        sx={{ mt: 1 }}
      >
        {data.children &&
        Array.isArray(data.children) &&
        data.children.length > 0
          ? data.children.map((child: any) => renderTree(child))
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      aria-label="file system navigator"
      expanded={nodeIds}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto"
      }}
    >
      {renderTree(withHtml)}
    </TreeView>
  );
};

export default Layer;
