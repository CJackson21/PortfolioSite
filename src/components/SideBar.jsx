import PropTypes from "prop-types";
import { Drawer, Stack, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ResumePopup from "./Resume";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const linkStyles = {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "1.5rem",
    display: "block",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.dark,
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
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Stack spacing={2}>
        <Typography sx={{ alignSelf: "center" }}>
          <img
            src='/img/Jackson_Caleb_1-2.jpg'
            alt='Description'
            style={{
              borderRadius: "50%",
              width: "10rem",
              height: "auto",
            }}
          />
        </Typography>
        {/* GitHub Link */}
        <Typography
          component='a'
          href='https://github.com/CJackson21'
          target='_blank'
          rel='noopener noreferrer'
          sx={linkStyles}
        >
          GitHub
        </Typography>
        <Divider />
        {/* Resume Popup */}
        <ResumePopup />
        <Divider />
        {/* LinkedIn Link */}
        <Typography
          component='a'
          href='https://www.linkedin.com/in/caleb-jackson-b08660264'
          target='_blank'
          rel='noopener noreferrer'
          sx={linkStyles}
        >
          LinkedIn
        </Typography>
        <Divider />
        {/* About Me Link */}
        <Typography component={Link} to='/about' sx={linkStyles}>
          About Me
        </Typography>
        <Divider />
      </Stack>
      <Stack>
        <ThemeSwitcher />
      </Stack>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
