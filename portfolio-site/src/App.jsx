import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import TypingEffect from './Typewriter';
import './App.css';

function App() {
  useEffect(() => {
    const introElement = document.getElementById('introduction');
    const aboutElement = document.getElementById('about');

    if (introElement) {
      ReactDOM.createPortal(
        <h1>Hey there, my name is Caleb Jackson</h1>,
        introElement
      );
    }

    if (aboutElement) {
      ReactDOM.createPortal(
        <TypingEffect text="I am currently a Junior studying Computer Science with a concentration in Cybersecurity at George Fox University." />,
        aboutElement
      );
    }
  }, []);

  return null; // Since we're directly manipulating elements outside React's root, this component doesn't need to render anything itself.
}

export default App;

