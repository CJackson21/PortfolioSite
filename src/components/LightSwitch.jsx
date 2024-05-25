import React from "react";
import { LightModeContext } from "../contexts/ToggleThemeContext";

function LightSwitch() {
  const { lightMode, toggleLightMode } = React.useContext(LightModeContext);

  const handleClick = () => {
    toggleLightMode();
  };

  return (
    <div className='Lightswitch'>
      <img
        src={lightMode ? "/img/lightswitch-off.png" : "/img/lightswitch-on.png"}
        alt='Toggle Light Mode'
        onClick={handleClick}
      />
    </div>
  );
}

export default LightSwitch;
