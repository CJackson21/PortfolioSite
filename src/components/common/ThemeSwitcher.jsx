import React from "react";
import PropTypes from "prop-types";
import { Box, Fab, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/WbSunny";

function ThemeSwitcher({ isMobile }) {
  const theme = useTheme();
  const { handleSelectTheme } = theme;
  const isDark = theme.palette.mode === "dark";

  const toggleThemeMode = () => {
    const newMode = isDark ? "light" : "dark";
    handleSelectTheme(null, newMode);
  };

  const buttonSize = isMobile ? 32 : 48;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMobile ? 16 : 30,
        right: isMobile ? 16 : 30,
        zIndex: 1050,
        padding: isMobile ? "4px" : "10px",
        backgroundColor: theme.palette.background.paper + "80",
        borderRadius: isMobile ? "20px" : "30px",
        backdropFilter: "blur(8px)",
      }}
    >
      <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
        <Fab
          color="inherit"
          aria-label="Toggle theme"
          onClick={toggleThemeMode}
          sx={{
            width: buttonSize,
            height: buttonSize,
            minHeight: 0,
            borderRadius: "50%",
            transition: "all 0.15s ease-in-out",
            backgroundColor: isDark
              ? theme.palette.secondary.main
              : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              isDark ? theme.palette.secondary.main : theme.palette.primary.main
            ),
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: 4,
              backgroundColor: isDark
                ? theme.palette.secondary.dark
                : theme.palette.primary.dark,
            },
          }}
        >
          {isDark ? (
            <LightModeIcon sx={{ fontSize: isMobile ? 16 : 24 }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: isMobile ? 16 : 24 }} />
          )}
        </Fab>
      </Tooltip>
    </Box>
  );
}

ThemeSwitcher.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
export default React.memo(ThemeSwitcher);
