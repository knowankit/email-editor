import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField
} from "@mui/material";
import useEmailStore from "@/store/email";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const FullScreenPreview = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const { emailData } = useEmailStore();
  const [from, setFrom] = useState("");
  const [isAlertOn, setAlertStatus] = useState(false);

  const [to, setTo] = useState("");

  const loadMjMl = async () => {
    const url = "http://localhost:3000/api/email-editor/generate-mjml";

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

    return data;
  };

  const handleSendMail = async () => {
    if (!to || !from) return;

    const data = await loadMjMl();

    const URL = "http://localhost:3000/api/email-editor/send-mail";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ htmlString: data.html, to, from })
    });

    const json = await response.json();

    if (json.status == 200) {
      setAlertStatus(true);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Send email</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" width="15rem">
            <TextField
              value={from}
              type="email"
              size="small"
              placeholder="Sender's email"
              onChange={e => setFrom(e.target.value)}
            ></TextField>
            <TextField
              size="small"
              value={to}
              type="email"
              sx={{ mt: "1rem" }}
              placeholder="Receiver's email"
              onChange={e => setTo(e.target.value)}
            ></TextField>
            <Box mt={1}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleSendMail}
                startIcon={<SendIcon />}
                sx={{ textTransform: "none" }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isAlertOn}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%", color: "white" }}>
          Email has been sent
        </Alert>
      </Snackbar>
    </>
  );
};

export default FullScreenPreview;
