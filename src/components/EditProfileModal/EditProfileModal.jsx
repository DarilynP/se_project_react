import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  //  Sync with currentUser when modal is opened or user data changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatarUrl || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    console.log(`savings change for:${name}`);
    e.preventDefault();
    onSave({ name, avatarUrl });
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Save Changes"}
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label>
        Avatar URL:
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter avatar URL"
        />
      </label>
      <button type="submit">Save Changes</button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
