import React from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";

const iconMap = {
  home: <HomeIcon />,
  projects: <WorkIcon />,
  about: <InfoIcon />,
};

const NavigationSpheres = React.forwardRef(
  ({ sections, onSphereClick }, ref) => {
    const spacing = 16;

    return (
      <Box
        ref={ref}
        sx={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: `${spacing}px`,
          zIndex: 1050,
          padding: "10px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "30px",
        }}
      >
        {sections.slice(0, 3).map((section) => (
          <Tooltip title={`Go to ${section.name}`} key={section.id}>
            <Fab
              color="primary"
              aria-label={`Maps to ${section.name}`}
              onClick={() => onSphereClick(section.id)}
              size="medium"
              sx={{
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.15)",
                  boxShadow: (theme) => theme.shadows[6],
                },
              }}
            >
              {iconMap[section.id] ||
                section.name.substring(0, 1).toUpperCase()}
            </Fab>
          </Tooltip>
        ))}
      </Box>
    );
  }
);

NavigationSpheres.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSphereClick: PropTypes.func.isRequired,
};

NavigationSpheres.displayName = "NavigationSpheres";

export default NavigationSpheres;
