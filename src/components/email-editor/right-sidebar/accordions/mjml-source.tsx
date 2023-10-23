import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import useEmailStore from "@/store/email";
import { TextareaAutosize } from "@mui/base";

import { SourceAccordionType } from "@/types/email-editor.types";

interface ILayout {
  expanded: SourceAccordionType;
  handleChange: (value: SourceAccordionType) => void;
}
const MjmlSource = ({ expanded, handleChange }: ILayout) => {
  const [htmlData, setHtmlData] = useState("");
  const { emailData } = useEmailStore();

  useEffect(() => {
    const loadMjMl = async () => {
      const url = "http://localhost:3000/api/email-editor/generate-mjml";

      const withHtml = {
        tagName: "mjml",
        attributes: {},
        children: [emailData]
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(withHtml) // Convert the data to JSON format
      });
      const data = await response.json();
      setHtmlData(data.html);
    };

    loadMjMl();
  }, []);

  return (
    <Accordion
      expanded={expanded === "mjml"}
      onChange={() => handleChange(expanded === "mjml" ? "" : "mjml")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="content">
        <Typography fontSize="0.8rem">Mjml Source</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" sx={{ height: "400px" }}>
          <TextareaAutosize
            maxRows={4}
            disabled
            style={{
              width: "100%",
              overflow: "scroll",
              height: "inherit",
              fontFamily: "Signika Negative"
            }}
            defaultValue={htmlData}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MjmlSource;
