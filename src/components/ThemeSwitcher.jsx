import React from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/WbSunny";

function ThemeSwitcher() {
  const theme = useTheme();
  const { handleSelectTheme } = theme;
  const isDark = theme.palette.mode === "dark";

  const toggleThemeMode = () => {
    const newMode = isDark ? "light" : "dark";
    handleSelectTheme(null, newMode);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1050,
        padding: "10px",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)",
        borderRadius: "30px",
        backdropFilter: "blur(10px)",
      }}
    >
      <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
        <Fab
          color={isDark ? "secondary" : "primary"}
          aria-label="Toggle theme"
          onClick={toggleThemeMode}
          size="medium"
          sx={{
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.15)",
              boxShadow: 6,
            },
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            ),
          }}
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default React.memo(ThemeSwitcher);
