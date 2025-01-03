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
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import projects from '../data/projectsData';
import PropTypes from 'prop-types';

function Projects({ isMobile }) {
  const theme = useTheme();
  const [openProject, setOpenProject] = useState(null);

  // Determine text color based on theme
  const textColor =
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.text.secondary;

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
        padding: { xs: 2, sm: 5 },
        position: 'relative',
        overflow: 'hidden', // Prevent overflow from scaling
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '90vw', md: '80vw' },
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
            maxWidth: '100%',
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
              width: { xs: '60%', sm: '50%' },
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
                  onClick={() => !isMobile && handleOpen(project)}
                  sx={{
                    position: 'relative', // Corrected typo from 'reablative' to 'relative'
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    padding: '1.5rem',
                    height: '100%',
                    transition:
                      'transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease',
                    cursor: 'pointer',
                    zIndex: 1,
                    // Hover effects only on desktop
                    ...(!isMobile && {
                      ':hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
                        zIndex: 10,
                      },
                      // Show the description box on hover
                      '&:hover .description': {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                      },
                    }),
                  }}
                  tabIndex={0}
                  role='button'
                  aria-labelledby={`project-title-${index}`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isMobile) {
                      handleOpen(project);
                    }
                  }}
                >
                  {/* Project Image */}
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: '6rem', sm: '8rem' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem',
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
                      loading='lazy' // Optimize image loading
                    />
                  </Box>

                  {/* Project Title */}
                  <Typography
                    variant='h5'
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      textAlign: 'center',
                    }}
                  >
                    {project.title}
                  </Typography>

                  {/* Description and Button on Hover (Desktop Only) */}
                  {!isMobile && (
                    <Box
                      className='description'
                      sx={{
                        position: 'absolute',
                        transform: 'translate(0%, 20px)', // Start slightly below
                        width: '90%',
                        bgcolor: theme.palette.background.paper,
                        borderRadius: '12px',
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
                        padding: '1rem',
                        opacity: 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{
                          color: textColor,
                          textAlign: 'center',
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Button
                        variant='contained'
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card's onClick
                          handleOpen(project);
                        }}
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
                    </Box>
                  )}

                  {/* View Details Button for Mobile */}
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
          aria-labelledby='project-dialog-title'
          aria-describedby='project-dialog-description'
        >
          <DialogTitle
            id='project-dialog-title'
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
              id='project-dialog-description'
              sx={{
                color: textColor,
                lineHeight: 1.8,
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              {openProject.description}
            </Typography>
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
