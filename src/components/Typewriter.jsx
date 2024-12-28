import React from "react";
import "./TypingEffect.css";
import PropTypes from "prop-types";

const TypingEffect = () => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    const text =
      "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";
    let i = 0;
    const speed = 30; // Typing speed in milliseconds

    const typeWriter = () => {
      // eslint-disable-next-line react/prop-types
      if (i < text.length) {
        // eslint-disable-next-line react/prop-types
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
  }, []);

  return (
    <div className='typing-effect'>
      <center>
        <span>{displayedText}</span>
        <span className={`cursor ${showCursor ? "visible" : ""}`}>|</span>
      </center>
    </div>
  );
};

export default TypingEffect;

TypingEffect.propTypes = {
  text: PropTypes.string.isRequired,
};
