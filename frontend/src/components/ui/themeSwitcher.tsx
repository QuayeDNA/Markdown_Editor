// src/components/ThemeSwitch.tsx
import LightModeIcon from "../../assets/icon-light-mode.svg";
import DarkModeIcon from "../../assets/icon-dark-mode.svg";
import "./styles/themeSwitcher.css";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/themeSlice';

interface ThemeSwitchProps {
  
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={LightModeIcon}
        alt="Light mode icon"
        className={`transition-colors duration-200 ${isDarkMode ? "" : "filter brightness-0 invert"}`}
      />
      <label className="switch" htmlFor="themeSwitch">
        <input
          id="themeSwitch"
          type="checkbox"
          checked={isDarkMode}
          onChange={handleThemeChange}
        />
        <span className="slider round"></span>
      </label>
      <img
        src={DarkModeIcon}
        alt="Dark mode icon"
        className={`transition-colors duration-200 ${isDarkMode ? "filter brightness-0 invert" : ""}`}
      />
    </div>
  );
};

export default ThemeSwitch;