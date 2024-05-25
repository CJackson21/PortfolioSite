import React from "react";
import PropTypes from "prop-types";

const LightModeContext = React.createContext();

function LightModeProvider({ children }) {
  const [lightMode, setLightMode] = React.useState(() => {
    const savedMode = localStorage.getItem("lightMode");
    return savedMode === null ? false : JSON.parse(savedMode);
  });

  const toggleLightMode = () => {
    setLightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("lightMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  React.useEffect(() => {
    document.body.className = lightMode ? "light-mode" : "dark-mode";
  }, [lightMode]);

  const value = React.useMemo(
    () => ({
      lightMode,
      toggleLightMode,
    }),
    [lightMode]
  );

  return (
    <LightModeContext.Provider value={value}>
      {children}
    </LightModeContext.Provider>
  );
}

export { LightModeContext, LightModeProvider };

LightModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
