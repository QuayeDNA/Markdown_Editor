// src/components/Header.tsx

import MenuIcon from "../assets/icon-menu.svg"; // Import the SVG icon
import DeleteIcon from "../assets/icon-delete.svg"; // Import the SVG icon
import SaveIcon from "../assets/icon-save.svg"; // Import the SVG icon

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 text-white h-20">
      <div className="flex items-center space-x-4">
        <button className="bg-gray-700 h-20 w-20 flex items-center justify-center">
          <img src={MenuIcon} alt="Menu" />
        </button>
        <h3 className="border-r border-white pr-4 flex items-center h-10">
          MARKDOWN
        </h3>
        <div>Document.md</div>
      </div>
      <div className="flex items-center space-x-4 p-2">
        <button className="p-2">
          <img src={DeleteIcon} alt="Delete" />
        </button>
        <div className="flex items-center">
          <button className="flex items-center bg-orange-700 px-4 py-2 rounded-md hover:bg-orange-600">
            <img src={SaveIcon} alt="Save" className="pr-2" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
