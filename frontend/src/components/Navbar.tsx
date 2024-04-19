import { useState } from "react";
import MenuIcon from "../assets/icon-menu.svg";
import DocumentIcon from "../assets/icon-document.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import SaveIcon from "../assets/icon-save.svg";
import CloseIcon from "../assets/icon-close.svg";

// src/components/Navbar.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSidebar } from '../redux/sidebarSlice';

import Modal from "./ui/modal";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);


  const handleSave = () => {
    console.log("Save button clicked");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="flex justify-between items-center bg-dark-3 top-0 left-0 right-0 h-20 sticky z-10">
      <div className="flex items-center">
      <button className="mr-2 bg-grey-3 p-6 hover:bg-grey-2 transition duration-200 h-full min-h-20" onClick={() => dispatch(toggleSidebar())}>
          <img src={isOpen ? CloseIcon : MenuIcon} alt="Menu" />
        </button>
        <h1 className="m-4 text-light text-md font-roboto font-bold tracking-extra-wide hidden lg:block">
  MARKDOWN
</h1>

        <div className="border-l-2 h-14 mx-4 border-grey-2 hidden lg:block"></div>
        <div className="flex flex-row items-center">
          <img src={DocumentIcon} alt="Document icon" className="m-4" />
          <div className="ml-2">
            <span className="text-sm font-roboto font-light text-grey-1 hidden sm:block">
              Document Name
            </span>
            <div className="text-light font-roboto">Document.md</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <button className="mr-2" onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete icon" className="mx-2" />
        </button>
        <button
          className="flex flex-row items-center m-4 p-4 bg-orange rounded-md hover:bg-orange-light transition duration-200"
          onClick={handleSave}>
          <img src={SaveIcon} alt="Save icon" className="h-4 w-auto me-2" />
          <span className="text-light text-md hidden md:block">Save Changes</span>
        </button>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Navbar;
