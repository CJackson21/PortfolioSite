import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, CssBaseline } from "@mui/material";
import useCustomTheme from "./customizeReactTheme";

function ThemeProviderWrapper({ children }) {
  const { theme } = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProviderWrapper;
