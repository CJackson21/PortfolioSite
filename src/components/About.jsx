import React from "react";
import { Box, Stack, Typography } from "@mui/material";

function About() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "auto",
        padding: "2rem",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            padding: "5vh", // Padding for spacing around content
            maxWidth: "80vw", // Constrain the width for better readability
            textAlign: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant='h3'
            fontWeight='bold'
            sx={{
              letterSpacing: "0.2vw",
            }}
          >
            About Me
          </Typography>

          {/* Introduction */}
          <Typography
            variant='h6'
            sx={{
              color: "text.primary",
              lineHeight: "1.8",
            }}
          >
            I am currently studying Computer Science at George Fox University,
            specializing in cybersecurity. From a young age, I developed a
            strong interest in problem-solving and understanding the inner
            workings of hardware and software. This curiosity grew into a
            passion for software and web development.
          </Typography>

          {/* Variety of Programming Languages */}
          <Typography
            variant='h6'
            sx={{
              color: "text.primary",
              lineHeight: "1.8",
              fontStyle: "italic",
            }}
          >
            I have experience working with a large variety of programming
            languages and technologies. I am always eager to explore new tools
            and frameworks that can help me build innovative solutions to
            challenging problems.
          </Typography>

          {/* Hobbies */}
          <Typography
            variant='h6'
            sx={{
              color: "text.primary",
              lineHeight: "1.8",
            }}
          >
            Outside of my academic and programming pursuits, I enjoy playing
            basketball, lifting weights, gaming, and spending time outdoors
            whenever possible.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(About);
