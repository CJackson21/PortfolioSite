import React from "react";
import { Button } from "@mui/material";
import useCustomTheme from "../hooks/customizeReactTheme";

function ThemeSwitcher() {
  const { themeMode, toggleTheme } = useCustomTheme();

  return (
    <Button variant='contained' onClick={toggleTheme}>
      Switch to {themeMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
}

export default ThemeSwitcher;
