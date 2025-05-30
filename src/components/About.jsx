import React from "react";
import { Box, Typography, Container, Avatar, Stack } from "@mui/material";

const About = React.forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      id="about"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, sm: 10 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight="bold">
            About Me
          </Typography>

          <Avatar
            alt="Caleb Jackson"
            src="/img/Jackson_Caleb_1-2.jpg"
            sx={{
              width: { xs: 120, sm: 150 },
              height: { xs: 120, sm: 150 },
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: "text.primary",
              maxWidth: 800,
            }}
          >
            Passionate Full Stack Developer · Lifelong Learner · Tech Enthusiast
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 700 }}>
            {`Hi! I'm Caleb Jackson, a Full Stack Developer focused on building
            clean, scalable, and intuitive web applications. Driven by curiosity, 
            I found my way into Software Engineering, and I've been diving deeper 
            into the craft every day since.`}
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 700 }}>
            {`I enjoy working on new projects, lifting weights, playing basketball, 
            hiking, building Legos, and gaming. I'm also actively working on strengthening
             my faith and deepening my relationship with God, something that's been deeply 
             important to my growth both personally and professionally.`}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
});

About.displayName = "About";

export default About;
