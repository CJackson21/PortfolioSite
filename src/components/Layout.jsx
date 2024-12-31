import React from 'react';
import { Box, Drawer } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from './SideBar';
import HamburgerButton from './HamburgerButton';
import Background from './Background';

const DRAWER_WIDTH = 240;

// adjusts the layout of the site with the sidebar
const Layout = ({ children, isMobile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
        open={isSidebarOpen}
        onClose={closeSidebarOnMobile}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100vw' : `${DRAWER_WIDTH}px`,
            minHeight: '100vh',
            boxSizing: 'border-box',
          },
        }}
      >
        <Sidebar onLinkClick={closeSidebarOnMobile} isMobile={isMobile} />
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: isMobile ? 0 : isSidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: 'margin-left 0.3s ease',
          position: 'relative',
        }}
      >
        <Background />
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
        <Box component='main'>
          {children}
          <Box
            sx={{
              position: 'fixed',
              bottom: 12,
              left: 12,
              zIndex: 30,
              color: 'white',
              borderRadius: '8px',
              padding: '0.2rem 0.5rem',
              fontWeight: 'bold',
              fontSize: '0.90rem',
            }}
          >
            v2
          </Box>
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
