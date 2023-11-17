import Border from "@/components/right-sidebar/image-attributes/border";
import Dimension from "@/components/right-sidebar/image-attributes/dimension";
import Setting from "@/components/right-sidebar/image-attributes/settings";
import { useState } from "react";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import { Box } from "@mui/material";

const ImageAttributes = () => {
  const [expanded, setExpanded] = useState<ImageAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-image"))
    return <></>;

  return (
    <>
      <Box p="1rem">Image Element</Box>

      <Setting
        expanded={expanded}
        changeTab={(value: ImageAttributesAccordionType) => setExpanded(value)}
      />
      <Dimension
        expanded={expanded}
        changeTab={(value: ImageAttributesAccordionType) => setExpanded(value)}
      />
      <Border
        expanded={expanded}
        changeTab={(value: ImageAttributesAccordionType) => setExpanded(value)}
      />
    </>
  );
};

export default ImageAttributes;
