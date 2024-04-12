import React, { useEffect, useState } from 'react';
import DocumentButton from '../ui/button';

interface Document {
  createdAt: string;
  name: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setDocuments(data));
  }, []);

  return (
    <div>
      {documents.map((doc, index) => (
        <DocumentButton key={index} createdAt={doc.createdAt} name={doc.name} />
      ))}
    </div>
  );
};

export default DocumentList;