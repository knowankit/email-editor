import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import useSnackBarStore from "@/store/snackbar";

const OnlineOfflineStatus = () => {
  const [isConnected, setConnection] = useState(false);
  const { showSnackbar } = useSnackBarStore();

  useEffect(() => {
    window.addEventListener("offline", () => {
      setConnection(false);

      const offLineMessage: any = {
        severity: "error",
        message: "No internet connection 🥲",
        vertical: "top",
        horizontal: "left",
        isOpen: true,
        autoHideDuration: 3000
      };

      showSnackbar(offLineMessage);
    });

    window.addEventListener("online", () => {
      setConnection(true);

      const offLineMessage: any = {
        severity: "success",
        message: "Internet is back 🥳",
        vertical: "top",
        horizontal: "left",
        isOpen: true,
        autoHideDuration: 3000
      };

      showSnackbar(offLineMessage);
    });

    setConnection(navigator.onLine);
  }, []);

  return (
    <IconButton
      size="small"
      color={isConnected ? "primary" : "error"}
      sx={{ textTransform: "none", mr: "1rem" }}
    >
      {isConnected ? <WifiIcon /> : <WifiOffIcon />}
    </IconButton>
  );
};

export default OnlineOfflineStatus;
