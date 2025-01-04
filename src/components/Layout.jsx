import React from "react";
import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

import Sidebar from "./SideBar";
import Background from "./Background";

const DRAWER_WIDTH = 240;

const Layout = ({ children, isMobile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

  // sets the sidebar to open
  const handleOpenSidebar = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  // sets the sidebar to closed
  const handleCloseSidebar = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SwipeableDrawer
        disableSwipeToOpen={false}
        variant={isMobile ? "temporary" : "persistent"}
        open={!isMobile || isSidebarOpen}
        onOpen={handleOpenSidebar}
        onClose={handleCloseSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "100vw" : DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Sidebar onLinkClick={handleCloseSidebar} isMobile={isMobile} />
      </SwipeableDrawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "all 0.3s ease",
          width: isMobile
            ? "100%"
            : isSidebarOpen
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : "100%",
          marginLeft: isMobile ? 0 : isSidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          position: "relative",
        }}
      >
        <Background />
        {/* Hamburger Button */}
        {isMobile && (
          <Box
            sx={{
              position: "fixed",
              top: 12,
              left: 12,
              zIndex: 30,
            }}
          >
            <IconButton onClick={handleOpenSidebar} sx={{ color: "white" }}>
              <MenuIcon
                sx={{
                  fontSize: 32,
                  transform: isSidebarOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </IconButton>
          </Box>
        )}
        {/* Content */}
        <Box component='main'>{children}</Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 12,
            left: isMobile || !isSidebarOpen ? 12 : `${DRAWER_WIDTH + 12}px`,
            zIndex: 30,
            color: "white",
            borderRadius: "8px",
            padding: "0.2rem 0.5rem",
            fontWeight: "bold",
            fontSize: "0.90rem",
            transition: "left 0.3s ease",
          }}
        >
          v2
        </Box>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Layout;
