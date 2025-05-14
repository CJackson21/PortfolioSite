import React from "react";
import { Box, Typography } from "@mui/material";

const TypingEffect = () => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  const fullText = React.useMemo(
    () =>
      "I am a recent graduate from George Fox University with a Bachelor's in Computer Science with a concentration in Cybersecurity. Feel free to take a look around at some of my work.",
    []
  );

  const typeWriter = React.useCallback(() => {
    let i = 0;
    const speed = 10;

    const type = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }, [fullText]);

  React.useEffect(() => {
    typeWriter();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [typeWriter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {/* Fixed-width container for all screen sizes */}
      <Box
        sx={{
          width: {
            xs: "95%", // Mobile
            md: "650px", // 1080p
            lg: "750px", // 1440p
            xl: "850px", // Ultrawide
          },
          maxWidth: "100%",
          position: "relative",
          minHeight: "150px", // Prevents layout shift
        }}
      >
        {/* Hidden text for layout */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            visibility: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {fullText}
        </Typography>

        {/* Visible typing effect */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {displayedText}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              visibility: showCursor ? "visible" : "hidden",
              width: "1ch",
              backgroundColor: "inherit",
              height: "1.2em",
              verticalAlign: "text-top",
            }}
          >
            |
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(TypingEffect);
