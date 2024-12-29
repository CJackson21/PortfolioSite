import PropTypes from "prop-types";
import { Drawer, Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ResumePopup from "./Resume";

const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const linkStyles = {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "1rem",
    display: "block",
    "&:hover": {
      color: theme.palette.primary.dark, // Slight darkening on hover
    },
    "&:visited": {
      color: theme.palette.primary.main, // Prevent visited state color change
    },
  };

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "fit-content",
          padding: "1rem",
          maxWidth: "80%",
          minWidth: "10%",
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow
        },
      }}
    >
      <Stack spacing={2}>
        {/* GitHub Link */}
        <Box>
          <Typography
            component='a'
            href='https://github.com/CJackson21'
            target='_blank'
            rel='noopener noreferrer'
            sx={linkStyles}
          >
            GitHub
          </Typography>
        </Box>

        {/* Resume Popup */}
        <ResumePopup />

        {/* LinkedIn Link */}
        <Box>
          <Typography
            component='a'
            href='https://www.linkedin.com/in/caleb-jackson-b08660264'
            target='_blank'
            rel='noopener noreferrer'
            sx={linkStyles}
          >
            LinkedIn
          </Typography>
        </Box>

        {/* About Me Link */}
        <Typography component={Link} to='/about' sx={linkStyles}>
          About Me
        </Typography>
      </Stack>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
