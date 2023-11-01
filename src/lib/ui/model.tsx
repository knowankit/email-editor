import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ICustomDialog {
  isOpen: boolean;
  handleClick: () => void;
  handlePrimary?: () => void;
  children: JSX.Element;
  title: string;
}

export default function CustomDialog({
  handleClick,
  handlePrimary,
  isOpen,
  children,
  title
}: ICustomDialog) {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClick}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          Close
        </Button>
        {handlePrimary && (
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            onClick={handlePrimary}
          >
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
