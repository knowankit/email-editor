import Border from "@/components/email-editor/right-sidebar/image-attributes/border";
import Dimension from "@/components/email-editor/right-sidebar/image-attributes/dimension";
import Setting from "@/components/email-editor/right-sidebar/image-attributes/settings";
import { useState } from "react";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";

const ImageAttributes = () => {
  const [expanded, setExpanded] = useState<ImageAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-image"))
    return <></>;

  return (
    <>
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
