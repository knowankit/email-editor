import ElementsDrawer from "@/components/left-sidebar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropContainer from "@/components/drop-container";
import { Typography, Badge, Box } from "@mui/material";
import Controls from "@/components/header/controls";
import RightSidebar from "@/components/right-sidebar";
import Alert from "@mui/material/Alert";

const EmailEditor = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box p="1rem">
          <Badge color="secondary" badgeContent="Beta">
            <Typography variant="h6">Email Editor</Typography>
          </Badge>
        </Box>
        <Box>
          <Alert severity="info">
            This project is currently under development, and there is a high
            likelihood of issues that I am actively addressing
          </Alert>
        </Box>
      </Box>
      <Box px="1rem">
        <Controls />
      </Box>
      <Box
        sx={{
          mt: "1rem",
          width: "100vw",
          height: "83.7vh",
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
