import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";


function EditProfileModal({ onSave, isOpen, onClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Sync with currentUser when modal is opened or user data changes
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Saving changes for: ${name}`);
    onSave({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      // buttonText="Save Changes"
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
      <button type="submit" className="modal__submit-btn">
        Save Changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
