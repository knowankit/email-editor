import ElementsDrawer from "@/components/left-sidebar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropContainer from "@/components/drop-container";
import { Box } from "@mui/material";
import Controls from "@/components/header/controls";
import RightSidebar from "@/components/right-sidebar";
import { useEffect, useState } from "react";
import NotSupportedOnMobile from "@/components/not-supported-mobile";
import HomePageHeader from "@/components/home-page-header";

const EmailEditor = () => {
  const [isMobile, setMobile] = useState<"mobile" | "desktop" | "">("");

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setMobile("mobile");
    } else {
      setMobile("desktop");
    }
  }, []);

  if (isMobile === "mobile") return <NotSupportedOnMobile />;

  return (
    <>
      <Box px="1rem">
        <HomePageHeader />
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
