import React from "react";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

function getStoredTheme() {
  // Attempt to read the saved theme mode from localStorage
  // If nothing is stored, default to "light"
  const savedTheme = localStorage.getItem("themeMode");
  return savedTheme ? savedTheme : "light";
}

const useCustomTheme = () => {
  const [themeMode, setThemeMode] = React.useState(getStoredTheme);

  // Toggle between "light" and "dark"
  const toggleTheme = React.useCallback(() => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Persist theme to localStorage whenever `themeMode` changes
  React.useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // For convenience, boolean to check if we are in dark mode
  const isDarkMode = themeMode === "dark";

  // Optional: dynamically set body background & text color
  React.useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#000" : "#FFF";
    document.body.style.color = isDarkMode ? "#FFF" : "#000";
  }, [isDarkMode]);

  // Create the Material-UI theme
  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
        primary: {
          // Tweak these as you like
          light: "#fafafa",
          main: "#fafafa",
          dark: "#000000",
          contrastText: "#ffffff",
        },
        info: {
          main: blue[400],
        },
      },
    });
  }, [isDarkMode]);

  return { theme, themeMode, toggleTheme };
};

export default useCustomTheme;
