import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteDocument } from "../../redux/documentSlice";
import { addMessage } from "../../redux/messageSlice";

interface ModalProps {
  onClose: () => void;
  documentId: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, documentId }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleConfirmDelete = () => {
    // Dispatch action to delete the document
    dispatch(deleteDocument({ id: documentId }));
    // Close the modal
    onClose();
    dispatch(addMessage("Document deleted"));
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click occurred outside the modal content
    if (event.target === overlayRef.current) {
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{ width: "150%", height: "150%" }}
        className="absolute bg-grey-3 opacity-50"></div>
      <div
        className={`p-4 rounded-lg shadow-lg z-10 w-auto m-6 font-roboto-slab ${
          isDarkMode ? "bg-dark-1 text-light-4" : "bg-light text-grey-1"
        }`}>
        <div
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-light-4" : "text-dark-3"
          }`}>
          Delete this document?
        </div>
        <p className="mb-4">
          Are you sure you want to delete this document?
          <br />
          This action cannot be reversed
        </p>
        <button
          className="w-full bg-orange hover:bg-orange-light transition duration-100 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleConfirmDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
