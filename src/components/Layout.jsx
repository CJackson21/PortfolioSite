import React from "react";
import { Box, IconButton, SwipeableDrawer, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Background from "./Background";

const DRAWER_WIDTH = 240;

const Layout = ({ isMobile, sections }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

  // Update sidebar open state if isMobile changes
  React.useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleOpenSidebar = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = React.useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  // Calculate main content width based on sidebar state (for desktop)
  const mainContentWidth = React.useMemo(() => {
    if (isMobile) return "100%";
    return isSidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";
  }, [isMobile, isSidebarOpen]);

  // Calculate margin for main content (for desktop)
  const mainContentMarginLeft = React.useMemo(() => {
    if (isMobile) return "0px";
    return isSidebarOpen ? `${DRAWER_WIDTH}px` : "0px";
  }, [isMobile, isSidebarOpen]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Drawer for the Sidebar */}
      <SwipeableDrawer
        disableSwipeToOpen={!isMobile}
        variant={isMobile ? "temporary" : "persistent"}
        open={isSidebarOpen}
        onOpen={handleOpenSidebar}
        onClose={handleCloseSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: isMobile ? "80vw" : DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "80vw" : DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Sidebar component receives sections for link generation */}
        <Sidebar
          onLinkClick={handleCloseSidebar}
          isMobile={isMobile}
          sections={sections}
        />
      </SwipeableDrawer>

      {/* Main Content Area where sections are rendered */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: mainContentWidth,
          marginLeft: mainContentMarginLeft,
          position: "relative",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Background />
        {/* Hamburger Button for Mobile - Show only if sidebar is closed on mobile */}
        {isMobile && !isSidebarOpen && (
          <Box
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: theme.zIndex.drawer + 1,
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
        {/* Render all the section components passed from App.js */}
        {sections.map((sectionInfo) =>
          React.cloneElement(sectionInfo.component, { key: sectionInfo.id })
        )}
        {/* Version number display */}
        <Box
          sx={{
            position: "fixed",
            bottom: 12,
            left: isMobile ? 12 : isSidebarOpen ? `${DRAWER_WIDTH + 12}px` : 12,
            zIndex: theme.zIndex.tooltip,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: "8px",
            padding: "0.3rem 0.6rem",
            fontWeight: "bold",
            fontSize: "0.85rem",
            transition: theme.transitions.create("left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
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
      ref: PropTypes.object.isRequired, // Ref is needed by App.js, not directly by Layout
      component: PropTypes.element.isRequired, // Layout renders this component
    })
  ).isRequired,
};

export default React.memo(Layout); // Memoize Layout for performance
