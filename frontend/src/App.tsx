import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./components/utils/themes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor"; // Add missing import
import Preview from "./components/Preview"; // Add missing import

import "./App.css";

interface AppProps {
  // Define any props if needed
}

const App: React.FC<AppProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
const [previewActive, setPreviewActive] = useState(false);

const togglePreview = () => {
  setPreviewActive(!previewActive);
};

  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="relative h-screen flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          toggleTheme={toggleTheme}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`flex flex-col w-full transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "transform translate-x-64" : ""
          }`}>
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          {/*/////////////////////////////////////////////////////////////////////*/}
      <main className="main-container">
  <div className={`editor-container ${previewActive ? 'translate-x-negative' : ''}`}>
    <Editor
      content={content}
      onContentChange={handleContentChange}
      onPreviewIconClick={togglePreview}
    />
  </div>
  <div className={`preview-container ${previewActive ? 'translate-x-zero' : ''}`}>
    <Preview content={content} onPreviewIconClick={togglePreview} />
  </div>
</main>

          {/*/////////////////////////////////////////////////////////////////////*/}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
