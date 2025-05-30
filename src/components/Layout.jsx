import React from "react";
import { Box, useTheme, Fade } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import VisualStarryBackground from "./VisualStarryBackground";
import NavigationSpheres from "./NavigationSpheres";

const Layout = ({ sections, introFinished, onIntroComplete }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const mainContentRef = React.useRef(null);
  const scrollLockRef = React.useRef(false);

  const handleScroll = React.useCallback(() => {
    if (mainContentRef.current && !scrollLockRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress || 0);
    }
  }, []);

  // Track scroll progress
  React.useEffect(() => {
    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const handleNavigate = React.useCallback(
    (sectionId) => {
      const section = sections.find((s) => s.id === sectionId);
      if (section?.ref?.current) {
        scrollLockRef.current = true;
        window.customScrollContext = { isProgrammaticScroll: true };

        // Always navigate even if on same path
        navigate(section.path);

        // Scroll to the top of the section
        section.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          scrollLockRef.current = false;
          window.customScrollContext.isProgrammaticScroll = false;
        }, 1000);
      }
    },
    [sections, navigate]
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Background */}
      <Box
        id="starry-container"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <VisualStarryBackground
          onIntroComplete={onIntroComplete}
          scrollProgress={scrollProgress}
        />
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        ref={mainContentRef}
        id="main-content-area"
        sx={{
          flexGrow: 1,
          width: "100%",
          position: "relative",
          height: "100vh",
          overflowY: "auto",
          opacity: introFinished ? 1 : 0,
          pointerEvents: introFinished ? "auto" : "none",
          zIndex: 10,
          transition: `opacity 1000ms ease-in-out 300ms`,
        }}
      >
        {sections.map((sectionInfo) => (
          <Box key={sectionInfo.id} sx={{ minHeight: "100vh" }}>
            {sectionInfo.component}
          </Box>
        ))}
        {/* Version Tag */}
        {introFinished && (
          <Fade
            in={introFinished}
            timeout={1000}
            style={{ transitionDelay: `500ms` }}
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 12,
                left: 12,
                zIndex: theme.zIndex.tooltip + 1,
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {/* Version Tag */}
              <Box
                sx={{
                  color: "white",
                  borderRadius: "8px",
                  padding: "0.3rem 0.6rem",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
              >
                v3
              </Box>

              {/* Theme Switcher */}
              <ThemeSwitcher />
            </Box>
          </Fade>
        )}
      </Box>
      {/* Navigation Spheres */}
      {introFinished && (
        <Fade
          in={introFinished}
          timeout={1000}
          style={{ transitionDelay: `700ms` }}
        >
          <NavigationSpheres
            sections={sections.map((s) => ({ id: s.id, name: s.name }))}
            onSphereClick={handleNavigate}
          />
        </Fade>
      )}
    </Box>
  );
};

Layout.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ref: PropTypes.shape({ current: PropTypes.any }),
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
  introFinished: PropTypes.bool.isRequired,
  onIntroComplete: PropTypes.func.isRequired,
};

export default React.memo(Layout);
