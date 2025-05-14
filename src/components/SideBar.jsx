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
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Resume from "./Resume";
import ThemeSwitcher from "./ThemeSwitcher";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Sidebar = ({ onLinkClick, isMobile }) => {
  const theme = useTheme();
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  // Function to determine link color based on theme
  const getLinkColor = () => {
    return theme.palette.mode === "dark"
      ? theme.palette.text.dark
      : theme.palette.primary.main;
  };

  // Define styles for navigation links
  const linkStyles = {
    textDecoration: "none",
    color: getLinkColor(),
    fontWeight: 500,
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    display: "block",
    cursor: "pointer",
    paddingY: isMobile ? 0.5 : 1,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  };

  // Handlers to open and close the contact modal
  const handleContactOpen = () => {
    setIsContactOpen(true);
  };

  const handleContactClose = () => {
    setIsContactOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Full viewport height
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(
          2.5
        )} rgba(0, 0, 0, 0.5)`,
        display: "flex",
        flexDirection: "column",
        paddingTop: "env(safe-area-inset-top, 0px)", // Respect top safe area
        paddingBottom: "env(safe-area-inset-bottom, 16px)", // Respect bottom safe area
        boxSizing: "border-box", // Include padding in height
      }}
    >
      {/* Scrollable Main Content */}
      <Box
        sx={{
          flex: 1, // Take up remaining space
          overflowY: "auto", // Enable vertical scrolling
          paddingX: theme.spacing(2),
          paddingY: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ensure it takes full height for Flexbox
        }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          {/* Profile Picture */}
          <Box sx={{ alignSelf: "center" }}>
            <img
              src="/img/Jackson_Caleb_1-2.jpg"
              alt="Caleb Jackson"
              style={{
                borderRadius: "50%",
                width: isMobile ? "8rem" : "10rem",
                height: "auto",
              }}
            />
          </Box>

          {/* Navigation Links */}
          <Typography
            component={Link}
            to="/"
            sx={linkStyles}
            onClick={onLinkClick}
          >
            Home
          </Typography>
          <Divider />
          <Typography
            component={Link}
            to="/projects"
            sx={linkStyles}
            onClick={onLinkClick}
          >
            Projects
          </Typography>
          <Divider />
          <Typography
            component="a"
            href="https://github.com/CJackson21"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkStyles}
            onClick={onLinkClick}
          >
            GitHub
          </Typography>
          <Divider />
          <Resume color={getLinkColor()} isMobile={isMobile} />
          <Divider />
          <Typography
            component={Link}
            to="/about"
            sx={linkStyles}
            onClick={onLinkClick}
          >
            About Me
          </Typography>
          <Divider />
          {/* Conditionally render "Contact Me" link on mobile */}
          {isMobile && (
            <>
              <Typography
                component="button"
                onClick={handleContactOpen}
                sx={{
                  ...linkStyles,
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 0,
                  width: "100%",
                  font: "1.2rem",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.primary.main,
                }}
              >
                Contact Me
              </Typography>
              <Divider />
              <ThemeSwitcher />
            </>
          )}
        </Stack>

        {/* Footer Section - Visible only on non-mobile */}
        {!isMobile && (
          <Box
            sx={{
              paddingRight: theme.spacing(2),
              paddingY: theme.spacing(2),
              marginTop: "auto",
            }}
          >
            <Stack spacing={1}>
              <ThemeSwitcher />
              <Divider sx={{ width: "85%" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  gap: theme.spacing(1),
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    marginBottom: 1,
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.text.primary
                        : theme.palette.primary.main,
                  }}
                >
                  Contact Me
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    component="a"
                    href="mailto:calebjackson2002@gmail.com"
                    aria-label="Send Email"
                    sx={{
                      textDecoration: "none",
                      color: getLinkColor(),
                      "&:hover": { color: theme.palette.primary.dark },
                    }}
                  >
                    <EmailIcon fontSize="large" />
                  </Typography>
                  <Typography
                    component="a"
                    href="https://instagram.com/cjjackson.15"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Instagram"
                    sx={{
                      textDecoration: "none",
                      color: getLinkColor(),
                      "&:hover": { color: theme.palette.primary.dark },
                    }}
                  >
                    <InstagramIcon fontSize="large" />
                  </Typography>
                  <Typography
                    component="a"
                    href="https://www.linkedin.com/in/caleb-jackson-b08660264"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn"
                    sx={{
                      textDecoration: "none",
                      color: getLinkColor(),
                      "&:hover": { color: theme.palette.primary.dark },
                    }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Contact Me Modal - Visible only on mobile */}
      {isMobile && (
        <Dialog
          open={isContactOpen}
          onClose={handleContactClose}
          aria-labelledby="contact-dialog-title"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle
            id="contact-dialog-title"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.dark
                  : theme.palette.primary.main,
            }}
          >
            Contact Me
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} alignItems="center">
              <Typography
                variant="body1"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.dark
                      : theme.palette.primary.main,
                }}
              >
                {`I'd love to hear from you! Reach out through any of the
                platforms below.`}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  component="a"
                  href="mailto:calebjackson2002@gmail.com"
                  aria-label="Send Email"
                  sx={{
                    textDecoration: "none",
                    color: getLinkColor(),
                    "&:hover": { color: theme.palette.primary.dark },
                  }}
                >
                  <EmailIcon fontSize="large" />
                </Typography>
                <Typography
                  component="a"
                  href="https://instagram.com/cjjackson.15"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram"
                  sx={{
                    textDecoration: "none",
                    color: getLinkColor(),
                    "&:hover": { color: theme.palette.primary.dark },
                  }}
                >
                  <InstagramIcon fontSize="large" />
                </Typography>
                <Typography
                  component="a"
                  href="https://www.linkedin.com/in/caleb-jackson-b08660264"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn"
                  sx={{
                    textDecoration: "none",
                    color: getLinkColor(),
                    "&:hover": { color: theme.palette.primary.dark },
                  }}
                >
                  <LinkedInIcon fontSize="large" />
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleContactClose} color="primary">
              Close
            </Button>
          </DialogActions>
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
