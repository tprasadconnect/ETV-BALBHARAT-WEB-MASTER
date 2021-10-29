import React from 'react';
import { Toast } from 'react-bootstrap';

export function Toaster(props: any) {
  const { show, toastInfo, handleCloseToast } = props;
  const { type, description } = toastInfo;

  return (
    <div className="toaster-container">
      <Toast
        className={`toasterMsg toasterMsg__${type}`} // toastType should be 'success' or 'error' or 'warning'
        onClose={handleCloseToast}
        show={show}
        delay={5000}
        autohide
      >
        <Toast.Body>{description}</Toast.Body>
      </Toast>
    </div>
  );
}
