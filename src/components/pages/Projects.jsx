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
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { useTheme, alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import projectsData from "../../data/projectsData";

const Projects = React.forwardRef(({ isMobile }, ref) => {
  const theme = useTheme();
  const {
    palette: { mode, primary, secondary },
  } = theme;
  const [openProjectIndex, setOpenProjectIndex] = React.useState(null);

  const backgroundColor = React.useMemo(() => {
    return mode === "dark"
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper;
  }, [mode, theme]);

  const handleOpenDialog = (index) => setOpenProjectIndex(index);
  const handleCloseDialog = () => setOpenProjectIndex(null);

  const selectedProject = React.useMemo(() => {
    return openProjectIndex !== null ? projectsData[openProjectIndex] : null;
  }, [openProjectIndex]);

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
        py: { xs: 4, sm: 8, md: 10 },
        px: { xs: 1.5, sm: 3, md: 4 },
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        fontWeight="bold"
        textAlign="center"
        sx={{
          mb: 2,
          color: primary.contrastText,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          px: 2,
        }}
      >
        My Projects
      </Typography>
      <Divider
        sx={{
          width: { xs: "60%", sm: "40%", md: "25%" },
          borderColor: secondary.main,
          borderBottomWidth: "3px",
          mb: { xs: 4, sm: 6, md: 8 },
          borderRadius: "2px",
        }}
      />
      <Stack
        spacing={{ xs: 4, md: 6 }}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          px: { xs: 1, sm: 0 },
        }}
      >
        {projectsData.map((project, index) => (
          <Paper
            key={project.id || index}
            elevation={isMobile ? 2 : mode === "dark" ? 8 : 4}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "12px",
              backgroundColor,
              backdropFilter:
                mode === "dark" && !isMobile ? "blur(8px)" : "none",
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              overflow: "hidden",
              transition: !isMobile
                ? "transform 0.3s ease, box-shadow 0.3s ease"
                : "none",
              "&:hover": !isMobile
                ? {
                    transform: "translateY(-5px)",
                    boxShadow:
                      mode === "dark"
                        ? `0 12px 24px ${alpha(primary.main, 0.25)}`
                        : `0 8px 16px ${alpha(theme.palette.grey[400], 0.25)}`,
                  }
                : {},
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              alignItems="center"
              direction={
                isMobile ? "column" : index % 2 === 0 ? "row" : "row-reverse"
              }
            >
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 180, sm: 220, md: 260 },
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: `0 2px 8px ${alpha(
                      theme.palette.common.black,
                      0.1
                    )}`,
                  }}
                >
                  <img
                    src={
                      project.image ||
                      `https://placehold.co/600x400?text=${encodeURIComponent(
                        project.title
                      )}`
                    }
                    alt={`${project.title} preview`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400?text=Image+Not+Found`;
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  spacing={1.5}
                  sx={{
                    textAlign: isMobile ? "center" : "left",
                    alignItems: isMobile ? "center" : "flex-start",
                  }}
                >
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    fontWeight="bold"
                    color="primary.main"
                  >
                    {project.title}
                  </Typography>

                  {isMobile ? (
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
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                          maxHeight: "100px",
                          overflowY: "auto",
                          mb: 1,
                          pr: 1,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: alpha(secondary.main, 0.5),
                            borderRadius: "3px",
                          },
                        }}
                      >
                        {project.description}
                      </Typography>
                      {project.tags?.length > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.75,
                            mb: 1.5,
                          }}
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="secondary"
                            />
                          ))}
                        </Box>
                      )}
                      {project.repo && (
                        <Button
                          variant="outlined"
                          startIcon={<GitHubIcon />}
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: "20px",
                            px: 3,
                            py: 0.8,
                            textTransform: "none",
                          }}
                        >
                          View Code
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

      {/* Project Dialog */}
      {selectedProject && (
        <Dialog
          open={openProjectIndex !== null}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "12px",
              backgroundColor:
                mode === "dark"
                  ? alpha(theme.palette.background.default, 0.95)
                  : undefined,
              backdropFilter: mode === "dark" ? "blur(5px)" : "none",
              mx: { xs: 1.5, sm: 0 },
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              pt: 3,
              pb: 1,
              position: "relative",
              px: { xs: 3, sm: 4 },
            }}
          >
            <Typography variant="h5" component="div" fontWeight="bold">
              {selectedProject.title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: { xs: 8, sm: 12 },
                top: { xs: 8, sm: 12 },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              borderColor: alpha(theme.palette.divider, 0.1),
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 3 },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 180, sm: 240 },
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: mode === "dark" ? "grey.900" : "grey.100",
                  }}
                >
                  <img
                    src={
                      selectedProject.image ||
                      `https://placehold.co/600x400?text=${encodeURIComponent(
                        selectedProject.title
                      )}`
                    }
                    alt={`${selectedProject.title} preview`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {selectedProject.description}
                </Typography>
                {selectedProject.tags?.length > 0 && (
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}
                  >
                    {selectedProject.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        color="secondary"
                        sx={{
                          backgroundColor: alpha(secondary.main, 0.1),
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
                startIcon={<GitHubIcon />}
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: "20px", px: 3 }}
              >
                View on GitHub
              </Button>
            )}
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", px: 3 }}
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
