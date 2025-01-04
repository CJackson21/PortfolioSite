import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import projects from "../data/projectsData";
import PropTypes from "prop-types";

function Projects({ isMobile }) {
  const theme = useTheme();

  // Desktop hover: which card is hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Mobile click: which card is open in Dialog
  const [openProject, setOpenProject] = useState(null);

  // Text color for both modes
  const textColor =
    theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.text.secondary;

  // Handlers for mobile dialog
  const handleOpenDialog = (index) => setOpenProject(index);
  const handleCloseDialog = () => setOpenProject(null);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: { xs: 2, sm: 5 },
        position: "relative",
      }}
    >
      <Box
        sx={{
          margin: { xs: 3.5, sm: 0 },
          width: { xs: "90%", sm: "90vw", md: "80vw" },
          backgroundColor: theme.palette.background.paper,
          borderRadius: "1rem",
          padding: { xs: "5vw", sm: "4vh" },
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
          sx={{
            maxWidth: "100%",
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
            My Projects
          </Typography>
          <Divider
            sx={{
              width: { xs: "60%", sm: "50%" },
              borderColor: theme.palette.primary.light,
            }}
          />
          {/* Projects Grid */}
          <Grid
            container
            spacing={4}
            justifyContent='center'
            alignItems='stretch'
            sx={{
              width: "100%",
            }}
          >
            {projects.map((project, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{
                  margin: isMobile ? 3 : 1,
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <Box
                  sx={{
                    visibility: "hidden",
                    pointerEvents: "none",
                    borderRadius: "0.75rem",
                    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                    padding: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      height: { xs: "6rem", sm: "8rem" },
                    }}
                  />
                  <Typography
                    variant='h5'
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {project.title}
                  </Typography>
                </Box>

                {/* 2) The real card, absolutely positioned */}
                <Box
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                  onFocus={() => !isMobile && setHoveredIndex(index)}
                  onBlur={() => !isMobile && setHoveredIndex(null)}
                  tabIndex={0}
                  role='button'
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
                    borderRadius: "0.75rem",
                    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                    padding: "1.5rem",
                    backgroundColor: theme.palette.background.default,
                    zIndex: hoveredIndex === index ? 999 : 1,
                    cursor: "pointer",
                    transition: "transform 0.6s ease, box-shadow 0.3s ease",
                    transformOrigin: "center center",
                    "&:hover": {
                      ...(!isMobile && {
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.3)",
                      }),
                    },
                    // Spin + scale if hovered
                    ...(hoveredIndex === index && {
                      transform: "rotateY(360deg) scale(1.1)",
                    }),
                    "&:focus": {
                      outline: `0.125rem solid ${theme.palette.primary.main}`,
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
                      marginBottom: "0.5rem",
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
                      loading='lazy'
                    />
                  </Box>
                  {/* Project Title */}
                  <Typography
                    id={`project-title-${index}`}
                    variant='h5'
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      textAlign: "center",
                      marginBottom: hoveredIndex === index ? "0.75rem" : 0,
                      pointerEvents: "none", // Prevent hover loss when hovering over text
                    }}
                  >
                    {project.title}
                  </Typography>
                  {/* Desktop: show description if hovered */}
                  {!isMobile && hoveredIndex === index && (
                    <Typography
                      variant='body1'
                      sx={{
                        color: textColor,
                        textAlign: "center",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        lineHeight: 1.6,
                        pointerEvents: "none", // Prevent hover loss when hovering over text
                      }}
                    >
                      {project.description}
                    </Typography>
                  )}
                  {/* Mobile: button to open dialog */}
                  {isMobile && (
                    <Button
                      onClick={() => handleOpenDialog(index)}
                      variant='contained'
                      sx={{
                        marginTop: "1rem",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                        borderRadius: "1.25rem",
                        padding: "0.5rem 1.5rem",
                        fontSize: "0.875rem",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
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

      {/* Dialog for Mobile */}
      {isMobile && openProject !== null && (
        <Dialog
          open={openProject !== null}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth='sm'
          aria-labelledby='project-dialog-title'
          aria-describedby='project-dialog-description'
        >
          <DialogTitle
            id='project-dialog-title'
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            {projects[openProject].title}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant='body1'
              id='project-dialog-description'
              sx={{
                color: textColor,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {projects[openProject].description}
            </Typography>
            <Box sx={{ textAlign: "center", marginTop: "1.5rem" }}>
              <Button
                onClick={handleCloseDialog}
                variant='contained'
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.paper,
                  borderRadius: "1.25rem",
                  padding: "0.5rem 1.5rem",
                  fontSize: "0.875rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
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
