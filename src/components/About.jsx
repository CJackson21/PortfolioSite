import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

function About() {
  // simple about me section (TODO: add more to this later)
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90vw", sm: "fit-content" },
          maxWidth: "90vw",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderRadius: "8px",
          padding: { xs: "4vw", sm: "3vh" },
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            padding: "5vh",
            maxWidth: { xs: "100%", sm: "35vw" },
            textAlign: "center",
          }}
        >
          <Typography
            variant='h4'
            fontWeight='bold'
            sx={{
              letterSpacing: "0.2vw",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            About Me
          </Typography>

          {/* Introduction */}
          <Typography
            variant='h6'
            sx={{
              color: "text.primary",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            I am currently studying Computer Science at George Fox University,
            specializing in cybersecurity. From a young age, I developed a
            strong interest in problem-solving and understanding the inner
            workings of hardware and software. This curiosity grew into a
            passion for software and web development.
          </Typography>
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
    </Grid>
  );
}

export default React.memo(About);
