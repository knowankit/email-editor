import introJs from "intro.js";
import { Button } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useEffect } from "react";
import "intro.js/introjs.css";

const intro = introJs();

const IntroButton = () => {
  useEffect(() => {
    intro.setOptions({
      steps: [
        {
          title: "Welcome to Email editor 👋 ",
          intro: "Follow the guidelines"
        },
        {
          element: document.querySelector(".step-1") as HTMLElement,
          intro: "These are the elements that can be dragged."
        },
        {
          element: document.querySelector(".step-2") as HTMLElement,
          intro: "These are containers."
        },
        {
          element: document.querySelector(".step-3") as HTMLElement,
          intro: "You can drop your elements here."
        },
        {
          element: document.querySelector(".step-4") as HTMLElement,
          intro: "You can use these to get Mobile and Desktop preview."
        }
      ]
    });
  }, []);

  return (
    <Button
      color="secondary"
      size="small"
      variant="contained"
      onClick={() => intro.start()}
      startIcon={<PlayCircleFilledWhiteIcon />}
      sx={{ textTransform: "none", mr: "1rem" }}
    >
      Intro
    </Button>
  );
};

export default IntroButton;
