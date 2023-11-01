import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/lib/ui/accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/base";
import useEmailStore from "@/store/email";
import { Button } from "@mui/material";
import { useState } from "react";
import { SourceAccordionType } from "@/types/email-editor.types";
interface ILayout {
  expanded: SourceAccordionType;
  handleChange: (value: SourceAccordionType) => void;
}

const JsonSource = ({ expanded, handleChange }: ILayout) => {
  const { emailData, setEmailData } = useEmailStore();
  const [jsonContent, setJSONContent] = useState<any>(emailData);

  const applyChanges = () => {
    try {
      const t = JSON.parse(jsonContent);
      setEmailData({ ...t });
    } catch (error) {
      alert("Error in JSON");
    }
  };

  return (
    <Accordion
      expanded={expanded === "json"}
      onChange={() => handleChange(expanded === "json" ? "" : "json")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary aria-controls="content">
        <Typography fontSize="0.8rem">JSON source</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" sx={{ height: "400px" }}>
          <TextareaAutosize
            maxRows={4}
            onChange={(e: any) => setJSONContent(e.target.value)}
            style={{
              width: "100%",
              overflow: "scroll",
              height: "inherit",
              fontFamily: "Signika Negative"
            }}
            defaultValue={JSON.stringify(jsonContent, null, 2)}
          />
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <Button size="small" variant="contained" onClick={applyChanges}>
            Apply
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default JsonSource;
