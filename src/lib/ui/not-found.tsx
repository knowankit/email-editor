import { Box } from "@mui/material";
import Image from "next/image";

const NotFound = () => {
  return (
    <Box>
      <Image
        src="/assets/image/not-found.jpg"
        className="image-section"
        width={400}
        height={400}
        style={{ objectFit: "contain" }}
        alt="Home page"
      />
    </Box>
  );
};

export default NotFound;
