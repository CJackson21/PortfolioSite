import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const projects = [
  {
    title: "Spotify Discord Bot",
    description:
      "A bot that uses Spotify's API to play music in Discord voice channels.",
    link: "#",
    image: "/img/spotify.png", // Path to your logo image
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive and modern portfolio website built using React and Material-UI.",
    link: "#",
    image: "/img/discord.png", // Path to your logo image
  },
];

function Projects() {
  return (
    <Box
      sx={{
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                {/* Add Logo Image */}
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
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography variant='h5' fontWeight='bold' gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant='contained'
                  color='primary'
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Projects;
