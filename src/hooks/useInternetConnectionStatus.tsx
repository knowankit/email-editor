import { useEffect, useState } from "react";

const useInternetConnectionStatus = () => {
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

  return [isConnected];
};

export default useInternetConnectionStatus;
