import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


interface EditorProps {
  setMarkdown: (markdown: string) => void;
  markdown: string;
}

const Editor: React.FC<EditorProps> = ({ setMarkdown }) => {
  const [markdown, setMarkdownLocal] = useState('# Hello world');
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdownLocal(newMarkdown);
    setMarkdown(newMarkdown);
  };
  

  return (
    <div className="flex h-full overflow-y-auto">
      <textarea
         className={`font-roboto-mono  transition duration-300 flex-1 py-8 px-4 focus:outline-none  ${isDarkMode ? 'bg-dark-1 text-light-4' : 'bg-light text-grey-3'}`}
        value={markdown}
        onChange={handleMarkdownChange}
      />
    </div>
  );
};

export default Editor;