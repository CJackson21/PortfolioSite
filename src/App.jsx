import React from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";

import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Layout from "./components/Layout";
import ScrollHandler from "./components/ScrollHandler";

const App = () => {
  const { theme } = useCustomTheme();
  const isMobile = useMediaQuery("(max-width:899px)", { noSsr: true });
  const [introFinished, setIntroFinished] = React.useState(false);

  const handleIntroComplete = React.useCallback(() => {
    setIntroFinished(true);
  }, []);

  const homeRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  const sections = React.useMemo(
    () => [
      {
        id: "home",
        name: "Home",
        ref: homeRef,
        component: <Home ref={homeRef} introFinished={introFinished} />,
      },
      {
        id: "projects",
        name: "Projects",
        ref: projectsRef,
        component: <Projects ref={projectsRef} isMobile={isMobile} />,
      },
      {
        id: "about",
        name: "About Me",
        ref: aboutRef,
        component: <About ref={aboutRef} />,
      },
    ],
    [isMobile, introFinished]
  );

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
