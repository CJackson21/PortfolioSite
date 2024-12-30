import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ResumePopup from "./Resume";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = () => {
  const theme = useTheme();

  // Example: dynamic color usage
  const color = React.useCallback(() => {
    return theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  }, [theme]);

  const linkStyles = {
    textDecoration: "none",
    color,
    fontWeight: 500,
    fontSize: "1.5rem",
    display: "block",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(
          2.5
        )} rgba(0, 0, 0, 0.5)`,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={2} sx={{ padding: theme.spacing(2) }}>
        {/* Example image */}
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

        <Typography component={Link} to='/' sx={linkStyles}>
          Home
        </Typography>
        <Divider />

        <Typography component={Link} to='/projects' sx={linkStyles}>
          Projects
        </Typography>
        <Divider />

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

        <ResumePopup color={color} />
        <Divider />

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

        <Typography component={Link} to='/about' sx={linkStyles}>
          About Me
        </Typography>
        <Divider />
      </Stack>

      <Stack sx={{ padding: 2 }}>
        <ThemeSwitcher />
      </Stack>
    </Box>
  );
};

export default Sidebar;
