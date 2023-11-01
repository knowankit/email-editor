import Border from "@/components/right-sidebar/button-attributes/border";
import Dimension from "@/components/right-sidebar/button-attributes/dimension";
import Setting from "@/components/right-sidebar/button-attributes/settings";
import { useState } from "react";
import { HeroAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";

const ButtonAttributes = () => {
  const [expanded, setExpanded] = useState<HeroAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-button"))
    return <></>;

  return (
    <>
      <Setting
        expanded={expanded}
        changeTab={(value: HeroAttributesAccordionType) => setExpanded(value)}
      />
      <Dimension
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

export default ButtonAttributes;
