import { GithubPicker, Color } from "react-color";
import Popper from "@/lib/ui/popper";

interface IColorPicker {
  open: boolean;
  anchorEl: HTMLElement | null;
  color: Color;
  onChange: (color: any) => void;
}

const ColorPicker = ({ anchorEl, open, color, onChange }: IColorPicker) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="left">
      <GithubPicker color={color} onChange={onChange} triangle="hide" />
    </Popper>
  );
};

export default ColorPicker;
