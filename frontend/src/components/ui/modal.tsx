// src/components/Modal.tsx
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteDocument } from '../../redux/documentSlice';

interface ModalProps {
  onClose: () => void;
  documentId: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, documentId }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleConfirmDelete = () => {
    // Dispatch action to delete the document
    dispatch(deleteDocument({ id: documentId }));
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        style={{ width: "150%", height: "150%" }}
        className="absolute bg-grey-3 opacity-50"></div>
      <div className={`p-4 rounded-lg shadow-lg z-10 w-[20%] ${isDarkMode ? 'bg-dark-1 text-light-4' : 'bg-light text-grey-3'}`}>
        <h2 className="text-3xl font-bold mb-4">Confirm Deletion</h2>
        <p className="text-light-2 mb-4">
          Are you sure you want to delete this document? This action cannot be
          reversed
        </p>
        <button
          className="w-full bg-orange hover:bg-orange-light transition duration-100 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleConfirmDelete}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
