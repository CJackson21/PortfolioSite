// src/Layout.jsx
import React, { useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import VisualStarryBackground from "./VisualStarryBackground"; // Renamed
import NavigationSpheres from "./NavigationSpheres";
import PropTypes from "prop-types";

const Layout = ({ sections }) => {
  const handleSphereNavigation = useCallback(
    (sectionId) => {
      const sectionToScroll = sections.find((s) => s.id === sectionId);
      if (sectionToScroll?.ref?.current) {
        sectionToScroll.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        console.warn(
          `Layout: Section or ref.current not found for ID: ${sectionId}`
        );
      }
    },
    [sections]
  );

  // Config for NavigationSpheres (id and name are enough)
  const navSphereConfig = useMemo(
    () => sections.map((s) => ({ id: s.id, name: s.name })),
    [sections]
  );

  return (
    <Box>
      {" "}
      {/* Outer container */}
      <VisualStarryBackground /> {/* Purely visual, zIndex: -1 */}
      {/* Interactive Navigation Spheres - zIndex is high, fixed position */}
      <NavigationSpheres
        sections={navSphereConfig}
        onSphereClick={handleSphereNavigation}
      />
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          position: "relative", // Establishes stacking context, content flows above background
          zIndex: 0, // Default, ensures it's above zIndex -1
          // Add paddingBottom if spheres might overlap scrollable content's end
          // This depends on sphere positioning and content length.
          // e.g. paddingBottom: '100px'
        }}
      >
        {sections.map((sectionInfo) => (
          // The actual section components are rendered here
          <React.Fragment key={sectionInfo.id}>
            {sectionInfo.component}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        .isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default Layout;
