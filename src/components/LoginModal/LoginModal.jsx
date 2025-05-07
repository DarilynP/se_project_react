import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password }); // Delegated login logic
  }

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Login"
      name="login"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="login-modal"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="modal__input"
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="modal__input"
        />
      </label>
      <div className="login__button-wrapper">
        <button type="button" className="modal__submit">
           Login
        </button>
        <button type="submit" className="login__button" onClick={onSwitchToRegister}>
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
