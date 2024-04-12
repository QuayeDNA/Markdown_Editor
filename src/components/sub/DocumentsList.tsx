import React, { useEffect, useState } from 'react';
import DocumentButton from '../ui/button';

interface Document {
  createdAt: string;
  name: string;
  content: string;
}

interface DocumentListProps {
  setSelectedContent: (content: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ setSelectedContent }) => {
  const [documents, setDocuments] = useState<Document[]>([]);


  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setDocuments(data));
  }, []);

  return (
    <div>
      {documents.map((doc) => (
        <DocumentButton
          key={doc.name}
          createdAt={doc.createdAt}
          name={doc.name}
          content={doc.content}
          onClick={() => setSelectedContent(doc.content)}
        />
      ))}
    </div>
  );
};

export default DocumentList;