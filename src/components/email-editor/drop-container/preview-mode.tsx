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

      setPreviewStatus(false);
    };

    loadMjMl();
  }, []);

  const getStyle = () => {
    const mobile = {
      width: "360px",
      height: "640px",
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
      width: "600px",
      height: "inherit",
      bgcolor: "white",
      border: "none"
    };

    return desktop;
  };

  if (loadingPreview) return <SkeletonLoader />;

  return (
    <Box
      component="iframe"
      ref={iframeRef}
      title="Email preview"
      sx={getStyle()}
    />
  );
};

export default PreviewMode;
