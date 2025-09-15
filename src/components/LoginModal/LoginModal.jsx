import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { authorize } from "../../utils/auth";
import "./LoginModal.css";

function LoginModal({ onClose, onSubmit, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const isActive = isEmailValid && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate login
    authorize(email, password).then((res) => {
      if (res.token) {
        if (onSubmit) onSubmit({ email, password });
      } else {
        setError("Invalid credentials.");
      }
    });
  };

  return (
    <ModalWithForm title="" onClose={onClose} onSubmit={handleSubmit}>
      <div className="loginModal__content">
        <h2 className="loginModal__title">Sign in</h2>
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
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          className={`loginModal__submit${isActive ? " active" : ""}`}
          disabled={!isActive}
        >
          Sign in
        </button>
        <div className="loginModal__footer">
          <span>or </span>
          <button
            type="button"
            className="loginModal__signup-link"
            onClick={onSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
