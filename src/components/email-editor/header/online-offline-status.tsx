import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const OnlineOfflineStatus = () => {
  const [isConnected, setConnection] = useState(false);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setConnection(false);
    });

    window.addEventListener("online", () => {
      setConnection(true);
    });

    setConnection(navigator.onLine);
  }, []);

  return (
    <Button
      size="small"
      color={isConnected ? "primary" : "error"}
      startIcon={isConnected ? <WifiIcon /> : <WifiOffIcon />}
      sx={{ textTransform: "none", mr: "1rem" }}
    >
      {isConnected ? "Online" : "offline"}
    </Button>
  );
};

export default OnlineOfflineStatus;
