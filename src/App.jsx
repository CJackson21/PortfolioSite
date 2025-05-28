import React from "react";
import { useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Layout from "./components/Layout";
import StarfieldBackground from "./components/StarfieldBackground";

const App = () => {
  const { theme } = useCustomTheme();
  const isMobile = useMediaQuery("(max-width:899px)", { noSsr: true });
  const location = useLocation();

  // console.log("Current location:", location); // For debugging

  // Create refs for each section
  const homeRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  // Define sections data
  const sections = React.useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        ref: homeRef,
        component: <Home ref={homeRef} />, // Ensure Home component uses React.forwardRef if it's a functional component
      },
      {
        id: "projects",
        label: "Projects",
        ref: projectsRef,
        component: <Projects ref={projectsRef} isMobile={isMobile} />, // Ensure Projects uses React.forwardRef
      },
      {
        id: "about",
        label: "About Me",
        ref: aboutRef,
        component: <About ref={aboutRef} />, // Ensure About uses React.forwardRef
      },
    ],
    [isMobile] // isMobile is a dependency for Projects component
  );

  // --- Prepare config and callback for StarfieldBackground ---
  const interactiveZonesConfig = React.useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.label,
      })),
    [sections]
  );

  const handleZoneClick = React.useCallback(
    (sectionId) => {
      console.log(`App: handleZoneClick called with sectionId: ${sectionId}`);
      const sectionToScroll = sections.find((s) => s.id === sectionId);
      if (
        sectionToScroll &&
        sectionToScroll.ref &&
        sectionToScroll.ref.current
      ) {
        sectionToScroll.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Optionally close mobile sidebar if open, assuming Layout handles sidebar state
        // This would require passing a function from Layout to App or using context/state management
      } else {
        console.warn(
          `App: Section or ref.current not found for ID: ${sectionId}`
        );
      }
    },
    [sections]
  );
  // --- End Background Config ---

  // Effect for scrolling based on URL hash
  React.useEffect(() => {
    const currentHash = location.hash.substring(1);
    // console.log("Current hash:", currentHash); // For debugging

    if (currentHash) {
      const sectionToScroll = sections.find((sec) => sec.id === currentHash);
      // console.log("Section to scroll from hash:", sectionToScroll); // For debugging
      if (
        sectionToScroll &&
        sectionToScroll.ref &&
        sectionToScroll.ref.current
      ) {
        // Timeout to ensure the element is rendered and layout is stable
        setTimeout(() => {
          if (sectionToScroll.ref.current) {
            // Double check ref.current before scrolling
            sectionToScroll.ref.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100); // Small delay can help
      }
    } else {
      // Only scroll to top if not already there and no hash is present
      if (window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.hash, sections]); // sections is a dependency

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StarfieldBackground
        interactiveZonesConfig={interactiveZonesConfig}
        onZoneClick={handleZoneClick}
      />
    </ThemeProvider>
  );
};

export default App;
