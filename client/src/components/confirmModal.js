// confirmModal.js: Modal component for confirming actions
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// This component will display the modal.
function ConfirmModal({
  buttonLabel,
  title,
  message,
  confirmAction,
  show: showProp,
  onHide, // Tells the parent to hide the modal. Required to be handled by the parent even if not used.
  showButton = true, // Allows the button to be hidden
}) {
  const [show, setShow] = useState(false);

  // This method will handle the cancel button.
  const handleCancel = () => {
    setShow(false);
    // onHide();
  };

  // This method will show the modal.
  const handleShow = () => setShow(true);

  // This method will handle the confirm button.
  const handleConfirm = () => {
    confirmAction();
    handleCancel();
  };

  // This method allows the modal to be shown by the parent.
  useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  // This section will display the modal.
  return (
    <>
      {showButton && (
        <Button
          className="btn btn-primary btn-sm"
          variant="secondary"
          onClick={handleShow}
        >
          {buttonLabel}
        </Button>
      )}

      <Modal
        show={show}
        // onHide={handleCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
