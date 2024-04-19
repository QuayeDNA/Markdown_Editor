import React, { useRef } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ModalProps {
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      onClick={handleClickOutside}>
      <div
        style={{ width: "150%", height: "150%" }}
        className="absolute bg-grey-3 opacity-50"></div>
      <div
        ref={modalRef}
        className={` p-4 rounded-lg shadow-lg z-10 w-[20%] ${isDarkMode ? 'bg-dark-1 text-light-4' : 'bg-light text-grey-3'}`}>
        <h2 className="text-3xl font-bold mb-4">Title</h2>
        <p className="text-light-2 mb-4">
          Are you sure you want to delete this document? This action cannot be
          reversed
        </p>
        <button className="w-full bg-orange hover:bg-orange-light transition duration-100 text-white font-bold py-2 px-4 rounded mt-2">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
