import { useTheme } from 'styled-components';
import React, { ChangeEvent } from 'react';

interface EditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };{
  const theme = useTheme();

 

  
  return (
    <div className=' h-full border-r border-white'>
    <header className="w-full fixed h-12 flex items-center p-4 " style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
      Markdown
    </header>
    <textarea
        className="flex-grow bg-gray-100 p-4 resize-none border rounded-lg focus:outline-none w-full h-full"
        value={content}
        onChange={handleChange}
        placeholder="Write your Markdown here..."
      />
    </div>
  );
}
};

export default Editor;
