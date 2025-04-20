import React, { useState, useEffect } from "react";

function EditProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || "");

  // Close the modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  // Handle form submission (saving the profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = { name, avatarUrl };
    onSave(updatedUserData); // Pass the new user data to the parent component
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
