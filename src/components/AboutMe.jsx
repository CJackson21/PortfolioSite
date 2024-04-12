import React from 'react';
import './AboutMe.css';

export default function AboutMe() {
    return (
        <div className="about-container">
            <div className="aboutMe" id="aboutText">About Me</div>
            <div id="about-paragraph">
                <p id="about-description">
                    I am studying Computer Science at George Fox University with a concentration in cybersecurity.
                    Throughout my childhood I had a very high interest in problem solving and discovering the inner 
                    workings of hardware and software. This interest sparked my passion for software and web development.
                    Currently, the languages I prefer to work with include Python, Java, JavaScript, HTML, CSS, and C++, but
                    I am also very open to working with other languages. Some of my favorite personal projects include web 
                    scraping for for a web automator and working with Spotify's funky API to create a Discord bot that plays 
                    music for the user in a voice call. I also love to play basketball, lift weights, play video games, and 
                    get outside as often as possible.
                </p>
            </div>
            <div className="information" id="info">
                <a href="/">Back</a>
            </div>
        </div>
        
    );
}