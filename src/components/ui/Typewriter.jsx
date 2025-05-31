import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const TypingEffect = ({ startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  const fullText =
    "I am a Computer Science graduate from George Fox University. Feel free to explore my work below!";

  React.useEffect(() => {
    let i = 0;
    const speed = 25;

    const type = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };

    const startTimer = setTimeout(() => {
      type();
    }, startDelay);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(startTimer);
      clearInterval(cursorInterval);
    };
  }, [startDelay]);

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 3 },
        mb: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "60px",
          textAlign: "center",
        }}
      >
        {/* Hidden text for layout */}
        <Typography
          variant="h6"
          sx={{
            visibility: "hidden",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.5,
            px: 1,
          }}
        >
          {fullText}
        </Typography>

        {/* Visible typing effect */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            whiteSpace: "normal",
            wordBreak: "break-word",
            textAlign: "center",
            lineHeight: 1.5,
            px: 1,
          }}
        >
          {displayedText}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              bgcolor: "text.primary",
              ml: "2px",
              verticalAlign: "middle",
              visibility: showCursor ? "visible" : "hidden",
              animation: "blink 1s step-end infinite",
              "@keyframes blink": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0 },
              },
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
};

TypingEffect.propTypes = {
  startDelay: PropTypes.number,
};

export default React.memo(TypingEffect);
