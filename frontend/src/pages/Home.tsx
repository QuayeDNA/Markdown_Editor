// src/pages/Home.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePreview } from "../redux/previewSlice";
import { RootState } from "../redux/store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import ShowPreviewIcon from "../assets/icon-show-preview.svg";
import HidePreviewIcon from "../assets/icon-hide-preview.svg";

import Editor from "../components/Editor";
import Preview from "../components/Preview";

const Home: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const isPreviewExpanded = useSelector(
    (state: RootState) => state.preview.isPreviewExpanded
  );
 const [documentContent, setDocumentContent] = useState('');

  const handlePreviewClick = () => {
    console.log("Preview button clicked");
    dispatch(togglePreview());
  };

  console.log("isPreviewExpanded:", isPreviewExpanded);

  return (
    <div
      className={`transition duration-300 relative max-h-screen h-screen flex overflow-hidden ${
        isDarkMode ? "bg-dark-1" : "bg-light"
      }`}>
      <Sidebar />
      <div
        className={`flex flex-col w-full transition-transform duration-200 ease-in-out ${
          isOpen ? "transform translate-x-64" : ""
        }`}>
        <Navbar />

        <main className="flex-grow flex">
          <div
            className={`flex-1 flex flex-col w-full overflow-hidden ${
              isPreviewExpanded ? "hidden" : "lg:flex"
            }`}>
            <header
              className={`transition duration-300 flex items-center justify-between h-12 px-4 ${
                isDarkMode ? "bg-dark-2 text-light-4" : "bg-light-2 text-grey-1"
              }`}>
              <span className="font-roboto font-light">MARKDOWN</span>
              <button onClick={handlePreviewClick} className="w-4 lg:hidden">
                <img
                  src={isPreviewExpanded ? HidePreviewIcon : ShowPreviewIcon}
                  alt="Preview Icon"
                />
              </button>
            </header>
            <div className="w-full overflow-y-auto" style={{ height: 'calc(100vh - 128px)' }}>
            <Editor setDocumentContent={setDocumentContent} />
</div>
          </div>
          <div
            className={`border-l-2 h-full ${
              isDarkMode ? "border-dark-3" : "border-light-3"
            } hidden lg:block`}></div>
          <div
            className={`flex-1 flex flex-col w-full transition-width duration-300 ${
              isPreviewExpanded ? "w-full" : "w-0 hidden lg:flex"
            }`}>
            <header
              className={`transition duration-300 flex items-center justify-between h-12 px-4 ${
                isDarkMode ? "bg-dark-2 text-light-4" : "bg-light-2 text-grey-1"
              }`}>
              <span className="font-roboto font-light">Preview</span>
              <button onClick={handlePreviewClick} className="w-4">
                <img
                  src={isPreviewExpanded ? HidePreviewIcon : ShowPreviewIcon}
                  alt="Preview Icon"
                />
              </button>
            </header>
            <div className="w-full overflow-y-auto" style={{ height: 'calc(100vh - 128px)' }}>
              <Preview content={documentContent} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
