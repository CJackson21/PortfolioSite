import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMe from './components/AboutMe';
import Home from './components/Home'; // Import the new Home component
import MainPage from './components/introduction';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutMe />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
