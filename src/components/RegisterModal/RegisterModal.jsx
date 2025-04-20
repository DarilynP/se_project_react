import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onLogin, type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear inputs when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null; // If modal is not open, return nothing

  function handleSubmit(e) {
    e.preventDefault();
    if (type === "signup") {
      onRegister({ email, password });
    } else if (type === "login") {
      onLogin({ email, password });
    }
  }

  return (
    <ModalWithForm
      title={type === "signup" ? "Sign Up" : "Login"}
      name="new-user"
      buttonText={type === "signup" ? "Register" : "Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <h2>{type === "signup" ? "Sign up" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{type === "signup" ? "Sign up" : "Login"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
