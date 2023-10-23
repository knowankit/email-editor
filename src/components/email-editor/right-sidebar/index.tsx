import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import React from "react";
import JsonSource from "@/components/email-editor/right-sidebar/accordions/json-source";
import MjmlSource from "@/components/email-editor/right-sidebar/accordions/mjml-source";
import { useState } from "react";
import { SourceAccordionType } from "@/types/email-editor.types";
import ImageAttributes from "@/components/email-editor/right-sidebar/image-attributes";
import HeroAttributes from "@/components/email-editor/right-sidebar/hero-attributes";
import ButtonAttributes from "@/components/email-editor/right-sidebar/button-attributes";
import TextAttributes from "@/components/email-editor/right-sidebar/text-attributes";

const RightSidebar = () => {
  const [expanded, setExpanded] = useState<SourceAccordionType>("json");
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "25vw",
        height: "100%",
        border: "2px solid #e5e6ec"
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab
              label="Configration"
              value="1"
              sx={{ textTransform: "none" }}
            />
            <Tab sx={{ textTransform: "none" }} label="Source code" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <ImageAttributes />
          <HeroAttributes />
          <ButtonAttributes />
          <TextAttributes />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <JsonSource
            expanded={expanded}
            handleChange={(value: SourceAccordionType) => setExpanded(value)}
          />
          <MjmlSource
            expanded={expanded}
            handleChange={(value: SourceAccordionType) => setExpanded(value)}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RightSidebar;
