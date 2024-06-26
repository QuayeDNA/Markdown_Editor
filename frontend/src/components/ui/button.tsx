// src/components/DocumentButton.tsx
import React from 'react';
import DocumentIcon from '../../assets/icon-document.svg'; // Import the SVG icon

interface DocumentButtonProps {
  createdAt: string;
  name: string;
  onClick: () => void;
}

const DocumentButton: React.FC<DocumentButtonProps> = ({ createdAt, name, onClick }) => {
return (
    <button onClick={onClick} className="flex items-center space-x-4 text-white w-full p-2 rounded-md hover:bg-gray-600 my-4">
    <img src={DocumentIcon} />
        <div className='text-left'>
            <div className="text-sm text-gray-300 ">{createdAt}</div>
            <div>{name}</div>
        </div>
    </button>
);
};

export default DocumentButton;