// src/components/sub/DocumentsList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDocuments, setCurrentDocument, updateDocumentContent } from '../../redux/documentSlice'; // Remove duplicate imports
import DocumentButton from '../ui/button';
import data from '../../../data.json';

interface Document {
  createdAt: string;
  name: string;
  content: string; // Add the 'content' property
}

const DocumentList: React.FC = () => {
  const documents: Document[] = useSelector((state: { documents: { documents: Document[] } }) => state.documents.documents);
  const dispatch = useDispatch();

 useEffect(() => {
  const storedDocuments = JSON.parse(localStorage.getItem('documents') ?? '[]');
  if (storedDocuments.length === 0) {
    storedDocuments.push(data);
    localStorage.setItem('documents', JSON.stringify(storedDocuments));
  }
  dispatch(setDocuments(storedDocuments));
  
  // Set the current document to the first document in the array
  if (storedDocuments.length > 0) {
    dispatch(setCurrentDocument(storedDocuments[0]));
  }
}, [dispatch]);

  return (
    <div>
      {documents.map((doc: Document) => (
        <DocumentButton key={doc.createdAt} createdAt={doc.createdAt} name={doc.name}  onClick={() => {
          dispatch(setCurrentDocument(doc));
          dispatch(updateDocumentContent(doc.content)); // Dispatch updateDocumentContent action
        }} />
      ))}
    </div>
  );
};

export default DocumentList;