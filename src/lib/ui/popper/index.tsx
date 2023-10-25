import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

interface ISectionControl {
  children: JSX.Element;
  open: boolean;
  anchorEl: any;
  placement?: "right" | "bottom" | "left";
}

const SectionControl = ({
  children,
  open,
  anchorEl,
  placement = "right"
}: ISectionControl) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>{children}</Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default SectionControl;
