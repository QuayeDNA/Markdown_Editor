import { useTheme } from "styled-components";
import React, { ChangeEvent } from "react";
import Header from "./sub/headerComponent";

interface EditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
  onPreviewIconClick: () => void;
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange,onPreviewIconClick }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  const theme = useTheme();

  return (
    <div className="border-r-2 border-gray-400 flex flex-col h-full" style={{ backgroundColor: theme.body, color: theme.text }}>
    <Header headerName="Editor" onPreviewIconClick={onPreviewIconClick} calledFrom="Editor"/>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your Markdown here..."
        style={{ backgroundColor: theme.body, color: theme.text, transition: "background-color 0.5s ease, color 0.5s ease" }}
        className="p-6 flex-auto"
      />
    </div>
  );
};

export default Editor;
