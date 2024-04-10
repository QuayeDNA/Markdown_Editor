// src/components/Header.tsx

import MenuIcon from "../assets/icon-menu.svg"; // Import the SVG icon
import DeleteIcon from "../assets/icon-delete.svg"; // Import the SVG icon
import SaveIcon from "../assets/icon-save.svg"; // Import the SVG icon
import CloseIcon from "../assets/icon-close.svg"; // Import the SVG icon
import "./css/Header.css"



const Header = ({ toggleSidebar, sidebarOpen }: { toggleSidebar: () => void, sidebarOpen: boolean }) => {

  
  return (
    <header className="flex items-center justify-between text-white h-20" style={{ backgroundColor: '#2B2D31' }}>
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="menu-button h-20 w-20 flex items-center justify-center">
          <img src={sidebarOpen ? CloseIcon : MenuIcon} alt="Menu" />
        </button>
        <div className="md:inline hidden">
          <h3 className="border-r border-white pr-4 flex items-center h-10 text-white">
            MARKDOWN
          </h3>
        </div>
        <div>Document.md</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2">
          <img src={DeleteIcon} alt="Delete" />
        </button>
        <div className="flex items-center p-2">
          <button className="save-button flex items-center px-5 py-4 rounded-md">
            <img src={SaveIcon} alt="Save" />
            <span className="pl-2 md:inline hidden text-lg">Save Changes</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
