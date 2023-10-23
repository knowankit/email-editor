import React from "react";
import { Box } from "@mui/material";
import { boxElementOnDrag } from "@/components/email-editor/left-sidebar/style";

interface DragPlaceholderProps {
  children: JSX.Element;
}

const DragPlaceholder = ({ children }: DragPlaceholderProps) => {
  return <Box sx={boxElementOnDrag}>{children}</Box>;
};

export default DragPlaceholder;
