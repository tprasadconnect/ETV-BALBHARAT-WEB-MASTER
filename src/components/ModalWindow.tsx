import React from 'react';
import { Row, Button, Modal } from 'react-bootstrap';

interface IModalWindowProps {
  show: boolean;
  onHide: () => void;
  handleSubmit: () => void;
  modalTitle: string;
  modalDescription: string;
}

export const ModalWindow: React.FC<IModalWindowProps> = (props: any) => {
  const { show, onHide, modalTitle, modalDescription, handleSubmit } = props;
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="modal-window__modal-title">{modalTitle}</div>
          <div className="modal-window__modal-text">{modalDescription}</div>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Button className="btn-transparent" onClick={onHide}>
              No
            </Button>
            <Button className="btn-pink" type="submit" onClick={handleSubmit}>
              Yes
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};
