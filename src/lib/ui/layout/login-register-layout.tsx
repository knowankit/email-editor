import { ReactNode } from "react";
import { Box } from "@mui/material";

const LoginRegisterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("assets/image/background-login-page.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
      }}
    >
      {children}
    </Box>
  );
};

export default LoginRegisterLayout;
