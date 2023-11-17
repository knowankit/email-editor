import Extra from "@/components/right-sidebar/text-attributes/extra";
import Dimension from "@/components/right-sidebar/text-attributes/dimension";
import Settings from "@/components/right-sidebar/text-attributes/settings";
import Typography from "@/components/right-sidebar/text-attributes/typography";

import useEmailStore from "@/store/email";
import { Box } from "@mui/material";

const TextAttributes = () => {
  const { activeNode } = useEmailStore();

  if (!activeNode || (activeNode && activeNode.section.tagName !== "mj-text"))
    return <></>;

  return (
    <>
      <Box p="1rem">Text Element</Box>

      <Dimension />
      <Settings />
      <Typography />
      <Extra />
    </>
  );
};

export default TextAttributes;
