import React from 'react';
import { Box, Drawer } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from './SideBar';
import HamburgerButton from './HamburgerButton';
import Background from './Background';

const DRAWER_WIDTH = 240;

const Layout = ({ children, isMobile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebarOnMobile = React.useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={!isMobile || isSidebarOpen}
        onClose={closeSidebarOnMobile}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100vw' : DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Sidebar onLinkClick={closeSidebarOnMobile} isMobile={isMobile} />
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          transition: 'all 0.3s ease',
          width: isMobile
            ? '100%'
            : isSidebarOpen
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : '100%',
          marginLeft: isMobile ? 0 : isSidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          position: 'relative', // Ensure relative positioning for absolute children
        }}
      >
        <Background />
        {/* Hamburger Button */}
        {isMobile && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 30,
            }}
          >
            <HamburgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
          </Box>
        )}
        {/* Content */}
        <Box component='main'>{children}</Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 12,
            left: isMobile || !isSidebarOpen ? 12 : `${DRAWER_WIDTH + 12}px`,
            zIndex: 30,
            color: 'white',
            borderRadius: '8px',
            padding: '0.2rem 0.5rem',
            fontWeight: 'bold',
            fontSize: '0.90rem',
            transition: 'left 0.3s ease',
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
