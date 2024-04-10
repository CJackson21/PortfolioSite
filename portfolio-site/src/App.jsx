import React from 'react';
import TypingEffect from './Typewriter';
import './App.css';

function App() {
  const aboutText = "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";

  return (
    <>
      {/* This is where the typing effect will occur */}
      <TypingEffect text={aboutText} />
      {/* Any other content you want to include below the typing effect */}
      {/* ... */}
    </>
  );
}

export default App;
