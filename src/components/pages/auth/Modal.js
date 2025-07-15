import React from 'react';
import '../../../styles/Modal.css'; // 스타일 파일 경로 수정

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
