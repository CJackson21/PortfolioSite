// src/components/Layout.js
import React, { useCallback, useMemo } from "react"; // Removed useEffect as it's not directly used here now
import { Box, useTheme, Fade } from "@mui/material";
import PropTypes from "prop-types";

import VisualStarryBackground from "./VisualStarryBackground";
import NavigationSpheres from "./NavigationSpheres"; // Ensure this path is correct

const Layout = ({ sections, introFinished, onIntroComplete }) => {
  const theme = useTheme();
  const handleNavigate = useCallback(
    (sectionId) => {
      const section = sections.find((s) => s.id === sectionId);

      if (section && section.ref && section.ref.current) {
        if (window.customScrollContext) {
          window.customScrollContext.isProgrammaticScroll = true;
          console.log("Layout: Set isProgrammaticScroll to true");
        } else {
          // This is a fallback, ScrollHandler should initialize it.
          window.customScrollContext = { isProgrammaticScroll: true };
          console.warn(
            "Layout: window.customScrollContext initialized here and set to true"
          );
        }
        if (window.location.hash !== `#${sectionId}`) {
          window.history.replaceState(null, "", `#${sectionId}`);
        }

        section.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          if (window.customScrollContext) {
            window.customScrollContext.isProgrammaticScroll = false;
          }
        }, 1000); // Adjust timeout if necessary (e.g., 700-1200ms for typical smooth scrolls)
      } else {
        console.error(
          "Layout: Failed to navigate. Section, ref, or ref.current is missing for sectionId:",
          sectionId,
          {
            sectionExists: !!section,
            refExists: !!(section && section.ref),
            refCurrentExists: !!(section && section.ref && section.ref.current),
            currentRefValue: section?.ref?.current,
          }
        );
      }
    },
    [sections] // Dependency array for useCallback
  );

  const mappedSectionsForSpheres = useMemo(() => {
    // Ensure 'name' (or 'label') is what NavigationSpheres expects for Tooltip/aria-label
    return sections.map((s) => ({ id: s.id, name: s.name }));
  }, [sections]);

  const mainContentFadeDuration = 1000;
  const mainContentDelay = 300; // Delay for main content to appear after intro
  const v2TagDelay = mainContentDelay + 200; // Delay for "v2" tag
  const spheresDelay = mainContentDelay + 400; // Delay for NavigationSpheres

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      <VisualStarryBackground onIntroComplete={onIntroComplete} />

      <Box
        component="main"
        id="main-content-area"
        sx={{
          flexGrow: 1,
          width: "100%",
          // marginLeft: "0px", // Already default
          position: "relative", // For potential absolutely positioned children within main
          height: "100vh", // Ensures the main area itself can be a scroll container if needed
          overflowY: "auto", // This makes this Box the scrollable container for your sections
          opacity: introFinished ? 1 : 0,
          pointerEvents: introFinished ? "auto" : "none",
          transition: `opacity ${mainContentFadeDuration}ms ease-in-out ${mainContentDelay}ms`,
        }}
      >
        {/* Render section components. Refs are passed down from App.js */}
        {sections.map((sectionInfo) => sectionInfo.component)}

        {introFinished && (
          <Fade
            in={introFinished}
            timeout={1000} // Duration of the fade animation
            TransitionProps={{
              style: {
                transitionDelay: introFinished ? `${v2TagDelay}ms` : "0ms",
              },
            }}
          >
            <Box
              sx={{
                position: "fixed", // Fixed to the viewport
                bottom: 12,
                left: 12,
                zIndex: theme.zIndex.tooltip + 1, // Ensure it's above most things
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
          timeout={1000} // Duration of the fade animation
          TransitionProps={{
            style: {
              transitionDelay: introFinished ? `${spheresDelay}ms` : "0ms",
            },
          }}
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
  isMobile: PropTypes.bool.isRequired,
  introFinished: PropTypes.bool.isRequired,
  onIntroComplete: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ref: PropTypes.shape({ current: PropTypes.any }), // Forwarded refs
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default React.memo(Layout);
