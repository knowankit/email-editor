import Settings from "@/components/right-sidebar/carousel-attributes/settings";
import { useState } from "react";
import { ImageAttributesAccordionType } from "@/types/email-editor.types";
import useEmailStore from "@/store/email";
import { Box } from "@mui/material";

const CarouselAttributes = () => {
  const [expanded, setExpanded] = useState<ImageAttributesAccordionType>(
    "setting"
  );

  const { activeNode } = useEmailStore();

  if (
    !activeNode ||
    (activeNode && activeNode.section.tagName !== "mj-carousel")
  )
    return <></>;

  return (
    <>
      <Box p="1rem">Carousel Element</Box>

      <Settings
        expanded={expanded}
        changeTab={(value: ImageAttributesAccordionType) => setExpanded(value)}
      />
    </>
  );
};

export default CarouselAttributes;
