import Border from "@/components/right-sidebar/text-attributes/border";
import Dimension from "@/components/right-sidebar/text-attributes/dimension";
import Setting from "@/components/right-sidebar/text-attributes/settings";
import { useState } from "react";
import { HeroAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";

const TextAttributes = () => {
  const [expanded, setExpanded] = useState<HeroAttributesAccordionType>(
    "dimension"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-text"))
    return <></>;

  return (
    <>
      <Dimension
        expanded={expanded}
        changeTab={(value: HeroAttributesAccordionType) => setExpanded(value)}
      />

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

export default TextAttributes;
