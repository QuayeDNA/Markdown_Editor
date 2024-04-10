import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative h-screen flex overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`flex flex-col w-full transition-transform duration-200 ease-in-out ${sidebarOpen ? 'transform translate-x-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-4 overflow-auto">Main Content</main>
      </div>
    </div>
  );
};

export default App;