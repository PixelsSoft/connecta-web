import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, onHide, title, children, size = 'md' }) => {
  return (
    <Modal show={show} onHide={onHide} centered size={size}>
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
