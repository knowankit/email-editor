import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useSnackBarStore from "@/store/snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar() {
  const { snackbarDetail, hideSnackbar } = useSnackBarStore();
  const {
    vertical = "top",
    horizontal = "center",
    isOpen,
    autoHideDuration,
    severity,
    message
  } = snackbarDetail;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      message={message}
      key={vertical + horizontal}
      sx={{ color: "white" }}
      onClose={() => hideSnackbar()}
    >
      <Alert severity={severity} sx={{ width: "100%", color: "white" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
