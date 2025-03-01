import React from "react";
import { Box, Typography } from "@mui/material";
import "../css/TypingEffect.css";

const TypingEffect = () => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  // precompute the text using useMemo
  const fullText = React.useMemo(
    () =>
      "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.",
    []
  );

  // Memoized typing logic
  const typeWriter = React.useCallback(() => {
    let i = 0;
    const speed = 70;

    const type = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }, [fullText]);

  // run typeWriter and cursor blinking effects
  React.useEffect(() => {
    typeWriter();

    // cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // cleanup on unmount
    return () => clearInterval(cursorInterval);
  }, [typeWriter]);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        variant='h6'
        component='div'
        sx={{
          display: "inline-block",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          position: "relative",
          height: "4rem",
        }}
      >
        {displayedText}
        <Box
          component='span'
          sx={{
            display: "inline-block",
            visibility: showCursor ? "visible" : "hidden",
            position: "absolute",
            width: "1ch",
            backgroundColor: "inherit",
            height: "1.2em",
          }}
        >
          |
        </Box>
      </Typography>
    </Box>
  );
};

export default TypingEffect;
