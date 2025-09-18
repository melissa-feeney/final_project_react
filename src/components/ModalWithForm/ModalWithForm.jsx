import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, children, onClose, onSubmit }) {
  return (
    <div className="modalWithForm__overlay">
      <div className="modalWithForm">
        <button className="modalWithForm__close" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className="modalWithForm__title">{title}</h2>}
        <form className="modalWithForm__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
