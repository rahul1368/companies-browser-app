import React, { useEffect, useRef, useState, forwardRef } from 'react';

interface IModalProps{
  isOpen: boolean;
  onClose: () => void;
  children: any;
}
const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center m-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="relative z-50 bg-white p-6 rounded-lg shadow-lg">
            <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={handleClose}>
              <span className="text-gray-500 cursor-pointer">×</span>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const ModalWrapper = ({
    children,
    btnText
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalBtnRef = useRef(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        ref={modalBtnRef}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 inline-block"
        onClick={openModal}
      >
        {btnText}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {children}
      </Modal>
    </div>
  );
};

export default ModalWrapper;
