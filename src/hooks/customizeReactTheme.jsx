import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import useLocalStorage from "react-use-localstorage";

// Text Colors
const TEXT_WHITE = "#ffffff";
const TEXT_BLACK = "#000000";

// Primary Purple Colors
const PURPLE_LIGHT = "#6a3cb3";
const PURPLE_DARK = "#b48bfc";

// Secondary Dark Colors
const DARK_LIGHT = "#102027";
const DARK_MAIN = "#37474f";
const DARK_DARK = "#102027";

// Background Colors
const BG_DARK = "#121212";
const BG_LIGHT = "#f5f5f5";
const PAPER_DARK = "#1e1e1e";
const PAPER_LIGHT = "#f2f4f7";

// ThreeJS Background Colors
const THREEJS_DARK = "#0b0d17";
const THREEJS_LIGHT = "#412d5c";

// Status Colors
const ERROR_MAIN = "#c62828";
const WARNING_MAIN = "#ffab00";

export default function useCustomTheme() {
  // check prefs in local storage
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "my-app-selected-theme",
    "system"
  );

  // check if the OS-level setting is in dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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

  const theme = React.useMemo(() => {
    return createTheme({
      handleSelectTheme,
      selectedTheme: storedTheme,
      palette: {
        mode: isDarkMode ? "dark" : "light",
        text: {
          primary: TEXT_WHITE,
          secondary: TEXT_BLACK,
        },
        primary: {
          light: PURPLE_LIGHT,
          main: isDarkMode ? TEXT_WHITE : PURPLE_LIGHT,
          dark: PURPLE_DARK,
          contrastText: TEXT_WHITE,
        },
        secondary: {
          light: DARK_LIGHT,
          main: isDarkMode ? DARK_MAIN : DARK_LIGHT,
          dark: DARK_DARK,
          contrastText: TEXT_WHITE,
        },
        tertiary: {
          light: DARK_LIGHT,
          main: DARK_MAIN,
          dark: DARK_DARK,
          contrastText: TEXT_WHITE,
        },
        error: {
          main: ERROR_MAIN,
        },
        warning: {
          main: WARNING_MAIN,
        },
        background: {
          default: isDarkMode ? BG_DARK : BG_LIGHT,
          paper: isDarkMode ? PAPER_DARK : PAPER_LIGHT,
        },
        threejsback: {
          default: isDarkMode ? THREEJS_DARK : THREEJS_LIGHT,
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
