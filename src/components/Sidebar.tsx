import DocumentButton from './ui/button';
import ThemeSwitch from './ui/ThemeSwitch';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <aside className={`bg-gray-800 text-white w-64 fixed h-screen p-4 transition-transform duration-200 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-64'}`}>
            <div className="flex flex-col h-full justify-between">
                <div>
                    <h4 className="mb-4">MY DOCUMENTS</h4>
                    <button className="flex items-center justify-center space-x-4 bg-orange-700 text-white w-full p-4 rounded-md hover:bg-orange-600">+ New Document</button>
                    <DocumentButton date="2022-01-01" name="Document 1" />
                    <DocumentButton date="2022-01-02" name="Document 2" />
                    <DocumentButton date="2022-01-03" name="Document 3" />
                </div>
                <div className="mt-auto">
                    <ThemeSwitch />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
