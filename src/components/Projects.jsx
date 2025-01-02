import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import projects from '../data/projectsData';
import PropTypes from 'prop-types';

function Projects({ isMobile }) {
  const theme = useTheme();
  const [openProject, setOpenProject] = useState(null);

  // Determine text color based on theme
  const textColor = React.useMemo(() => {
    return theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.text.secondary;
  }, [theme]);

  // Handlers to open and close the project dialog
  const handleOpen = (project) => setOpenProject(project);
  const handleClose = () => setOpenProject(null);

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: 5,
      }}
    >
      <Box
        sx={{
          width: { xs: '90vw', sm: 'fit-content' },
          maxWidth: '90vw',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          padding: { xs: '5vw', sm: '4vh' },
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
          animation: 'fadeIn 1s ease',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Stack
          spacing={4}
          sx={{
            padding: '5vh',
            maxWidth: { xs: '100%', sm: '80vw' },
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          {/* Title */}
          <Typography
            variant='h3'
            fontWeight='bold'
            sx={{
              letterSpacing: '0.15em',
              fontSize: { xs: '1.8rem', sm: '2.4rem' },
              color: theme.palette.primary.main,
            }}
          >
            My Projects
          </Typography>
          <Divider
            sx={{
              width: '50%',
              borderColor: theme.palette.primary.light,
            }}
          />

          {/* Projects Grid */}
          <Grid
            container
            spacing={4}
            justifyContent='center'
            sx={{
              width: '100%',
            }}
          >
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    padding: '2rem',
                    height: '100%',
                  }}
                >
                  {/* Project Image */}
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: '8rem', sm: '10rem' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} Logo`}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

                  {/* Project Title */}
                  <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      textAlign: 'center',
                    }}
                  >
                    {project.title}
                  </Typography>
                  {!isMobile && (
                    <Typography
                      variant='body1'
                      sx={{
                        color: textColor,
                        textAlign: 'center',
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </Typography>
                  )}
                  {/* View Details Button */}
                  {isMobile && (
                    <Button
                      variant='contained'
                      onClick={() => handleOpen(project)}
                      sx={{
                        marginTop: '1rem',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                        borderRadius: '20px',
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': {
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

      {/* Dialog for Project Details */}
      {openProject && (
        <Dialog
          open={!!openProject}
          onClose={handleClose}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {openProject.title}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant='body1'
              sx={{
                color: textColor,
                lineHeight: 1.8,
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              {openProject.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant='outlined'
              sx={{
                textTransform: 'none',
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
}

Projects.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default React.memo(Projects);
