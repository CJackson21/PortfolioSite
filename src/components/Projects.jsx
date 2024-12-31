import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import projects from '../data/projectsData';

import PropTypes from 'prop-types';

function Projects({ isMobile }) {
  const theme = useTheme();
  const [openProject, setOpenProject] = useState(null);

  const handleOpen = (project) => setOpenProject(project);
  const handleClose = () => setOpenProject(null);

  return (
    <Grid
      container
      direction='column'
      spacing={4}
      justifySelf='center'
      sx={{
        maxWidth: '80vw',
        flexGrow: 1,
        padding: '5vh',
        textAlign: 'center',
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent='center' // Ensures horizontal centering
        alignItems='center' // Ensures vertical centering
        sx={{
          maxWidth: '80vw',
          flexGrow: 1,
          padding: '5vh',
          textAlign: 'center',
          margin: '0 auto', // Centers the container itself
        }}
      >
        <Typography
          variant='h3'
          fontWeight='bold'
          sx={{
            color: theme.palette.text.primary,
            marginBottom: '3vh',
            letterSpacing: '0.2vw',
          }}
        >
          My Projects
        </Typography>
        <Grid container spacing={4} justifyContent='center'>
          {projects.map((project, index) => (
            <Grid
              item
              xs={12} // Full width on extra-small screens
              sm={6} // Half width on small screens
              md={4} // One-third width on medium and larger screens
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center', // Centers each project card
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  maxWidth: '20rem', // Optional: limits card width for consistent appearance
                }}
              >
                <CardContent>
                  <Box
                    sx={{
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
                  <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                      fontWeight: theme.typography.fontWeightBold,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {project.title}
                  </Typography>
                  {isMobile ? (
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: theme.palette.threejsback.default,
                        borderRadius: '20px',
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                      onClick={() => handleOpen(project)}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Typography
                      variant='body2'
                      sx={{
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }}
                    >
                      {project.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {openProject && (
        <Dialog
          open={!!openProject}
          onClose={handleClose}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
          >
            {openProject.title}
          </DialogTitle>
          <DialogContent>
            <Typography
              variant='body1'
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
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
