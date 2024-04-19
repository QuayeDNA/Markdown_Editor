import React, { useState, useEffect } from 'react';


interface EditorProps {
  setDocumentContent: React.Dispatch<React.SetStateAction<string>>;
}
const Editor: React.FC<EditorProps> = ({ setDocumentContent }) => {

  const [content, setContent] = useState('');
  useEffect(() => {
    setDocumentContent(content);
  }, [content, setDocumentContent]);
 

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex h-full overflow-y-auto">
      <textarea
        className="font-roboto-mono transition duration-300 flex-1 py-8 px-4 focus:outline-none bg-light text-grey-3"
        value={content}
        onChange={handleMarkdownChange}
        placeholder='Enter your markdown here...'
      />
    </div>
  );
};

export default Editor;
