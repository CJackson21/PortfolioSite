import React from "react";
import { LightModeContext } from "../contexts/ToggleThemeContext";

function ThemeApplier() {
  const { lightMode } = React.useContext(LightModeContext);

  React.useEffect(() => {
    // Apply the class to the body or a root element, so no extra DOM element is needed
    document.body.className = lightMode ? "light-mode" : "dark-mode";
  }, [lightMode]);

  // No rendering, just apply the theme
  return null;
}

export default ThemeApplier;
