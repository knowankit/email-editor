import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Content from "@/components/email-editor/left-sidebar/accordions/content";
import Layout from "@/components/email-editor/left-sidebar/accordions/layout";
import { AccordionType } from "@/types/email-editor.types";
import LayerTab from "@/components/email-editor/left-sidebar/tabs/layer";

export default function ElementsDrawer() {
  const [expanded, setExpanded] = useState<AccordionType>("content");
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
            <Content
              expanded={expanded}
              handleChange={(value: AccordionType) => setExpanded(value)}
            />
            <Layout
              expanded={expanded}
              handleChange={(value: AccordionType) => setExpanded(value)}
            />
          </TabPanel>
          <TabPanel value="2">
            <LayerTab />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          width: "25vw",
          height: "100%",
          border: "2px solid #e5e6ec"
        }}
      >
        {htmltags()}
      </Box>
    </div>
  );
}
