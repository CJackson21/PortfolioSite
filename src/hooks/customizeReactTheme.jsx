import React from "react";
import { createTheme } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import useLocalStorage from "react-use-localstorage";

// some of these colors are the same
// splitting up for simplicities sake
const TEXT_DARK = "#000000";
const TEXT_LIGHT = "#ffffff";

const PRIMARY_LIGHT = "#004c8b";
const PRIMARY_MAIN = "#8b56e8";
const PRIMARY_DARK = "#8b56e8";

const SECONDARY_LIGHT = "#8b56e8";
const SECONDARY_MAIN = "#8b56e8";
const SECONDARY_DARK = "#b48bfc";

const TERTIARY_LIGHT = "#102027";
const TERTIARY_MAIN = blueGrey[800];
const TERTIARY_DARK = "#b48bfc";

export default function useCustomTheme() {
  // check prefs in local storage
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "my-app-selected-theme",
    "system"
  );

  // check if the OS-level setting is in dark mode:
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // a callback to let us set the theme mode easily
  const handleSelectTheme = React.useCallback(
    (event, newTheme) => {
      if (newTheme != null) {
        setStoredTheme(newTheme);
      }
    },
    [setStoredTheme]
  );

  // decide if we should be in dark mode
  const isDarkMode = React.useMemo(
    () =>
      storedTheme === "dark" || (storedTheme === "system" && prefersDarkMode),
    [prefersDarkMode, storedTheme]
  );

  // create a Material-UI theme that adapts to the dark or light mode
  const theme = React.useMemo(() => {
    return createTheme({
      handleSelectTheme,
      selectedTheme: storedTheme,
      palette: {
        mode: isDarkMode ? "dark" : "light",
        text: {
          primary: TEXT_LIGHT,
          secondary: TEXT_DARK,
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
        background: {
          default: isDarkMode ? "#121212" : "#f5f5f5",
          paper: isDarkMode ? "#1e1e1e" : "#f2f4f7",
        },
        threejsback: {
          default: isDarkMode ? "#0b0d17" : "#412d5c",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },
      typography: {
        h4: {
          fontWeight: 500,
        },
      },
    });
  }, [handleSelectTheme, storedTheme, isDarkMode]);

  return {
    theme,
    storedTheme,
    handleSelectTheme,
    isDarkMode,
  };
}
