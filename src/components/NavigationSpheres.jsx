import { Box, Fab, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

// Example icons (install @mui/icons-material if not already)
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";

const iconMap = {
  home: <HomeIcon />,
  projects: <WorkIcon />,
  about: <InfoIcon />,
};

const NavigationSpheres = ({ sections, onSphereClick }) => {
  const spacing = 16;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30, // Adjust as needed
        left: "50%",
        transform: "translateX(-50%)", // Center the box
        display: "flex",
        gap: `${spacing}px`,
        zIndex: 1050, // High zIndex to be above most content, but below modals if any
        padding: "10px",
        backgroundColor: "rgba(0,0,0,0.2)", // Optional: slight background for the sphere container
        borderRadius: "30px",
      }}
    >
      {sections.slice(0, 3).map((section) => (
        <Tooltip title={`Go to ${section.name}`} key={section.id}>
          <Fab
            color="primary" // Or "secondary", "default"
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
            {/* Use an icon or first letter */}
            {iconMap[section.id] || section.name.substring(0, 1).toUpperCase()}
          </Fab>
        </Tooltip>
      ))}
    </Box>
  );
};

NavigationSpheres.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSphereClick: PropTypes.func.isRequired,
};

export default NavigationSpheres;
