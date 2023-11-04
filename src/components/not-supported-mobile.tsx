import { Typography, Box } from "@mui/material";
import Image from "next/image";

const NotSupportedOnMobile = () => {
  return (
    <Box
      display="flex"
      padding="1rem"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontWeight="bold" variant="h6">
        Smartphones are not supported
      </Typography>
      <Typography textAlign="center">
        We are sorry mobile phones are not supported yet. Please try again on
        your computer.
      </Typography>
      <Box mt={2}>
        <Image
          src="assets/image/smartphone.svg"
          width={150}
          height={150}
          alt="Picture of the author"
        />
      </Box>
    </Box>
  );
};

export default NotSupportedOnMobile;
