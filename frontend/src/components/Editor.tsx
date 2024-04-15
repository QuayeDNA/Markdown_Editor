// src/components/Editor.tsx
import { useTheme } from "styled-components";
import Header from "./sub/headerComponent";
import { useSelector } from "react-redux";
import { Document } from '.././redux/documentSlice'; // Update this line

interface EditorProps {
  onPreviewIconClick: () => void;
}

const Editor: React.FC<EditorProps> = ({ onPreviewIconClick }) => {
  const currentDocument: Document = useSelector((state: { documents: { currentDocument: Document } }) => state.documents.currentDocument);

  const theme = useTheme();

  return (
    <div className="border-r-2 border-gray-400 flex flex-col h-full" style={{ backgroundColor: theme.body, color: theme.text }}>
      <Header headerName="Editor" onPreviewIconClick={onPreviewIconClick} calledFrom="Editor"/>
      <textarea
        value={currentDocument.content}
        placeholder="Write your Markdown here..."
        style={{ backgroundColor: theme.body, color: theme.text, transition: "background-color 0.5s ease, color 0.5s ease" }}
        className="p-6 flex-auto"
      />
    </div>
  );
};

export default Editor;