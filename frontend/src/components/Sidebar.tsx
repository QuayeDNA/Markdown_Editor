import DocumentIcon from "../assets/icon-document.svg";
import ThemeSwitch from "./ui/themeSwitcher";

import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";

import { createDocument, selectDocument } from '../redux/documentSlice';
import { addMessage } from '../redux/documentActions';


const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const documents = useSelector((state: RootState) => state.document.documents);

  const handleNewDocumentClick = () => {
    // Dispatch action to create a new document
    dispatch(createDocument());
    // Dispatch action to add message
    dispatch(addMessage('New document created'));
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains('close-button')
    ) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, sidebarRef]);
  
  
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
  
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };}, [handleClickOutside, isOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`flex flex-col justify-between w-[250px] bg-dark-2 fixed h-screen p-6 transition-transform duration-200 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-[250px]"
      }`}
    >
      <h1 className="mb-6 text-light text-md font-roboto font-bold tracking-extra-wide lg:hidden">
        MARKDOWN
      </h1>
      <h2 className="text-lg font-roboto font-light text-grey-1 mb-6">
        MY DOCUMENTS
      </h2>
      <button
        className="mb-6 bg-orange hover:bg-orange-light transition duration-200 p-3 rounded-lg text-light font-roboto text-lg"
        onClick={handleNewDocumentClick}
      >
        + New Document
      </button>
      <div className="overflow-y-auto max-h-[calc(100vh-252px)]"> {/* Adjust max height as needed */}
        {documents.map((document) => {
          const date = new Date(document.createdAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

          return (
            <button className="flex items-center mb-6" key={document.id} onClick={() => dispatch(selectDocument(document.id))}>
              <img src={DocumentIcon} alt="Document icon" className="mr-4 w-4 h-auto" />
              <div className="text-left">
                <span className="text-md font-roboto text-grey-1">{formattedDate}</span>
                <h3 className="text-md text-light hover:text-orange transition duration-200">{document.name}</h3>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-auto flex items-center">
        <ThemeSwitch />
      </div>
    </aside>
  );
};

export default Sidebar;
