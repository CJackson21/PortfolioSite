import React from 'react';
import TypingEffect from './Typewriter';
import './App.css';

function App() {
  const aboutText = "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";

  return (
    <>
      <TypingEffect text={aboutText} />
    </>
  );
}

export default App;
