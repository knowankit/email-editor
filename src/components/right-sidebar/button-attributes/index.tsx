import Border from "@/components/right-sidebar/button-attributes/border";
import Dimension from "@/components/right-sidebar/button-attributes/dimension";
import Setting from "@/components/right-sidebar/button-attributes/settings";
import Typography from "@/components/right-sidebar/button-attributes/typography";

import { useState } from "react";
import { ButtonAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";

const ButtonAttributes = () => {
  const [expanded, setExpanded] = useState<ButtonAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-button"))
    return <></>;

  return (
    <>
      <Setting
        expanded={expanded}
        changeTab={(value: ButtonAttributesAccordionType) => setExpanded(value)}
      />

      <Typography
        expanded={expanded}
        changeTab={(value: ButtonAttributesAccordionType) => setExpanded(value)}
      />

      <Dimension
        expanded={expanded}
        changeTab={(value: ButtonAttributesAccordionType) => setExpanded(value)}
      />
      <Border
        expanded={expanded}
        changeTab={(value: ButtonAttributesAccordionType) => setExpanded(value)}
      />
    </>
  );
};

export default ButtonAttributes;
