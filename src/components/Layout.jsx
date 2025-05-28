import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

// Assuming StarfieldBackground is imported as Background
import Background from "./StarfieldBackground"; // Make sure this path is correct

const Layout = ({ isMobile, sections }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleOpenSidebar = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  // --- New: Prepare config and callback for Background ---
  const interactiveZonesConfig = React.useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.label,
        // You could add more props here for StarfieldBackground to use,
        // e.g., preferredColor, initialPositionHints if needed.
      })),
    [sections]
  );

  const handleZoneClick = React.useCallback(
    (sectionId) => {
      console.log(
        `Zone clicked in background, attempting to scroll to: ${sectionId}`
      );
      const sectionToScroll = sections.find((s) => s.id === sectionId);
      if (
        sectionToScroll &&
        sectionToScroll.ref &&
        sectionToScroll.ref.current
      ) {
        sectionToScroll.ref.current.scrollIntoView({ behavior: "smooth" });
        if (isMobile && isSidebarOpen) {
          // Optionally close mobile sidebar after navigation
          setIsSidebarOpen(false);
        }
      } else {
        console.warn(`Section or ref not found for ID: ${sectionId}`);
      }
    },
    [sections, isMobile, isSidebarOpen]
  ); // Added isMobile and isSidebarOpen to deps for the conditional close
  // --- End New ---

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          position: "relative", // Important for child absolute/fixed positioning context if any
          height: "100vh",
          overflowY: "auto", // This allows scrolling of sections
        }}
      >
        {/* Pass new props to Background */}
        <Background
          interactiveZonesConfig={interactiveZonesConfig}
          onZoneClick={handleZoneClick}
        />

        {/* Hamburger Button for Mobile */}
        {isMobile && !isSidebarOpen && (
          <Box
            sx={{
              position: "fixed", // Fixed to viewport
              top: 16,
              left: 16,
              zIndex: theme.zIndex.drawer + 2, // Ensure it's above background
            }}
          >
            <IconButton
              onClick={handleOpenSidebar}
              sx={{
                color: "white",
                backgroundColor: "rgba(0,0,0,0.3)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
              }}
              aria-label="open drawer"
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        )}

        {/* Render sections */}
        {sections.map((sectionInfo) =>
          React.cloneElement(sectionInfo.component, {
            key: sectionInfo.id,
            // The 'ref' is part of sectionInfo.component.props or sectionInfo.ref directly
            // If sectionInfo.component is a functional component, it needs React.forwardRef
            // or the ref must be attached to a DOM element within it.
            // We assume sectionInfo.ref is the one to use for scrollIntoView.
          })
        )}

        {/* Version Box */}
        <Box
          sx={{
            position: "fixed", // Fixed to viewport
            bottom: 12,
            left: 12,
            zIndex: theme.zIndex.tooltip, // Ensure it's above background
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
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        .isRequired, // More specific ref type
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default React.memo(Layout);
