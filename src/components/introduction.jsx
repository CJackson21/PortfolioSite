// introduction.jsx
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { LightModeContext } from './ToggleTheme';
import TypingEffect from './Typewriter';
import '../index.css'; 

const typingText = "I am currently a Senior studying Computer Science.\nFeel free to take a look around at some of my work.";

function MainPage() { 
    const { lightMode } = useContext(LightModeContext); // Use the lightMode state
    const aboutMeStyle = {
        WebkitTextStrokeColor: lightMode ? '#000' : '#fff'
    
    };
    return (
        <div id="Container">
            <div className="mainWrapper">
                <div id="introduction">
                    <p>
                        <span className="aboutMe" style={aboutMeStyle}>Hey there, I'm<br/></span>
                        <span id="name">Caleb Jackson</span>
                        <span className="aboutMe" id="notName" style={aboutMeStyle}><br/>Full Stack Developer</span>
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
            <div className="bubbles">
                <span style={{ '--i': 11 }}></span>
                <span style={{ '--i': 12 }}></span>
                <span style={{ '--i': 24 }}></span>
                <span style={{ '--i': 10 }}></span>
                <span style={{ '--i': 14 }}></span>
                <span style={{ '--i': 23 }}></span>
                <span style={{ '--i': 18 }}></span>
                <span style={{ '--i': 16 }}></span>
                <span style={{ '--i': 19 }}></span>
                <span style={{ '--i': 20 }}></span>
                <span style={{ '--i': 22 }}></span>
                <span style={{ '--i': 25 }}></span>
                <span style={{ '--i': 18 }}></span>
                <span style={{ '--i': 21 }}></span>
                <span style={{ '--i': 15 }}></span>
                <span style={{ '--i': 13 }}></span>
                <span style={{ '--i': 26 }}></span>
                <span style={{ '--i': 17 }}></span>
                <span style={{ '--i': 13 }}></span>
                <span style={{ '--i': 28 }}></span>
            </div>
        </div>
    );
}

export default MainPage;
