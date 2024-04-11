import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./components/utils/themes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

interface AppProps {
  // Define any props if needed
}

const App: React.FC<AppProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Set the state type to boolean
  const [theme, setTheme] = useState<string>("light");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
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
            <div className="flex-1">
              <Editor content={content} onContentChange={handleContentChange} />
            </div>
            <div className="flex-1">
              <Preview content={content} />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
