import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import projects from "../data/projectsData";
import PropTypes from "prop-types";

function Projects({ isMobile }) {
  const theme = useTheme();
  const {
    palette: { mode, primary, background, text, divider },
  } = theme;

  // Track which project card is hovered on desktop, or open in mobile dialog
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [openProject, setOpenProject] = React.useState(null);

  // Choose text color based on the theme mode
  const textColor = mode === "dark" ? text.primary : text.secondary;

  // Handlers for mobile dialog
  const handleOpenDialog = (index) => setOpenProject(index);
  const handleCloseDialog = () => setOpenProject(null);

  // Reusable button style
  const buttonStyle = {
    mt: "1rem",
    backgroundColor: primary.main,
    color: background.paper,
    borderRadius: "1.25rem",
    py: "0.5rem",
    px: "1.5rem",
    fontSize: "0.875rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: primary.dark,
    },
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, sm: 4, md: 5 },
        position: "relative",
      }}
    >
      <Box
        sx={{
          m: { xs: 3.5, sm: 0 },
          width: { xs: "90%", sm: "90vw", md: "80vw", lg: "70vw" },
          backgroundColor: background.paper,
          borderRadius: "1rem",
          p: { xs: "5vw", sm: "4vh" },
          boxShadow: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 1s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Stack
          spacing={4}
          sx={{ maxWidth: "100%", textAlign: "center", alignItems: "center" }}
        >
          {/* Section Title */}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              letterSpacing: "0.15em",
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              color: primary.main,
            }}
          >
            My Projects
          </Typography>
          <Divider
            sx={{
              width: { xs: "60%", sm: "50%" },
              borderColor: primary.light,
            }}
          />
          {/* Projects Grid */}
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="stretch"
          >
            {projects.map((project, index) => (
              <Grid
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                {/* Ghost Box to preserve layout */}
                <Box
                  sx={{
                    width: isMobile ? "50vw" : "20vw",
                    visibility: "hidden",
                    pointerEvents: "none",
                    borderRadius: "0.75rem",
                    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                    p: "1.5rem",
                    minHeight: { xs: "16rem", sm: "100%" },
                  }}
                >
                  <Box sx={{ height: { xs: "6rem", sm: "8rem" } }} />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    {project.title}
                  </Typography>
                </Box>
                <Box
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                  onFocus={() => !isMobile && setHoveredIndex(index)}
                  onBlur={() => !isMobile && setHoveredIndex(null)}
                  tabIndex={0}
                  role="button"
                  aria-labelledby={`project-title-${index}`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isMobile) {
                      setHoveredIndex(index);
                    }
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: hoveredIndex === index ? "auto" : "100%",
                    borderRadius: "0.75rem",
                    boxShadow:
                      hoveredIndex === index
                        ? "0 0.5rem 1rem rgba(0, 0, 0, 0.3)"
                        : "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                    p: "1.5rem",
                    backgroundColor: background.default,
                    zIndex: hoveredIndex === index ? 999 : 1,
                    cursor: "pointer",
                    transition:
                      "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transformOrigin: "center",
                    transform:
                      hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    "&:focus": {
                      outline: `0.125rem solid ${primary.main}`,
                    },
                  }}
                >
                  {/* Project Image */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "6rem", sm: "8rem" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: "0.5rem",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} Logo`}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      loading="lazy"
                    />
                  </Box>

                  {/* Project Title */}
                  <Typography
                    id={`project-title-${index}`}
                    variant="h5"
                    gutterBottom
                    sx={{
                      color: primary.main,
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      textAlign: "center",
                      mb: hoveredIndex === index ? "0.75rem" : 0,
                      pointerEvents: "none",
                    }}
                  >
                    {project.title}
                  </Typography>

                  {/* Desktop: Show description and GitHub button on hover */}
                  {!isMobile && hoveredIndex === index && (
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          color: textColor,
                          textAlign: "center",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          lineHeight: 1.6,
                          maxHeight: "18vh",
                          overflowY: "auto",
                          "&::-webkit-scrollbar": { width: "0.4rem" },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: divider,
                            borderRadius: "1rem",
                          },
                        }}
                      >
                        {project.description}
                      </Typography>

                      {/* If a repo is available, show GitHub button */}
                      {project.repo && (
                        <Button
                          component="a"
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          sx={{
                            mt: "0.75rem",
                            borderRadius: "1.25rem",
                            py: "0.4rem",
                            px: "1rem",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            borderColor: primary.main,
                            color: primary.main,
                            "&:hover": {
                              backgroundColor: primary.light,
                            },
                          }}
                        >
                          View Repository
                        </Button>
                      )}
                    </>
                  )}

                  {/* Mobile: Button to open dialog */}
                  {isMobile && (
                    <Button
                      onClick={() => handleOpenDialog(index)}
                      variant="contained"
                      sx={buttonStyle}
                    >
                      View Details
                    </Button>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      {/* Mobile Dialog */}
      {isMobile && openProject !== null && (
        <Dialog
          open={openProject !== null}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
          aria-labelledby="project-dialog-title"
          aria-describedby="project-dialog-description"
        >
          <DialogTitle
            id="project-dialog-title"
            sx={{ color: primary.main, fontWeight: "bold" }}
          >
            {projects[openProject].title}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              id="project-dialog-description"
              sx={{
                color: textColor,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {projects[openProject].description}
            </Typography>

            {/* If a repo is available, show GitHub button in dialog */}
            {projects[openProject].repo && (
              <Box sx={{ textAlign: "center", mt: "1.5rem" }}>
                <Button
                  component="a"
                  href={projects[openProject].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  sx={{
                    mb: "1rem",
                    borderRadius: "1.25rem",
                    py: "0.4rem",
                    px: "1rem",
                    fontSize: "0.875rem",
                    textTransform: "none",
                    borderColor: primary.main,
                    color: primary.main,
                    "&:hover": {
                      backgroundColor: primary.light,
                    },
                  }}
                >
                  View on GitHub
                </Button>
              </Box>
            )}

            <Box sx={{ textAlign: "center", mt: "1.5rem" }}>
              <Button
                onClick={handleCloseDialog}
                variant="contained"
                sx={buttonStyle}
              >
                Close
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Grid>
  );
}

Projects.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default React.memo(Projects);
