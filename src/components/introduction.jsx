// introduction.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import TypingEffect from './Typewriter'; // Adjust the import path as necessary
import '../index.css'; 

const typingText = "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";

function MainPage() { // Accept typingText as a prop
    return (
        <div>
            <div className="mainWrapper">
                <div id="introduction">
                    <p>
                        <span className="aboutMe">Hey there, I'm<br/></span>
                        <span id="name">Caleb Jackson</span>
                        <span className="aboutMe" id="notName"><br/>Full Stack Developer</span>
                    </p>
                    {/* Render TypingEffect here */}
                
                </div>
                <div id="about"><TypingEffect text={typingText} /></div>
            </div>
            <div className="information">
                <a href="https://github.com/CJackson21">GitHub</a>
                <a href="/CalebJackson_SoftwareEngineer.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                <a href="https://www.linkedin.com/in/caleb-jackson-b08660264">LinkedIn</a>
                <Link to="/about">About Me</Link>
            </div>
        </div>
    );
}

export default MainPage;
