import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";
import About from "./components/About";
import MainPage from "./components/Home";
import Projects from "./components/Projects";
import Background from "./components/Background";
import Sidebar from "./components/SideBar";
import HamburgerButton from "./components/HamburgerButton";

const SIDEBAR_WIDTH = "20rem";

const App = () => {
  const { theme } = useCustomTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* 1. Sidebar Container */}
          <Box
            sx={{
              // Dynamically set width to push main content
              width: isSidebarOpen ? SIDEBAR_WIDTH : 0,
              transition: "width 0.3s ease",
              overflow: "hidden",
            }}
          >
            <Sidebar />
          </Box>

          {/* 2. Main Content */}
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <Background />
            <Box
              sx={{
                position: "absolute",
                top: theme.spacing(2),
                left: theme.spacing(2),
                zIndex: 10,
              }}
            >
              <HamburgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
            </Box>

            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/projects' element={<Projects />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
