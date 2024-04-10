// src/components/ThemeSwitch.tsx
import { useState } from 'react';
import LightModeIcon from '../../assets/icon-light-mode.svg'; // Import the SVG icon
import DarkModeIcon from '../../assets/icon-dark-mode.svg'; // Import the SVG icon
import "./ThemeSwitch.css";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={LightModeIcon}
        alt="Light mode icon"
        className={isDarkMode ? '' : 'filter brightness-0 invert'}
      />
      <label className="switch" htmlFor="themeSwitch">
        <input id="themeSwitch" type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <img
        src={DarkModeIcon}
        alt="Dark mode icon"
        className={isDarkMode ? 'filter brightness-0 invert' : ''}
      />
    </div>
  );
};


export default ThemeSwitch;