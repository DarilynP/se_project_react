import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting form with values:", {
      email,
      password,
      name,
      avatar,
    });
    onRegister({ email, password, name, avatar });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      name="new-user"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="modal__input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="modal__input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="modal__input"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          className="modal__input"
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
      <div className="modal__button-wrapper">
      <button type="submit" className="modal__submit">
       Sign up
      </button>
      <button type="button" className="modal__button" onClick={onSwitchToLogin}>
        or Login
      </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
