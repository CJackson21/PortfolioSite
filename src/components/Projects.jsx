import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const projects = [
  {
    title: "Spotify Discord Bot",
    description:
      "A custom Discord bot designed to bring collaborative music playback to voice channels. The bot integrates the Spotify API to fetch playlist details and the YouTube API to stream songs, overcoming Spotify's playback limitations. Users can contribute to a shared Spotify playlist directly from their phones, and the bot automatically syncs the updates, playing tracks by fetching them from YouTube. Built using Node.js, discord.js, and ffmpeg, the bot supports commands like !play, !skip, and !queue, providing users with full control over the music experience. This project demonstrates advanced API integration, real-time updates, and seamless user interaction within Discord.",
    link: "#",
    image: "/img/spotify.png",
  },
  {
    title: "Portfolio Website (v2)",
    description:
      "This very website is version 2 of my portfolio, designed to showcase my projects, skills, and creativity. Built with React and Material-UI for a modern, responsive user interface, it also integrates Three.js for interactive 3D elements (this site's background). This iteration incorporates cool tools and techniques to enhance user experience, such as smooth animations, modular component design, and advanced styling. It's a demonstration of my ability to build engaging and functional web applications while continuously improving on past work.",
    link: "#",
    image: "/img/react.png",
  },
];

function Projects() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "80vw",
        flexGrow: 1,
        padding: "5vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant='h3'
        fontWeight='bold'
        sx={{
          marginBottom: "3vh",
          letterSpacing: "0.2vw",
        }}
      >
        My Projects
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                // Let the card height adjust to text length
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    height: "10rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} Logo`}
                    style={{
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography variant='h5' fontWeight='bold' gutterBottom>
                  {project.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.primary'
                  sx={{
                    // Allow text to wrap properly
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {/* Add buttons or links here if needed */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Projects;
