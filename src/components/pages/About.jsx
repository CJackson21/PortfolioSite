import React from "react";
import {
  Box,
  Typography,
  Container,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const About = React.forwardRef((props, ref) => {
  const theme = useTheme();

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
        pb: { xs: 15 },
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
            Passionate Full Stack Developer · Lifelong Learner · Christ Follower
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 700 }}>
            {`Hi! I'm Caleb Jackson, a Full Stack Developer focused on building
            clean, scalable, and intuitive web applications. Driven by
            curiosity, I found my way into Software Engineering, and I've been
            diving deeper into the craft every day since.`}
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: 700 }}>
            {`I enjoy working on new projects, lifting weights, playing
            basketball, hiking, building Legos, and gaming. I'm also actively
            working on strengthening my faith and deepening my relationship with
            God, something that's been deeply important to my growth both
            personally and professionally.`}
          </Typography>
        </Stack>
        {/* Contact Section */}
        <Stack
          spacing={2.5}
          alignItems="center"
          sx={{
            pt: 12,
            position: "relative",
          }}
        >
          <Typography variant="body1" textAlign="center" color="text.primary">
            {`I'd love to hear from you! Reach out via email or social media.`}
          </Typography>
          <Stack
            direction="row"
            spacing={3.5}
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              p: 2,
              borderRadius: 4,
              boxShadow: 2,
            }}
          >
            <Typography
              component="a"
              href="mailto:calebjackson2002@gmail.com"
              aria-label="Send Email"
              sx={{
                paddingY: 0,
                color: theme.palette.text.secondary,
                transition: "color 0.3s ease",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <EmailIcon
                sx={{ fontSize: "2.8rem", color: theme.palette.primary.main }}
              />
            </Typography>
            <Typography
              component="a"
              href="https://instagram.com/cjjackson.15"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Instagram"
              sx={{
                paddingY: 0,
                color: theme.palette.text.secondary,
                transition: "color 0.3s ease",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              <InstagramIcon
                sx={{ fontSize: "2.8rem", color: theme.palette.primary.main }}
              />
            </Typography>
            <Typography
              component="a"
              href="https://www.linkedin.com/in/caleb-jackson-b08660264"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn"
              sx={{
                paddingY: 0,
                color: theme.palette.text.secondary,
                transition: "color 0.3s ease",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              <LinkedInIcon
                sx={{ fontSize: "2.8rem", color: theme.palette.primary.main }}
              />
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
});

About.displayName = "About";

export default About;
