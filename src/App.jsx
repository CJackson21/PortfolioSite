import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import Home from "./components/Home";
import ThemeProviderWrapper from "./hooks/ThemeProviderWrapper"; // Wraps app with MUI theme
import ThemeSwitcher from "./components/ThemeSwitcher"; // Toggles light/dark theme
import "./App.css";

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <div className='App'>
          {/* Allows the user to toggle the theme */}
          <ThemeSwitcher />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutMe />} />
          </Routes>
        </div>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
