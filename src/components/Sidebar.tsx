import DocumentButton from './ui/button';
import ThemeSwitch from './ui/ThemeSwitch';

import "./css/Sidebar.css"

const Sidebar = ({ isOpen, toggleTheme }: { isOpen: boolean; toggleTheme: () => void }) => {
  return (
    <aside className={` w-64 fixed h-screen px-4 pb-4  transition-transform duration-200 ease-in-out ${isOpen? 'transform translate-x-0' : 'transform -translate-x-64'}`} style={{backgroundColor:"#1D1F22"}}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="my-8 text-gray-400 text-sm">MY DOCUMENTS</div>
          <button className=" new-document flex items-center justify-center space-x-4 text-white w-full p-4 rounded-md">+ New Document</button>
          <DocumentButton date="2022-01-01" name="Document 1" />
          <DocumentButton date="2022-01-02" name="Document 2" />
          <DocumentButton date="2022-01-03" name="Document 3" />
        </div>
        <div className="mt-auto">
          <ThemeSwitch toggleTheme={toggleTheme} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;