import React from "react";
import "./RegistrationSuccessModal.css";

function RegistrationSuccessModal({ onSignIn, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn" aria-label="Close">
          &times;
        </button>
        <h2 className="modal-title">
          Registration successfully
          <br />
          completed!
        </h2>
        <button onClick={onSignIn} className="registration-success-sign-in-btn">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;
