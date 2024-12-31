import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Resume from './Resume';
import ThemeSwitcher from './ThemeSwitcher';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ onLinkClick, isMobile }) => {
  const theme = useTheme();

  // State to control the visibility of the Contact Me modal
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  // Function to determine link color based on theme
  const getLinkColor = () => {
    return theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  };

  // Define styles for navigation links
  const linkStyles = {
    textDecoration: 'none',
    color: getLinkColor(),
    fontWeight: 500,
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    display: 'block',
    cursor: 'pointer',
    paddingY: isMobile ? 0.5 : 1,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Use 100vh for full height
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(
          2.5
        )} rgba(0, 0, 0, 0.5)`,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        boxSizing: 'border-box', // Ensure padding is included in height
      }}
    >
      {/* Make the main content scrollable if it exceeds the viewport */}
      <Box
        sx={{
          flex: 1, // Take up remaining space
          overflowY: 'auto',
          paddingX: theme.spacing(2),
          paddingY: theme.spacing(2),
        }}
      >
        <Stack spacing={2}>
          {/* Profile Picture */}
          <Box sx={{ alignSelf: 'center' }}>
            <img
              src='/img/Jackson_Caleb_1-2.jpg'
              alt='Caleb Jackson'
              style={{
                borderRadius: '50%',
                width: isMobile ? '8rem' : '10rem', // Adjust size based on screen
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
          <Divider />
          <Typography
            component={Link}
            to='/projects'
            sx={linkStyles}
            onClick={onLinkClick}
          >
            Projects
          </Typography>
          <Divider />
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
          <Resume color={getLinkColor} isMobile={isMobile} />
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
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          paddingX: theme.spacing(2),
          paddingY: theme.spacing(2),
        }}
      >
        <Stack spacing={1}>
          <ThemeSwitcher />
          <Divider sx={{ marginY: theme.spacing(2) }} />
          {isMobile ? (
            // On mobile, show a button to open the Contact Me modal
            <Button
              variant='outlined'
              onClick={handleOpenContact}
              sx={{
                marginTop: theme.spacing(1),
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Contact Me
            </Button>
          ) : (
            // On desktop, show the Contact Me section as usual
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing(1),
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
                <Typography
                  component='a'
                  href='mailto:calebj@tzmedical.com'
                  aria-label='Send Email'
                  sx={{
                    textDecoration: 'none',
                    color: getLinkColor(),
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
                  aria-label='Visit Instagram'
                  sx={{
                    textDecoration: 'none',
                    color: getLinkColor(),
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
                  aria-label='Visit LinkedIn'
                  sx={{
                    textDecoration: 'none',
                    color: getLinkColor(),
                    '&:hover': { color: theme.palette.primary.dark },
                  }}
                >
                  <LinkedInIcon fontSize='large' />
                </Typography>
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Contact Me Modal for Mobile */}
      {isMobile && (
        <Dialog
          open={openContact}
          onClose={handleCloseContact}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Contact Me
            <IconButton
              aria-label='close'
              onClick={handleCloseContact}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} alignItems='center'>
              <Typography
                component='a'
                href='mailto:calebj@tzmedical.com'
                aria-label='Send Email'
                sx={{
                  textDecoration: 'none',
                  color: getLinkColor(),
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
                aria-label='Visit Instagram'
                sx={{
                  textDecoration: 'none',
                  color: getLinkColor(),
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
                aria-label='Visit LinkedIn'
                sx={{
                  textDecoration: 'none',
                  color: getLinkColor(),
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                <LinkedInIcon fontSize='large' />
              </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

Sidebar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
