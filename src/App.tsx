import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./components/utils/themes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="relative h-screen flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleTheme={toggleTheme} />
        <div
          className={`flex flex-col w-full transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "transform translate-x-64" : ""
          }`}>
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className="flex-1 flex overflow-auto">
            <div className="flex-1 overflow-auto">
              <Editor />
            </div>
            <div className="flex-1 overflow-auto">
              <Preview />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
