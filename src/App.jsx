// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import MainPage from "./components/introduction";
import { LightModeProvider } from "./contexts/ToggleThemeContext";
import LightSwitch from "./components/LightSwitch"; // Ensure the component is properly imported
import ThemeApplier from "./components/Container";
import "./App.css";

function App() {
  return (
    <Router>
      <LightModeProvider>
        <div className='App'>
          <ThemeApplier /> {/* Ensures the body class is updated */}
          <LightSwitch /> {/* Allows the user to toggle the theme */}
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/about' element={<AboutMe />} />
          </Routes>
        </div>
      </LightModeProvider>
    </Router>
  );
}

export default App;
