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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import projects from "../data/projectsData";
import PropTypes from "prop-types";

const Projects = React.forwardRef(({ isMobile }, ref) => {
    const theme = useTheme();
    const {
        palette: { mode, primary, background, text },
    } = theme;

    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [openProject, setOpenProject] = React.useState(null);

    const textColor = mode === "dark" ? text.primary : text.secondary;

    const handleOpenDialog = (index) => setOpenProject(index);
    const handleCloseDialog = () => setOpenProject(null);

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
        <Box
            ref={ref}
            id="projects"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: { xs: 4, sm: 6, md: 8 },
                px: 2,
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "xl",
                }}
            >
                <Box
                    sx={{
                        m: { xs: 2, sm: 3 },
                        width: { xs: "95%", sm: "90%", md: "85%", lg: "80%" },
                        maxWidth: "1200px",
                        backgroundColor: background.paper,
                        borderRadius: "1rem",
                        p: { xs: 3, sm: 4, md: 5 },
                        boxShadow: "0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)",
                        animation: "fadeIn 1s ease",
                        "@keyframes fadeIn": {
                            from: { opacity: 0, transform: "translateY(20px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
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
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{
                                letterSpacing: "0.1em",
                                fontSize: {
                                    xs: "1.8rem",
                                    sm: "2.2rem",
                                    md: "2.5rem",
                                },
                                color: primary.main,
                            }}
                        >
                            My Projects
                        </Typography>
                        <Divider
                            sx={{
                                width: { xs: "50%", sm: "40%" },
                                borderColor: primary.light,
                                borderBottomWidth: "2px",
                            }}
                        />
                        <Grid
                            container
                            spacing={{ xs: 3, sm: 4, md: 4 }}
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            {projects.map((project, index) => (
                                <Grid
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            visibility: "hidden",
                                            pointerEvents: "none",
                                            borderRadius: "0.75rem",
                                            boxShadow:
                                                "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                                            p: "1.5rem",
                                            minHeight: {
                                                xs: "280px",
                                                sm: "320px",
                                                md: "350px",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: {
                                                    xs: "6rem",
                                                    sm: "8rem",
                                                },
                                            }}
                                        />
                                        {/* Image placeholder */}
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            sx={{
                                                fontSize: {
                                                    xs: "1rem",
                                                    sm: "1.25rem",
                                                },
                                            }}
                                        >
                                            {project.title}
                                        </Typography>
                                    </Box>
                                    {/* Actual Interactive Project Card */}
                                    <Box
                                        onMouseEnter={() =>
                                            !isMobile && setHoveredIndex(index)
                                        }
                                        onMouseLeave={() =>
                                            !isMobile && setHoveredIndex(null)
                                        }
                                        onFocus={() =>
                                            !isMobile && setHoveredIndex(index)
                                        }
                                        onBlur={() =>
                                            !isMobile && setHoveredIndex(null)
                                        }
                                        tabIndex={0} // Make it focusable
                                        role="button" // Semantic role
                                        aria-labelledby={`project-title-${index}`}
                                        onKeyPress={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                e.preventDefault();
                                                if (isMobile) {
                                                    handleOpenDialog(index);
                                                } else {
                                                    if (project.repo)
                                                        window.open(
                                                            project.repo,
                                                            "_blank"
                                                        );
                                                }
                                            }
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height:
                                                hoveredIndex === index &&
                                                !isMobile
                                                    ? "auto"
                                                    : "100%",
                                            minHeight:
                                                hoveredIndex === index &&
                                                !isMobile
                                                    ? {
                                                          xs: "280px",
                                                          sm: "320px",
                                                          md: "350px",
                                                      }
                                                    : "auto",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            borderRadius: "0.75rem",
                                            boxShadow:
                                                hoveredIndex === index &&
                                                !isMobile
                                                    ? "0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)"
                                                    : "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                                            p: "1.5rem",
                                            backgroundColor: background.default,
                                            zIndex:
                                                hoveredIndex === index &&
                                                !isMobile
                                                    ? 10
                                                    : 1,
                                            cursor: "pointer",
                                            transition:
                                                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, height 0.3s ease-in-out",
                                            transform:
                                                hoveredIndex === index &&
                                                !isMobile
                                                    ? "scale(1.03)"
                                                    : "scale(1)",
                                            "&:focus-visible": {
                                                outlineOffset: "2px",
                                                outline: `2px solid ${primary.main}`,
                                            },
                                        }}
                                    >
                                        <Box>
                                            {/* Wrapper for top content (image, title) */}
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: {
                                                        xs: "6rem",
                                                        sm: "7rem",
                                                        md: "8rem",
                                                    },
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: "1rem",
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
                                            <Typography
                                                id={`project-title-${index}`}
                                                variant="h5"
                                                gutterBottom
                                                sx={{
                                                    color: primary.main,
                                                    fontWeight: "bold",
                                                    fontSize: {
                                                        xs: "1.1rem",
                                                        sm: "1.25rem",
                                                    },
                                                    textAlign: "center",
                                                    mb:
                                                        hoveredIndex ===
                                                            index && !isMobile
                                                            ? "0.75rem"
                                                            : "0.5rem",
                                                }}
                                            >
                                                {project.title}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {/* Middle content (description) */}
                                            {!isMobile &&
                                                hoveredIndex === index && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: textColor,
                                                            textAlign: "center",
                                                            fontSize: {
                                                                xs: "0.8rem",
                                                                sm: "0.9rem",
                                                            },
                                                            lineHeight: 1.5,
                                                            my: 1,
                                                            maxHeight: "100px",
                                                            overflowY: "auto",
                                                        }}
                                                    >
                                                        {project.description}
                                                    </Typography>
                                                )}
                                        </Box>

                                        <Box
                                            sx={{
                                                mt: "auto",
                                                pt:
                                                    hoveredIndex === index &&
                                                    !isMobile
                                                        ? 1
                                                        : 0,
                                            }}
                                        >
                                            {/* Wrapper for bottom content (buttons) */}
                                            {!isMobile &&
                                                hoveredIndex === index &&
                                                project.repo && (
                                                    <Button
                                                        component="a"
                                                        href={project.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            ...buttonStyle,
                                                            mt: 1,
                                                            py: "0.3rem",
                                                            backgroundColor:
                                                                "transparent",
                                                            borderColor:
                                                                primary.main,
                                                            color: primary.main,
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    primary.lightest,
                                                                borderColor:
                                                                    primary.dark,
                                                            },
                                                        }}
                                                    >
                                                        View Repository
                                                    </Button>
                                                )}
                                            {isMobile && (
                                                <Button
                                                    onClick={() =>
                                                        handleOpenDialog(index)
                                                    }
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        ...buttonStyle,
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Box>
            </Grid>

            {/* Mobile Dialog for Project Details */}
            {isMobile && openProject !== null && (
                <Dialog
                    open={openProject !== null}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="sm"
                    PaperProps={{ sx: { borderRadius: "1rem" } }}
                    aria-labelledby="project-dialog-title"
                >
                    <DialogTitle
                        id="project-dialog-title"
                        sx={{
                            color: primary.main,
                            fontWeight: "bold",
                            textAlign: "center",
                            pt: 3,
                        }}
                    >
                        {projects[openProject].title}
                    </DialogTitle>
                    <DialogContent sx={{ pb: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: textColor,
                                lineHeight: 1.7,
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                textAlign: "justify",
                                mb: 2,
                            }}
                        >
                            {projects[openProject].description}
                        </Typography>
                        {projects[openProject].repo && (
                            <Box sx={{ textAlign: "center", my: 2 }}>
                                <Button
                                    component="a"
                                    href={projects[openProject].repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    sx={{
                                        ...buttonStyle,
                                        backgroundColor: "transparent",
                                        borderColor: primary.main,
                                        color: primary.main,
                                        "&:hover": {
                                            backgroundColor: primary.lightest,
                                            borderColor: primary.dark,
                                        },
                                    }}
                                >
                                    View on GitHub
                                </Button>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions
                        sx={{ justifyContent: "center", pb: 2, pt: 0 }}
                    >
                        <Button
                            onClick={handleCloseDialog}
                            variant="contained"
                            sx={buttonStyle}
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
