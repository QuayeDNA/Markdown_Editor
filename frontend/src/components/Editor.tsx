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
    <div className="h-full border-r border-white">
      <header
        className="w-full h-12 flex items-center p-4 sticky top-0" // Changed position to sticky
        style={{ backgroundColor: theme.headerBg, color: theme.headerText }}
      >
        Markdown
      </header>
      <textarea
        className="flex-grow p-4 resize-none border focus:outline-none w-full h-full pt-16"
        value={content}
        onChange={handleChange}
        placeholder="Write your Markdown here..."
      />
    </div>
  );
};

export default Editor;