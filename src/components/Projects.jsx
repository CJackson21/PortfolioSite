import React from "react";
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import projectsData from "../data/projectsData"; // Ensure this path is correct
import PropTypes from "prop-types";

import VisibilityIcon from "@mui/icons-material/Visibility";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";

const Projects = React.forwardRef(({ isMobile }, ref) => {
  const theme = useTheme();
  const {
    palette: { mode, primary, secondary, text },
  } = theme;

  const [openProjectIndex, setOpenProjectIndex] = React.useState(null);

  const handleOpenDialog = (index) => setOpenProjectIndex(index);
  const handleCloseDialog = () => setOpenProjectIndex(null);

  const selectedProject =
    openProjectIndex !== null ? projectsData[openProjectIndex] : null;

  return (
    <Box
      ref={ref}
      id="projects"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        width: "100%",
        backgroundColor:
          mode === "dark"
            ? alpha(theme.palette.background.default, 0.3)
            : alpha(theme.palette.grey[200], 0.3),
        overflow: "hidden",
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        fontWeight="bold"
        textAlign="center"
        sx={{
          mb: 2,
          color: primary.main,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        My Projects
      </Typography>
      <Divider
        sx={{
          width: { xs: "60%", sm: "40%", md: "25%" },
          borderColor: secondary.main,
          borderBottomWidth: "3px",
          mb: { xs: 6, sm: 8, md: 10 },
          borderRadius: "2px",
        }}
      />

      <Stack
        spacing={{ xs: 6, md: 8 }}
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        {projectsData.map((project, index) => (
          <Paper
            key={project.id || index}
            elevation={mode === "dark" ? 8 : 4}
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              borderRadius: "16px",
              backgroundColor:
                mode === "dark"
                  ? alpha(theme.palette.background.paper, 0.85)
                  : theme.palette.background.paper,
              backdropFilter: mode === "dark" ? "blur(8px)" : "none",
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              overflow: "hidden",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  mode === "dark"
                    ? `0 16px 30px ${alpha(theme.palette.primary.main, 0.35)}`
                    : `0 12px 24px ${alpha(theme.palette.grey[400], 0.35)}`,
              },
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              alignItems="center"
              direction={
                isMobile ? "column" : index % 2 === 0 ? "row" : "row-reverse"
              }
            >
              {/* Project Image (Common for Mobile and Desktop) */}
              <Grid xs={12} md={isMobile ? 12 : 6}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 200, sm: 220, md: 280 },
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.common.black,
                      0.1
                    )}`,
                    transition: "transform 0.4s ease",
                    "&:hover img": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    src={
                      project.image ||
                      `https://placehold.co/600x400/${theme.palette.grey[300].substring(
                        1
                      )}/${theme.palette.text.secondary.substring(1)}?text=${
                        project.title
                      }`
                    }
                    alt={`${project.title} preview`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease-out",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/${theme.palette.grey[300].substring(
                        1
                      )}/${theme.palette.text.secondary.substring(
                        1
                      )}?text=Image+Not+Found`;
                    }}
                  />
                </Box>
              </Grid>

              {/* Project Details Area */}
              <Grid xs={12} md={isMobile ? 12 : 6}>
                <Stack
                  spacing={isMobile ? 1.5 : 2}
                  sx={{
                    textAlign: isMobile ? "center" : "left",
                    alignItems: isMobile ? "center" : "flex-start",
                    mt: isMobile ? 2 : 0,
                  }}
                >
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    fontWeight="bold"
                    color="primary.main"
                  >
                    {project.title}
                  </Typography>

                  {/* --- MOBILE CONTENT --- */}
                  {isMobile && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenDialog(index)}
                      sx={{
                        borderRadius: "20px",
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        mt: 1,
                      }}
                    >
                      Learn More
                    </Button>
                  )}

                  {/* --- DESKTOP CONTENT --- */}
                  {!isMobile && (
                    <>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          maxHeight: "100px",
                          overflowY: "auto",
                          mb: 1.5,
                          textAlign: "left",
                          pr: 1,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: alpha(theme.palette.grey[300], 0.2),
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: alpha(
                              theme.palette.secondary.light,
                              0.7
                            ),
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            background: theme.palette.secondary.main,
                          },
                        }}
                      >
                        {project.description}
                      </Typography>

                      {project.tags && Array.isArray(project.tags) && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.75,
                            justifyContent: "flex-start",
                            mb: 2,
                          }}
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="secondary"
                              sx={{
                                borderColor: alpha(secondary.main, 0.5),
                                color:
                                  mode === "dark"
                                    ? secondary.light
                                    : secondary.dark,
                              }}
                            />
                          ))}
                        </Box>
                      )}

                      {project.repo && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<GitHubIcon />}
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: "20px",
                            px: 3,
                            py: 0.8,
                            textTransform: "none",
                            mt: 1,
                          }}
                        >
                          View on GitHub
                        </Button>
                      )}
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog
          open={openProjectIndex !== null}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "16px",
              backgroundColor:
                mode === "dark"
                  ? alpha(theme.palette.background.default, 0.95)
                  : undefined,
              backdropFilter: mode === "dark" ? "blur(5px)" : "none",
            },
          }}
          aria-labelledby="project-dialog-title"
        >
          <DialogTitle
            id="project-dialog-title"
            sx={{ textAlign: "center", pt: 3, pb: 1, position: "relative" }}
          >
            <Typography
              variant="h4"
              component="span"
              fontWeight="bold"
              color="primary.main"
            >
              {selectedProject.title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: theme.spacing(2),
                top: theme.spacing(1.5),
                color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{ borderColor: alpha(theme.palette.divider, 0.1) }}
          >
            <Grid container spacing={3}>
              <Grid xs={12} md={5}>
                {/* Container for the image in the dialog */}
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: { xs: 200, sm: 240, md: 300 },
                    borderRadius: "12px",
                    overflow: "hidden",
                    mb: { xs: 2, md: 0 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      selectedProject.image ||
                      `https://placehold.co/600x400/${theme.palette.grey[300].substring(
                        1
                      )}/${theme.palette.text.secondary.substring(1)}?text=${
                        selectedProject.title
                      }`
                    }
                    alt={`${selectedProject.title} preview`}
                    loading="lazy"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: isMobile ? "180px" : "280px",
                      objectFit: "contain", // Maintain aspect ratio within these bounds
                      borderRadius: "8px", // Optional: slightly rounded corners for the image itself
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/${theme.palette.grey[300].substring(
                        1
                      )}/${theme.palette.text.secondary.substring(
                        1
                      )}?text=Image+Not+Found`;
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={12} md={7}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: text.primary,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedProject.description}
                </Typography>
                {selectedProject.tags &&
                  Array.isArray(selectedProject.tags) && (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 2,
                        mb: 2,
                      }}
                    >
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          variant="filled"
                          color="secondary"
                          size="small"
                          sx={{
                            backgroundColor: alpha(secondary.main, 0.2),
                            color: secondary.dark,
                          }}
                        />
                      ))}
                    </Box>
                  )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              p: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            {selectedProject.repo && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<GitHubIcon />}
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: "20px", px: 3, textTransform: "none" }}
              >
                View on GitHub
              </Button>
            )}
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", px: 3, textTransform: "none" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
});

Projects.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
Projects.displayName = "Projects";

export default React.memo(Projects);
