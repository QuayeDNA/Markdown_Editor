import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";
import Modal from "./ui/modal";
import DocumentIcon from "../assets/icon-document.svg";
import MenuIcon from "../assets/icon-menu.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import SaveIcon from "../assets/icon-save.svg";
import CloseIcon from "../assets/icon-close.svg";
import DownloadIcon from "../assets/icon-download.svg";

import {
  updateDocumentContent,
  updateDocumentName,
} from "../redux/documentSlice";
import { addMessage } from "../redux/messageSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const selectedDocument = useSelector(
    (state: RootState) => state.document.selectedDocument
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState(
    selectedDocument ? selectedDocument.name : ""
  );

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedDocument) {
      // Dispatch action to update document content in Redux store
      dispatch(
        updateDocumentContent({
          id: selectedDocument.id,
          content: selectedDocument.content,
        })
      );
      // Save the updated document content to localStorage
      localStorage.setItem(selectedDocument.id, selectedDocument.content);
      dispatch(addMessage("Document saved"));
    }
  };

  const handleDocumentNameClick = () => {
    if (selectedDocument) {
      setIsEditingName(true);
      setNewDocumentName(selectedDocument.name);
    }
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocumentName(e.target.value);
  };

  const handleDocumentNameKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setIsEditingName(false);
      if (selectedDocument) {
        // Update the document name in Redux store
        dispatch(
          updateDocumentName({
            id: selectedDocument.id,
            name: newDocumentName,
          })
        );
        // Save the updated document name to localStorage
        // Assuming you have a function updateDocumentName in documentSlice
        localStorage.setItem(selectedDocument.id, newDocumentName);
      }
    }
  };

  const handleDownload = () => {
    if (selectedDocument) {
      const fileName = `${selectedDocument.name}.md`;
      const blob = new Blob([selectedDocument.content], {
        type: "text/markdown",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <header className="flex justify-between items-center bg-dark-3 top-0 left-0 right-0 h-16 sticky z-10">
      <div className="flex items-center">
        <button
          className="close-button bg-grey-3 p-2 md:p-4 hover:bg-grey-2 transition duration-200 h-full min-h-16 mr-2"
          onClick={() => {
            dispatch(toggleSidebar());
          }}>
          <img
            src={isOpen ? CloseIcon : MenuIcon}
            alt="Menu"
            className="close-button"
          />
        </button>

        <h1 className="m-4 text-light text-md font-roboto font-bold tracking-extra-wide hidden lg:block">
          MARKDOWN
        </h1>
        <div className="border-l-2 h-10 mr-2 md:mr-4  border-grey-2 hidden lg:block"></div>
        <div className="flex flex-row items-center">
          <img src={DocumentIcon} alt="Document icon" className=" m-2 md:m-4" />
          <div className="ml-2">
            <span className="text-sm font-roboto font-light text-grey-1 hidden sm:block">
              Document Name
            </span>
            {selectedDocument ? (
              isEditingName ? (
                <input
                  type="text"
                  value={newDocumentName}
                  onChange={handleDocumentNameChange}
                  onKeyDown={handleDocumentNameKeyDown}
                  autoFocus
                  className="w-3/5 md:w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-white pb-1 text-light"
                  style={{ caretColor: "orange" }}
                />
              ) : (
                <button
                  className="text-light font-roboto"
                  onClick={handleDocumentNameClick}>
                  {selectedDocument.name}
                </button>
              )
            ) : (
              <span className="text-light font-roboto">
                No document selected
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        {selectedDocument && (
          <button
            className="flex flex-row items-center mr-2 md:mr-6"
            onClick={handleDownload}>
            <img
              src={DownloadIcon}
              alt="Download Icon"
              className="h-auto w-7"
            />
          </button>
        )}
        <button
          className="flex flex-row items-center mr-4 md:mr-8"
          onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete icon" className="h-auto w-5" />
        </button>
        <button
          className="flex flex-row items-center mr-2 p-3 bg-orange rounded-md hover:bg-orange-light transition duration-200"
          onClick={handleSaveChanges}>
          <img src={SaveIcon} alt="Save icon" className="h-auto w-5 md:me-2" />
          <span className="text-light text-md hidden md:block">
            Save Changes
          </span>
        </button>
      </div>
      {isModalOpen && (
        <Modal
          documentId={selectedDocument?.id as string}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
