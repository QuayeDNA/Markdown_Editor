import React, { useState, useEffect } from "react";
import ShowPreviewIcon from "../../assets/icon-show-preview.svg";
import { useTheme } from "styled-components";

interface HeaderProps {
  onPreviewIconClick: () => void;
  headerName: string;
  calledFrom: 'Editor' | 'Preview';
}

const Header: React.FC<HeaderProps> = ({ onPreviewIconClick, headerName, calledFrom }) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className="w-full h-12 flex items-center justify-between p-4 sticky top-0"
      style={{ backgroundColor: theme.headerBg, color: theme.headerText, transition: "all 0.3s linear"}}
    >
      <div>{headerName}</div>
      <button className="p-2" onClick={onPreviewIconClick} style={{ visibility: (calledFrom === 'Editor' && !isMobile) ? 'hidden' : 'visible' }}>
        <img src={ShowPreviewIcon} alt="Show Preview" />
      </button>
    </header>
  );
};

export default Header;
