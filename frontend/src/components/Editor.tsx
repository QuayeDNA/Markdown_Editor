import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateDocumentContent } from '../redux/documentSlice';

interface EditorProps {
  documentContent: string;
}
const Editor: React.FC<EditorProps> = () => {

  const dispatch = useDispatch();
  const selectedDocument = useSelector((state: RootState) => state.document.selectedDocument);
  const [content, setContent] = useState(selectedDocument ? selectedDocument.content : '');

  useEffect(() => {
  if (selectedDocument) {
    setContent(selectedDocument.content);
  } else {
    // If selectedDocument is null, clear the content
    setContent('');
  }
}, [selectedDocument]);
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (selectedDocument) {
      dispatch(updateDocumentContent({ id: selectedDocument.id, content: newContent }));
    }
  };

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className="flex h-full overflow-y-auto">
      <textarea
         className={`font-roboto-mono  transition duration-300 flex-1 p-4 focus:outline-none  ${isDarkMode ? 'bg-dark-1 text-light-4' : 'bg-light text-grey-3'}`}
         value={content}
         onChange={handleMarkdownChange}
        placeholder='Enter your markdown here...'
      />
    </div>
  );
};

export default Editor;
