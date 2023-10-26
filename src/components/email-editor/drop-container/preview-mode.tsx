import { Box } from "@mui/material";
import useEmailStore from "@/store/email";
import { useEffect, useRef, useState } from "react";
import { getBaseURL } from "@/lib/util/get-email-url";
import SkeletonLoader from "@/components/email-editor/drop-container/skeleton-loader";

const PreviewMode = ({ isMobile }: { isMobile: boolean }) => {
  const [loadingPreview, setPreviewStatus] = useState(false);
  const { emailData } = useEmailStore();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const loadMjMl = async () => {
      setPreviewStatus(true);

      const url = `${getBaseURL()}/api/email-editor/generate-mjml`;

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
      setPreviewStatus(false);

      if (iframeRef.current) {
        const iframeDocument =
          iframeRef.current.contentDocument ||
          (iframeRef.current.contentWindow
            ? iframeRef.current.contentWindow.document
            : null);

        if (iframeDocument) {
          iframeDocument.open();
          iframeDocument.write(data.html);
          iframeDocument.close();
        }
      }
    };

    loadMjMl();
  }, []);

  const getStyle = () => {
    const defaultStyle = {
      display: loadingPreview ? "none" : "block"
    };

    const mobile = {
      ...defaultStyle,
      width: "360px",
      height: "600px",
      bgcolor: "white",
      margin: "1rem",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      position: "relative",
      overflow: "scroll"
    };

    if (isMobile) return mobile;

    const desktop = {
      ...defaultStyle,
      width: "600px",
      height: "600px",
      bgcolor: "white",
      border: "none"
    };

    return desktop;
  };

  return (
    <>
      {loadingPreview && <SkeletonLoader />}
      <Box
        component="iframe"
        ref={iframeRef}
        title="Email preview"
        sx={getStyle()}
      ></Box>
    </>
  );
};

export default PreviewMode;
