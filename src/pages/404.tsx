import NotFound from "@/lib/ui/not-found";
import { Box } from "@mui/material";

const Custom404 = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <NotFound />
    </Box>
  );
};

export default Custom404;
