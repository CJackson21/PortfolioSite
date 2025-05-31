import React from "react";
import { Box, Typography } from "@mui/material";

const TypingEffect = () => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  const fullText = React.useMemo(
    () =>
      "I am a Computer Science graduate from George Fox University. Feel free to explore my work below!",
    []
  );

  const typeWriter = React.useCallback(() => {
    let i = 0;
    const speed = 15;

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
        width: "100%",
        padding: { xs: "0 16px", sm: "0 24px" },
        margin: "0 auto",
        maxWidth: { xs: "100%", sm: "80%", md: "70%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          minHeight: { xs: "100px", sm: "150px" },
          textAlign: { xs: "center" },
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
            textAlign: "inherit",
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
            textAlign: "inherit",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "relative",
              display: "inline",
            }}
          >
            {displayedText}
            <Box
              component="span"
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                visibility: showCursor ? "visible" : "hidden",
                width: "1px",
                height: "1em",
                backgroundColor: "currentColor",
                animation: "blink 1s step-start infinite",
              }}
            />
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(TypingEffect);
