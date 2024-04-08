import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import TypingEffect from './Typewriter';
import './App.css';

function App() {
  return (
    <div>
      <h1>Hey there, my name is Caleb Jackson</h1>
      {/* Use TypingEffect where you want the typing effect to appear */}
      <TypingEffect text="I am currently a Junior studying Computer Science with a concentration in Cybersecurity at George Fox University." />
      {/* Other components or content */}
    </div>
  );
}

export default App;
