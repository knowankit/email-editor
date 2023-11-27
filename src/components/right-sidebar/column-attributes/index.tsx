import Border from "@/components/right-sidebar/column-attributes/border";
import Setting from "@/components/right-sidebar/column-attributes/settings";

import { useState } from "react";
import { HeroAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import { Box } from "@mui/material";

const HeroAttributes = () => {
  const [expanded, setExpanded] = useState<HeroAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-column"))
    return <></>;

  return (
    <>
      <Box p="1rem">Hero Element</Box>

      <Setting
        expanded={expanded}
        changeTab={(value: HeroAttributesAccordionType) => setExpanded(value)}
      />

      <Border
        expanded={expanded}
        changeTab={(value: HeroAttributesAccordionType) => setExpanded(value)}
      />
    </>
  );
};

export default HeroAttributes;
