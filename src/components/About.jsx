import React from "react";
import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function About() {
  const theme = useTheme();

  const textColor = React.useMemo(() => {
    return theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.text.secondary;
  }, [theme]);

  console.log(textColor);

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
          backgroundColor: theme.palette.background.paper,
          borderRadius: "16px",
          padding: { xs: "5vw", sm: "4vh" },
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 1s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Stack
          spacing={4}
          sx={{
            padding: "5vh",
            maxWidth: { xs: "100%", sm: "40vw" },
            textAlign: "center",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant='h3'
            fontWeight='bold'
            sx={{
              letterSpacing: "0.15em",
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              color: theme.palette.primary.main,
            }}
          >
            About Me
          </Typography>
          <Divider
            sx={{ width: "50%", borderColor: theme.palette.primary.light }}
          />

          {/* Introduction */}
          <Typography
            variant='body1'
            sx={{
              color: textColor,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            {`Hi, I'm Caleb, a Computer Science student at George Fox University
            specializing in cybersecurity. My journey into tech began with a
            childhood curiosity about how hardware and software work together,
            and it has since evolved into a deep passion for building
            meaningful, secure, and innovative solutions.`}
          </Typography>

          {/* Section: Professional Interests */}
          <Typography
            variant='body1'
            sx={{
              color: textColor,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            With experience across a broad spectrum of programming languages and
            frameworks, I enjoy tackling challenging problems. From developing
            efficient algorithms to creating visually stunning web applications,
            I thrive on learning new tools and pushing the boundaries of what I
            can create.
          </Typography>

          {/* Section: Personal Touch */}
          <Typography
            variant='body1'
            sx={{
              color: textColor,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Outside the digital realm, I’m an avid basketball player, a fitness
            enthusiast who loves lifting weights, and a gamer who enjoys
            immersing myself in captivating worlds. Whether it’s exploring the
            great outdoors or diving into a technical challenge, I bring the
            same passion and energy to everything I do.
          </Typography>

          {/* Closing Statement */}
          <Typography
            variant='body1'
            sx={{
              color: textColor,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontStyle: "italic",
            }}
          >
            My ultimate goal? To contribute to impactful projects that make the
            world a better, safer place, one line of code at a time.
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
}

export default React.memo(About);
