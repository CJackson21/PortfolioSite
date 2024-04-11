// Home.jsx
import React from 'react';
import TypingEffect from './Typewriter';
import MainPage from './introduction';

function Home() {
  const aboutText = "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";

  return (
    <>
        <MainPage />
        <TypingEffect text={aboutText} />
    </>
  );
}

export default Home;
