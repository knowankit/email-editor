import {
  boxElement,
  boxElementOnDrag
} from "@/components/email-editor/left-sidebar/style";
import Box from "@mui/material/Box";
import { useDrag } from "react-dnd";

interface IElementCard {
  element: {
    icon: JSX.Element;
    text: string;
    tagName: string;
  };
  index: number;
}

const ElementCard = ({ element, index }: IElementCard) => {
  const [collected, drag] = useDrag(() => ({
    type: element.tagName,
    item: { type: element.tagName, keys: "children" },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <Box ref={drag} sx={collected.isDragging ? boxElementOnDrag : boxElement}>
      <Box key={index} textAlign="center" mt={1}>
        {element.icon}
      </Box>
      <Box
        component="p"
        textAlign="center"
        margin={0}
        padding={1}
        fontSize="0.8rem"
      >
        {element.text}
      </Box>
    </Box>
  );
};

export default ElementCard;
