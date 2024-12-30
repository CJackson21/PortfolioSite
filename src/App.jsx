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
        <Box
          sx={{
            position: "relative",
            height: "100vh",
          }}
        >
          {/* Background Component */}
          <Background />

          {/* Hamburger Button */}
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              zIndex: 10,
            }}
          >
            <HamburgerButton onClick={toggleSidebar} />
          </Box>

          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

          {/* Main Content */}
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
