import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
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

  const color = React.useCallback(() => {
    return theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  }, [theme]);

  // add nicer styling for the links
  const linkStyles = {
    textDecoration: 'none',
    color,
    fontWeight: 500,
    fontSize: '1.5rem',
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(
          2.5
        )} rgba(0, 0, 0, 0.5)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
      }}
    >
      <Stack spacing={2}>
        {/* Profile Picture */}
        <Typography sx={{ alignSelf: 'center' }}>
          <img
            src='/img/Jackson_Caleb_1-2.jpg'
            alt='Caleb Jackson'
            style={{
              borderRadius: '50%',
              width: '10rem',
              height: 'auto',
            }}
          />
        </Typography>
        {/* Navigation Links */}
        <Typography
          component={Link}
          to='/'
          sx={linkStyles}
          onClick={onLinkClick}
        >
          Home
        </Typography>
        <Divider />
        {/* Projects link */}
        <Typography
          component={Link}
          to='/projects'
          sx={linkStyles}
          onClick={onLinkClick}
        >
          Projects
        </Typography>
        <Divider />
        {/* Github link */}
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
        <Divider />
        <Resume color={color} isMobile={isMobile} />
        <Divider />
        <Typography
          component={Link}
          to='/about'
          sx={linkStyles}
          onClick={onLinkClick}
        >
          About Me
        </Typography>
        <Divider />
      </Stack>
      {/* Contact Me Section */}
      <Stack
        sx={{
          padding: `${theme.spacing(
            2
          )} env(safe-area-inset-bottom) ${theme.spacing(1)}`,
          gap: theme.spacing(1),
        }}
      >
        <ThemeSwitcher />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing(1),
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <Typography
            variant='h6'
            fontWeight='bold'
            sx={{
              marginBottom: 1,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
          >
            Contact Me
          </Typography>
          <Stack direction='row' spacing={2} alignItems='center'>
            {/* Email */}
            <Typography
              component='a'
              href='mailto:calebj@tzmedical.com'
              sx={{
                textDecoration: 'none',
                color: color(),
                '&:hover': { color: theme.palette.primary.dark },
              }}
            >
              <EmailIcon fontSize='large' />
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
              <InstagramIcon fontSize='large' />
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
              <LinkedInIcon fontSize='large' />
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

Sidebar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
