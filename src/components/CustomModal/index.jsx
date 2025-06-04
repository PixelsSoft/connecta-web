import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, onClose, title, children, onSubmit, footer }) => {
  return (
    <Modal show={show} onHide={onClose} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footer !== false && (
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
          {onSubmit && (
            <Button variant='primary' onClick={onSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
