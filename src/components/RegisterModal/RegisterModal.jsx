import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { register } from "../../utils/auth";
import "./RegisterModal.css";

function RegisterModal({ onClose, onSubmit, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const isActive = isEmailValid && password.trim() !== "" && name.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await register(email, password, name);
      if (onSubmit) onSubmit({ email, password, name });
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <ModalWithForm title="" onClose={onClose} onSubmit={handleSubmit}>
      <div className="loginModal__content">
        <h2 className="loginModal__title">Sign up</h2>
        <label className="loginModal__label">
          Email
          <input
            type="email"
            className="loginModal__input"
            placeholder="Enter email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {!isEmailValid && emailTouched && email && (
            <span className="loginModal__error">Invalid email address</span>
          )}
        </label>
        <label className="loginModal__label">
          Password
          <input
            type="password"
            className="loginModal__input"
            placeholder="Enter password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="loginModal__label">
          Name
          <input
            type="text"
            className="loginModal__input"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {error && <p className="signup-error">{error}</p>}
        <button
          type="submit"
          className={`loginModal__submit${isActive ? " active" : ""}`}
          disabled={!isActive}
        >
          Sign up
        </button>
        <div className="loginModal__footer">
          <span>or </span>
          <button
            type="button"
            className="loginModal__signup-link"
            onClick={onSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
