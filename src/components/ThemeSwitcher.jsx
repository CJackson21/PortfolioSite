import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/WbSunny";

function ThemeSwitcher() {
  // We'll read our custom fields (selectedTheme, handleSelectTheme)
  // from the theme (make sure you attach them in your createTheme config).
  const theme = useTheme();
  const { selectedTheme, handleSelectTheme } = theme;

  // Determine if we're currently in dark mode
  const isDark = selectedTheme === "dark";

  // Handler to toggle between dark and light
  const toggleThemeMode = () => {
    // If we are in dark mode, switch to light; otherwise switch to dark
    const newMode = isDark ? "light" : "dark";
    // Our original callback expects: handleSelectTheme(event, newValue)
    handleSelectTheme(null, newMode);
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={toggleThemeMode}
      startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
      sx={{
        minWidth: "fit-content", // Ensure the button size adjusts to its content
        width: "fit-content",
        padding: "0.5rem 1rem", // Add padding around the text and icon
        display: "inline-flex", // Ensure icon and text remain in one line
        alignItems: "center", // Center align text and icon vertically
        gap: "0.5rem", // Add spacing between the icon and text
        textTransform: "none", // Keep the text as it is, without uppercase transformation
        whiteSpace: "nowrap", // Prevent text from wrapping
      }}
    >
      {/* Toggle button text based on the current theme mode */}
      {isDark ? "Switch to Light" : "Switch to Dark"}
    </Button>
  );
}

export default ThemeSwitcher;
