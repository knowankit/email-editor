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
import useSnackBarStore from "@/store/snackbar";
import SendIcon from "@mui/icons-material/Send";
import { getBaseURL } from "@/lib/util/get-email-url";
import { useSession } from "next-auth/react";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const FullScreenPreview = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const { emailData } = useEmailStore();
  const { showSnackbar } = useSnackBarStore();
  // const [from, setFrom] = useState("");
  const { data: session } = useSession();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const { user } = session as any;

  const loadMjMl = async () => {
    const url = `${getBaseURL()}/api/email-editor/generate-mjml`;
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
    if (!user || !to) return;

    const data = await loadMjMl();
    const URL = `${getBaseURL()}/api/email-editor/send-mail`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        htmlString: data.html,
        to,
        from: user.email,
        subject
      })
    });

    const json = await response.json();

    if (json.status == 200) {
      showSnackbar({
        autoHideDuration: 3000,
        isOpen: true,
        message: "Email has been sent",
        vertical: "top",
        horizontal: "center"
      });
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
          <Box display="flex" flexDirection="column" width="15rem" mt="1rem">
            <TextField
              value={user.email}
              type="email"
              variant="outlined"
              label="From"
              // disabled
              size="small"
              placeholder="Sender's email"
              // onChange={e => setFrom(e.target.value)}
            ></TextField>
            <TextField
              size="small"
              value={to}
              variant="outlined"
              label="To"
              type="email"
              sx={{ mt: "1rem" }}
              placeholder="Receiver's email"
              onChange={e => setTo(e.target.value)}
            ></TextField>
            <TextField
              size="small"
              value={subject}
              variant="outlined"
              label="Subject"
              type="text"
              sx={{ mt: "1rem" }}
              placeholder="Subject"
              onChange={e => setSubject(e.target.value)}
            ></TextField>

            <Box mt={2}>
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
    </>
  );
};

export default FullScreenPreview;
