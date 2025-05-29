import React from "react";
import { useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Layout from "./components/Layout"; // Your Layout component

const App = () => {
  const { theme } = useCustomTheme();
  const isMobile = useMediaQuery("(max-width:899px)", { noSsr: true });
  const location = useLocation();

  const homeRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  // Sections data: App owns the structure, refs, and component instances
  const sections = React.useMemo(
    () => [
      {
        id: "home",
        name: "Home",
        ref: homeRef,
        component: <Home ref={homeRef} />,
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
    [isMobile]
  );

  // Handles scrolling based on URL hash (e.g., for deep linking)
  React.useEffect(() => {
    const currentHash = location.hash.substring(1);
    if (currentHash) {
      const sectionToScroll = sections.find((sec) => sec.id === currentHash);
      if (sectionToScroll?.ref?.current) {
        const timer = setTimeout(() => {
          sectionToScroll.ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // Slight delay for elements to be ready
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, sections]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout sections={sections} />
    </ThemeProvider>
  );
};

export default App;
