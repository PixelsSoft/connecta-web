// components/CustomModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, children, size = 'md' }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size={size} // sm, md (default), lg, xl
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
