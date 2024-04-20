import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSidebar } from '../redux/sidebarSlice';
import Modal from "./ui/modal";
import DocumentIcon from "../assets/icon-document.svg";
import MenuIcon from "../assets/icon-menu.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import SaveIcon from "../assets/icon-save.svg";
import CloseIcon from "../assets/icon-close.svg";

import { updateDocumentContent, updateDocumentName } from '../redux/documentSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const selectedDocument = useSelector((state: RootState) => state.document.selectedDocument);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState(selectedDocument ? selectedDocument.name : '');

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedDocument) {
      // Dispatch action to update document content in Redux store
      dispatch(updateDocumentContent({ id: selectedDocument.id, content: selectedDocument.content }));
      // Save the updated document content to localStorage
      localStorage.setItem(selectedDocument.id, selectedDocument.content);
    }
  };

  const handleDocumentNameClick = () => {
    setIsEditingName(true);
    setNewDocumentName(selectedDocument ? selectedDocument.name : '');
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocumentName(e.target.value);
  };

  const handleDocumentNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
      if (selectedDocument) {
        // Update the document name in Redux store
        dispatch(updateDocumentName({ id: selectedDocument.id, name: newDocumentName }));
        // Save the updated document name to localStorage
        // Assuming you have a function updateDocumentName in documentSlice
        localStorage.setItem(selectedDocument.id, newDocumentName);
      }
    }
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
            {isEditingName ? (
              <input
                type="text"
                value={newDocumentName}
                onChange={handleDocumentNameChange}
                onKeyDown={handleDocumentNameKeyDown}
                autoFocus
                className="w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-white pb-1 text-light"
      style={{ caretColor: "orange" }}
              />
            ) : (
              <button className="text-light font-roboto" onClick={handleDocumentNameClick}>
                {selectedDocument ? selectedDocument.name : 'No document selected'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <button className="mr-2" onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete icon" className="mx-2" />
        </button>
        <button
          className="flex flex-row items-center m-4 p-4 bg-orange rounded-md hover:bg-orange-light transition duration-200"
          onClick={handleSaveChanges}
        >
          <img src={SaveIcon} alt="Save icon" className="h-4 w-auto me-2" />
          <span className="text-light text-md hidden md:block">Save Changes</span>
        </button>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Navbar;