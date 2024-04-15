import { useRef } from 'react';
import useOnClickOutside from './sub/useOnClickOutside';
import DocumentList from './sub/DocumentsList';
import ThemeSwitch from './ui/ThemeSwitch';
import "./css/Sidebar.css"

import SaveButton from './ui/saveButton';

const Sidebar = ({ isOpen, toggleTheme, toggleSidebar }: { isOpen: boolean; toggleTheme: () => void, toggleSidebar: () => void }) => {
  const ref = useRef<HTMLDivElement>(null); // Explicitly specify the type of ref

  useOnClickOutside(ref, () => {
    if (isOpen) {
      toggleSidebar();
    }
  });

  return (
    <aside ref={ref} className={`w-64 fixed h-screen px-4 pb-4 transition-transform duration-200 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-64'}`} style={{ backgroundColor: "#1D1F22" }}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="my-8 text-gray-400 text-sm">MY DOCUMENTS</div>
         <SaveButton />
          <DocumentList />
        </div>
        <div className="mt-auto">
          <ThemeSwitch toggleTheme={toggleTheme} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
