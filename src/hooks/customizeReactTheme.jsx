import React from "react";
import { createTheme } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import useLocalStorage from "react-use-localstorage";

// Customize these colors to your liking:
const PRIMARY_LIGHT = "#004c8b";
const PRIMARY_MAIN = "#8b56e8";
const PRIMARY_DARK = "#b48bfc";

const SECONDARY_LIGHT = "#0077c2";
const SECONDARY_MAIN = "#8b56e8";
const SECONDARY_DARK = "#b48bfc";

const TERTIARY_LIGHT = "#102027";
const TERTIARY_MAIN = blueGrey[800];
const TERTIARY_DARK = "#b48bfc";

export default function useCustomTheme() {
  //---------------------------------------------------------------------------
  // 1) Read from localStorage and check OS preference
  //---------------------------------------------------------------------------
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "my-app-selected-theme",
    "system"
  );
  // `system`, `light`, or `dark`

  // Check if the OS-level setting is in dark mode:
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  //---------------------------------------------------------------------------
  // 2) A callback to let us set the theme mode easily
  //---------------------------------------------------------------------------
  const handleSelectTheme = React.useCallback(
    (event, newTheme) => {
      if (newTheme != null) {
        setStoredTheme(newTheme);
      }
    },
    [setStoredTheme]
  );

  //---------------------------------------------------------------------------
  // 3) Decide if we should be in dark mode
  //---------------------------------------------------------------------------
  const isDarkMode = React.useMemo(
    () =>
      storedTheme === "dark" || (storedTheme === "system" && prefersDarkMode),
    [prefersDarkMode, storedTheme]
  );

  //---------------------------------------------------------------------------
  // 4) Create a Material-UI theme that adapts to the dark or light mode
  //---------------------------------------------------------------------------
  const theme = React.useMemo(() => {
    return createTheme({
      // We can attach extra info to the theme if we want:
      handleSelectTheme, // so components can call it if needed
      selectedTheme: storedTheme,

      palette: {
        mode: isDarkMode ? "dark" : "light",
        text: {
          primary: "#ffffff",
          secondary: "#cccccc",
        },
        primary: {
          light: PRIMARY_LIGHT,
          main: PRIMARY_MAIN,
          dark: PRIMARY_DARK,
          contrastText: "#ffffff",
        },
        secondary: {
          light: SECONDARY_LIGHT,
          main: SECONDARY_MAIN,
          dark: SECONDARY_DARK,
          contrastText: "#ffffff",
        },
        tertiary: {
          light: TERTIARY_LIGHT,
          main: TERTIARY_MAIN,
          dark: TERTIARY_DARK,
          contrastText: "#ffffff",
        },
        error: {
          main: "#c62828",
        },
        warning: {
          main: "#ffab00",
        },
        info: {
          main: blue[400],
        },
        // Adjust background if you want
        background: {
          default: isDarkMode ? "#121212" : "#f5f5f5",
          paper: isDarkMode ? "#1e1e1e" : "#ffffff",
        },
        // MUI advanced settings:
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },

      // Set typography
      typography: {
        h5: {
          fontWeight: 500,
        },
      },
    });
  }, [handleSelectTheme, storedTheme, isDarkMode]);

  //---------------------------------------------------------------------------
  // 5) Return the theme and also an easy way to switch theme
  //---------------------------------------------------------------------------
  return {
    theme,
    storedTheme,
    handleSelectTheme,
    isDarkMode,
  };
}
