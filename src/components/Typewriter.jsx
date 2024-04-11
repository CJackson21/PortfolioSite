import React, { useEffect, useState } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const speed = 30; // Typing speed in milliseconds

    const typeWriter = () => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((show) => !show);
    }, 500);

    return () => clearInterval(cursorInterval); // Cleanup on component unmount
  }, [text]);

  return (
    <div className="typing-effect">
      <center><span>{displayedText}</span><span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span></center>
    </div>
  );
  
};

export default TypingEffect;
