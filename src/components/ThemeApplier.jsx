import React, { useContext, useEffect } from 'react';
import { LightModeContext } from './ToggleTheme';

function ThemeApplier() {
  const { lightMode } = useContext(LightModeContext);

  useEffect(() => {
    // Apply the class to the body or a root element, so no extra DOM element is needed
    document.body.className = lightMode ? 'light-mode' : 'dark-mode';
  }, [lightMode]);

  // No rendering, just apply the theme
  return null;
}

export default ThemeApplier;