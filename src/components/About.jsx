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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: { xs: 6, sm: 8 },
                px: 2,
            }}
        >
            <Container maxWidth="md">
                {/* This Stack was causing the error because Stack was not imported */}
                <Stack alignItems="center" spacing={4}>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        textAlign="center"
                        fontWeight="bold"
                    >
                        About Me
                    </Typography>
                    <Avatar
                        alt="Caleb Jackson"
                        src="/img/Jackson_Caleb_1-2.jpg"
                        sx={{ width: 150, height: 150, mb: 2 }}
                    />
                    <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{ fontStyle: "italic", color: "text.secondary" }}
                    >
                        Passionate Full Stack Developer | Lifelong Learner |
                        Tech Enthusiast
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="left"
                        sx={{ lineHeight: 1.7 }}
                    >
                        {`Hello! I'm Caleb Jackson, a dedicated Full Stack
                        Developer with a strong foundation in creating dynamic,
                        responsive, and user-friendly web applications. My
                        journey in software development has been driven by a
                        curiosity for how things work and a passion for building
                        solutions that make a difference.`}
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="left"
                        sx={{ lineHeight: 1.7 }}
                    >
                        {`I thrive in collaborative environments and enjoy
                        tackling complex challenges, continuously seeking to
                        expand my skillset and stay updated with the latest
                        industry trends. When I'm not coding, I enjoy [mention a
                        hobby or two briefly]. Let's connect and build something
                        amazing together!`}
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
});

About.displayName = "About";

export default About;
