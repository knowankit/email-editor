import ElementsDrawer from "@/components/email-editor/left-sidebar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropContainer from "@/components/email-editor/drop-container";
import { Typography, Badge, Box } from "@mui/material";
import Controls from "@/components/email-editor/header/controls";
import RightSidebar from "@/components/email-editor/right-sidebar";

const EmailEditor = () => {
  return (
    <>
      <Box p="1rem">
        <Badge color="secondary" badgeContent="Beta">
          <Typography variant="h6">Email Editor</Typography>
        </Badge>
      </Box>
      <Box px="1rem">
        <Controls />
      </Box>
      <Box
        sx={{
          mt: "1rem",
          width: "100vw",
          height: "85vh",
          display: "flex"
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <ElementsDrawer />
          <DropContainer />
        </DndProvider>
        <RightSidebar />
      </Box>
    </>
  );
};

export default EmailEditor;
