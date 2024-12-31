import React from 'react';
import { Box, Stack, Typography, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Resume from './Resume';
import ThemeSwitcher from './ThemeSwitcher';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Sidebar = ({ onLinkClick, isMobile }) => {
  const theme = useTheme();

  // Use MUI's breakpoint hooks to adjust styles based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const color = React.useCallback(() => {
    return theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  }, [theme]);

  const linkStyles = {
    textDecoration: 'none',
    color: color(),
    fontWeight: 500,
    fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
    display: 'block',
    cursor: 'pointer',
    paddingY: isSmallScreen ? 0.5 : 1, // Reduce vertical padding on mobile
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        // Avoid using fixed height; allow the sidebar to adjust naturally
        minHeight: `calc(100vh - env(safe-area-inset-top, 0px))`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(
          2.5
        )} rgba(0, 0, 0, 0.5)`,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        boxSizing: 'border-box',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Space between content and footer
          paddingX: isSmallScreen ? theme.spacing(1.5) : theme.spacing(2),
          paddingY: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
        }}
      >
        <Stack spacing={isSmallScreen ? 1.5 : 2}>
          {/* Profile Picture */}
          <Box sx={{ alignSelf: 'center' }}>
            <img
              src='/img/Jackson_Caleb_1-2.jpg'
              alt='Caleb Jackson'
              style={{
                borderRadius: '50%',
                width: isSmallScreen ? '8rem' : '10rem', // Smaller image on mobile
                height: 'auto',
              }}
            />
          </Box>
          {/* Navigation Links */}
          <Typography
            component={Link}
            to='/'
            sx={linkStyles}
            onClick={onLinkClick}
          >
            Home
          </Typography>
          {!isSmallScreen && <Divider />} {/* Hide Divider on mobile */}
          <Typography
            component={Link}
            to='/projects'
            sx={linkStyles}
            onClick={onLinkClick}
          >
            Projects
          </Typography>
          {!isSmallScreen && <Divider />}
          <Typography
            component='a'
            href='https://github.com/CJackson21'
            target='_blank'
            rel='noopener noreferrer'
            sx={linkStyles}
            onClick={onLinkClick}
          >
            GitHub
          </Typography>
          {!isSmallScreen && <Divider />}
          <Resume color={color} isMobile={isSmallScreen} />
          {!isSmallScreen && <Divider />}
          <Typography
            component={Link}
            to='/about'
            sx={linkStyles}
            onClick={onLinkClick}
          >
            About Me
          </Typography>
          {!isSmallScreen && <Divider />}
        </Stack>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          paddingX: isSmallScreen ? theme.spacing(1.5) : theme.spacing(2),
          paddingY: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
        }}
      >
        <Stack spacing={isSmallScreen ? 1 : 2}>
          <ThemeSwitcher />
          {!isSmallScreen && <Divider />} =
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isSmallScreen ? theme.spacing(0.5) : theme.spacing(1),
            }}
          >
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                marginBottom: isSmallScreen ? 0.5 : 1,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.main,
                fontSize: isSmallScreen ? '1rem' : '1.25rem',
              }}
            >
              Contact Me
            </Typography>
            <Stack
              direction='row'
              spacing={isSmallScreen ? 1 : 2}
              alignItems='center'
            >
              <Typography
                component='a'
                href='mailto:calebj@tzmedical.com'
                sx={{
                  textDecoration: 'none',
                  color: color(),
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                <EmailIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
              </Typography>
              <Typography
                component='a'
                href='https://instagram.com/cjjackson.15'
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  textDecoration: 'none',
                  color: color(),
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                <InstagramIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
              </Typography>
              <Typography
                component='a'
                href='https://www.linkedin.com/in/caleb-jackson-b08660264'
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  textDecoration: 'none',
                  color: color(),
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                <LinkedInIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
