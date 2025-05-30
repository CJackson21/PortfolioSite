import React from "react";
// Removed: import { useLocation } from "react-router-dom";
// Removed: import React, { useEffect } from "react"; // useEffect is now in ScrollHandler
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Layout from "./components/Layout";
import ScrollHandler from "./components/ScrollHandler"; // <-- Import the new component

const App = () => {
  const { theme } = useCustomTheme();
  const isMobile = useMediaQuery("(max-width:899px)", { noSsr: true });
  const [introFinished, setIntroFinished] = React.useState(false);

  const handleIntroComplete = React.useCallback(() => {
    setIntroFinished(true);
  }, []);

  // Create refs for each section
  const homeRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  // Sections data: App owns the structure, refs, and component instances
  // The 'name' property was in your provided App.js, I've kept it.
  // Sidebar will use 'name' (or 'label' if you prefer that key) for link text.
  const sections = React.useMemo(
    () => [
      {
        id: "home",
        name: "Home", // Or 'label' - ensure Sidebar uses this key
        ref: homeRef,
        component: <Home ref={homeRef} introFinished={introFinished} />,
      },
      {
        id: "projects",
        name: "Projects", // Or 'label'
        ref: projectsRef,
        component: <Projects ref={projectsRef} isMobile={isMobile} />,
      },
      {
        id: "about",
        name: "About Me", // Or 'label'
        ref: aboutRef,
        component: <About ref={aboutRef} />,
      },
    ],
    [isMobile, introFinished]
  );

  // The useEffect for scrolling has been moved to ScrollHandler.js

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ScrollHandler sections={sections} />
      <Layout
        isMobile={isMobile}
        sections={sections}
        introFinished={introFinished}
        onIntroComplete={handleIntroComplete}
      />
    </ThemeProvider>
  );
};

export default App;
