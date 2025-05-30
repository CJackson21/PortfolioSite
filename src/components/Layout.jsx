import React from "react";
import { Box, useTheme, Fade } from "@mui/material";
import PropTypes from "prop-types";
import VisualStarryBackground from "./VisualStarryBackground";
import NavigationSpheres from "./NavigationSpheres";

const Layout = ({ sections, introFinished, onIntroComplete }) => {
  const theme = useTheme();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const mainContentRef = React.useRef(null);

  const handleScroll = React.useCallback(() => {
    if (mainContentRef.current) {
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
      // Initial calculation
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
        window.customScrollContext = { isProgrammaticScroll: true };
        window.history.replaceState(null, "", `#${sectionId}`);
        section.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setTimeout(() => {
          window.customScrollContext.isProgrammaticScroll = false;
        }, 1000);
      }
    },
    [sections]
  );

  const mappedSectionsForSpheres = React.useMemo(
    () => sections.map((s) => ({ id: s.id, name: s.name })),
    [sections]
  );

  const mainContentFadeDuration = 1000;
  const mainContentDelay = 300;
  const v2TagDelay = mainContentDelay + 200;
  const spheresDelay = mainContentDelay + 400;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
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
          transition: `opacity ${mainContentFadeDuration}ms ease-in-out ${mainContentDelay}ms`,
        }}
      >
        {sections.map((sectionInfo) => (
          <Box key={sectionInfo.id} sx={{ minHeight: "100vh" }}>
            {sectionInfo.component}
          </Box>
        ))}
        {introFinished && (
          <Fade
            in={introFinished}
            timeout={1000}
            style={{ transitionDelay: `${v2TagDelay}ms` }}
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 12,
                left: 12,
                zIndex: theme.zIndex.tooltip + 1,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: "8px",
                padding: "0.3rem 0.6rem",
                fontWeight: "bold",
                fontSize: "0.85rem",
              }}
            >
              v2
            </Box>
          </Fade>
        )}
      </Box>
      {introFinished && (
        <Fade
          in={introFinished}
          timeout={1000}
          style={{ transitionDelay: `${spheresDelay}ms` }}
        >
          <NavigationSpheres
            sections={mappedSectionsForSpheres}
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
