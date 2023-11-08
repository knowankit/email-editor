import { Typography, Badge, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Image from "next/image";

const HomePageHeader = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box p="1rem">
        <Badge color="secondary" badgeContent="Beta">
          <Typography variant="h5" alignItems="center" display="flex">
            <Box mr="0.6rem">
              <Image
                src="/assets/image/email-editor-icon.png"
                width={35}
                height={35}
                alt="Editor icon"
              />
            </Box>
            Editor
          </Typography>
        </Badge>
      </Box>
      <Box>
        <Alert severity="info">
          This project is currently under development, and there is a high
          likelihood of issues that I am actively addressing
        </Alert>
      </Box>
    </Box>
  );
};

export default HomePageHeader;
