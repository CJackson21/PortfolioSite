// TypingEffect.js or TypingEffect.jsx
import React, { useEffect, useState } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const speed = 100; // Typing speed in milliseconds

    function typeWriter() {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          setTimeout(typeWriter, speed);
        }
      }

    typeWriter();

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((show) => !show);
    }, 500);

    return () => clearInterval(cursorInterval); // Cleanup interval on component unmount
  }, [text]);

  return (
    <div className="typing-effect">
      {displayedText}
      <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
    </div>
  );
};

export default TypingEffect;


