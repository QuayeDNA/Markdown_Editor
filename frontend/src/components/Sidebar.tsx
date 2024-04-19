import DocumentIcon from "../assets/icon-document.svg";
import ThemeSwitch from "./ui/themeSwitcher";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";

import {
  createDocument,
  selectDocuments,
  loadDocuments,
  setCurrentDocument,
} from "../redux/documentSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const documents = useSelector(selectDocuments);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const currentDocument = useSelector((state: RootState) => state.document.currentDocument);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      dispatch(toggleSidebar());
    }
  };
  useEffect(() => {
    dispatch(loadDocuments());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <aside
      ref={sidebarRef}
      className={`flex flex-col justify-between w-64 bg-dark-2 fixed h-screen p-6 transition-transform duration-200 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-64"
      }`}>
      <h1 className="mb-6 text-light text-md font-roboto font-bold tracking-extra-wide lg:hidden">
        MARKDOWN
      </h1>
      <h2 className="text-lg font-roboto font-light text-grey-1 mb-6">
        MY DOCUMENTS
      </h2>
      <button
        className="mb-6 bg-orange hover:bg-orange-light transition duration-200 p-4 rounded-lg text-light font-roboto text-lg"
        onClick={() => {
          dispatch(createDocument());
          console.log("A new document has been created");
        }}>
        + New Document
      </button>
      {documents.map((doc) => (
        <button
          key={doc.id}
          className="flex items-center mb-6"
          onClick={() => dispatch(setCurrentDocument(doc.id as never))}
        >
          <img
            src={DocumentIcon}
            alt="Document icon"
            className="mr-4 w-4 h-auto"
          />
          <div className="text-left">
            <span className="text-md font-roboto text-grey-1">
              {new Date(doc.createdAt).toLocaleDateString()}
            </span>
            <h3 className={`text-md hover:text-orange transition duration-200 ${currentDocument && currentDocument.id === doc.id ? 'text-orange-light' : 'text-light'}`}>
              {doc.name}
            </h3>
          </div>
        </button>
      ))}
      <div className="mt-auto flex items-center">
        <ThemeSwitch />
      </div>
    </aside>
  );
};

export default Sidebar;
