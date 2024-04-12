import { useTheme } from "styled-components";
import React, { ChangeEvent } from "react";

interface EditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  const theme = useTheme();

  return (
    <div
    className="h-full border-r border-white"
    style={{ backgroundColor: theme.body, color: theme.text }}
  >
      <header
        className="w-full h-12 flex items-center p-4 sticky top-0"
        style={{ backgroundColor: theme.headerBg, color: theme.headerText }}
      >
        Markdown
      </header>
      <textarea
        className="flex-grow p-4 resize-none focus:outline-none w-full h-full pt-4"
        value={content}
        onChange={handleChange}
        placeholder="Write your Markdown here..."
        style={{ backgroundColor: theme.body, color: theme.text }}
      />
    </div>
  );
};

export default Editor;