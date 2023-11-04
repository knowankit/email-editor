import { Box } from "@mui/material";
import SectionPreview from "../preview-items/section.preview";
import useEmailStore from "@/store/email";
import HeroPreview from "@/components/preview-items/hero.preview";

const EditMode = () => {
  const { emailData } = useEmailStore();

  return (
    <Box sx={{ width: "600px", bgcolor: "white", mt: "2rem" }}>
      {emailData["children"].map((section: any, index: number) => {
        return (
          <Box key={index}>
            <Box aria-haspopup="true" sx={{ cursor: "pointer" }}>
              {section.tagName === "mj-section" && (
                <SectionPreview
                  section={section}
                  path={`children.${index}`}
                  index={index}
                  key={index}
                />
              )}

              {section.tagName === "mj-hero" && (
                <HeroPreview
                  section={section}
                  index={index}
                  key={index}
                  path={`children.${index}`}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default EditMode;
