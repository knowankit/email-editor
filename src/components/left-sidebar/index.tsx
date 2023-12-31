import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Content from "@/components/left-sidebar/accordions/content";
import Layout from "@/components/left-sidebar/accordions/layout";
import Templates from "@/components/left-sidebar/accordions/templates";

import LayerTab from "@/components/left-sidebar/tabs/layer";

export default function ElementsDrawer() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const htmltags = () => (
    <Box>
      <Box>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider"
            }}
          >
            <TabList
              onChange={handleChange}
              variant="fullWidth"
              aria-label="lab API tabs example"
            >
              <Tab label="Block" value="1" sx={{ textTransform: "none" }} />
              <Tab label="Layer" value="2" sx={{ textTransform: "none" }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <Content />
            <Layout />
            <Templates />
          </TabPanel>
          <TabPanel value="2">
            <LayerTab />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "25vw",
        border: "2px solid #e5e6ec",
        overflow: "scroll"
      }}
    >
      {htmltags()}
    </Box>
  );
}
