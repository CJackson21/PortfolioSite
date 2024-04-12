import React, { useContext } from 'react';
import { LightModeContext } from './ToggleTheme';

function LightSwitch() {
    const { lightMode, toggleLightMode } = useContext(LightModeContext);

    const handleClick = () => {
        toggleLightMode();
    };

    return (
        <div className="Lightswitch">
            <img src={lightMode ? '/img/lightswitch-off.png' : '/img/lightswitch-on.png'}
                 alt='Toggle Light Mode'
                 onClick={handleClick} />
        </div>
    );
}

export default LightSwitch;
