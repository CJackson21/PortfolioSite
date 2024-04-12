import React, { createContext, useState, useEffect } from 'react';

const LightModeContext = createContext();

function LightModeProvider(props) {
    const [lightMode, setLightMode] = useState(() => {
        const savedMode = localStorage.getItem('lightMode');
        return savedMode === null ? false : JSON.parse(savedMode);
    });

    const toggleLightMode = () => {
        setLightMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('lightMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        document.body.className = lightMode ? 'light-mode' : 'dark-mode';
    }, [lightMode]);

    return (
        <LightModeContext.Provider value={{ lightMode, toggleLightMode }}>
            {props.children}
        </LightModeContext.Provider>
    );
}

export { LightModeContext, LightModeProvider };
