import Extra from "@/components/right-sidebar/text-attributes/extra";
import Dimension from "@/components/right-sidebar/text-attributes/dimension";
import Settings from "@/components/right-sidebar/text-attributes/settings";
import Typography from "@/components/right-sidebar/text-attributes/typography";

import { useState } from "react";
import { TextAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import { Box } from "@mui/material";

const TextAttributes = () => {
  const [expanded, setExpanded] = useState<TextAttributesAccordionType>(
    "dimension"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-text"))
    return <></>;

  return (
    <>
      <Box p="1rem">Text Element</Box>

      <Dimension
        expanded={expanded}
        changeTab={(value: TextAttributesAccordionType) => setExpanded(value)}
      />

      <Settings
        expanded={expanded}
        changeTab={(value: TextAttributesAccordionType) => setExpanded(value)}
      />

      <Typography
        expanded={expanded}
        changeTab={(value: TextAttributesAccordionType) => setExpanded(value)}
      />

      <Extra
        expanded={expanded}
        changeTab={(value: TextAttributesAccordionType) => setExpanded(value)}
      />
    </>
  );
};

export default TextAttributes;
