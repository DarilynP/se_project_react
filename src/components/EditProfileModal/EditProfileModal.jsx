import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({
  onEditProfile,
  isOpen,
  onClose,
  onSave,
  currentUser,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  //  Sync with currentUser when modal is opened or user data changes
  useEffect(() => {
    if(isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "")

    } 
    // THIS CODE PRE-FILL DATA
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  },
   [ isOpen, currentUser]);

  const handleSubmit = (e) => {
    console.log(`savings change for:${name}`);
    e.preventDefault();
    onSave({ name, avatar });
  };

  // if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Save Changes"}
      name="edit__profile"
      isOpen={isOpen}
    >
      <label className="modal__label">
        Name:
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL:
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Enter avatar URL"
        />
      </label>
      <button type="submit" className="edit__modal-submit">
        Save Changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
