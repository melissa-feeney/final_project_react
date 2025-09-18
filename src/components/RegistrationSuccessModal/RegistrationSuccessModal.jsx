import React from "react";
import "./RegistrationSuccessModal.css";

function RegistrationSuccessModal({ onSignIn, onClose }) {
  return (
    <div className="modalWithForm__overlay">
      <div className="registrationSuccessModal__content">
        <button
          onClick={onClose}
          className="registrationSuccessModal__closeBtn"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="modal__title">
          Registration successfully
          <br />
          completed!
        </h2>
        <button
          onClick={onSignIn}
          className="registrationSuccessModal__signInBtn"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;
