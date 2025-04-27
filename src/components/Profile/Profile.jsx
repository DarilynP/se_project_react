import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { handleSaveProfile } from "../../utils/api.js";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  weatherData,
  onSignOut,
  updatedUserData,
  deleteItem,
  onSubmit,
  isLoggedIn,
  handleCardLike,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // Ensure these state hooks are always defined
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [username, setUsername] = useState(
    currentUser ? currentUser.username : ""
  ); // Handle case where currentUser might be null or undefined
  const [avatar, setAvatar] = useState(currentUser ? currentUser.avatar : "");

  // Handle opening the modal
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = {
      name: username,
      avatar: avatar,
    };

    handleSaveProfile(updatedUserData);
    setIsProfileModalOpen(false);
  };

  const handleProfileChange = () => {
    setIsProfileModalOpen(true); // Open the profile modal
  };

  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
          <button
            className="profile__change-user"
            onClick={handleProfileChange}
          >
            Change Profile Data
          </button>

          {/* {isLoggedIn && ( */}
          <button className="profile__logout-button" onClick={onSignOut}>
            Sign Out
          </button>
          {/* )} */}
        </section>

        <section className="profile__clothing-item">
          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            handleAddClick={handleAddClick}
            onDelete={deleteItem}
            handleCardLike={handleCardLike}
          />
        </section>
      </div>

      {/* change profile data modal*/}
      {isEditModalOpen && (
        <EditProfileModal
          currentUser={currentUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={updatedUserData}
        />
      )}

      <ModalWithForm
        isOpen={isProfileModalOpen}
        onSubmit={handleProfileSubmit}
        onClose={() => setIsProfileModalOpen(false)}
        buttonText={"Save changes"}
        title="Change Profile Data"
      >
        <label>
          Name *
          <input
            type="text"
            placeholder="Name"
            value={username}
            className="modal__input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Avatar *
          <input
            type="text"
            placeholder="Avatar URL"
            className="modal__input"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        {/* <button type="submit" className="modal__submit">
          Save Changes
        </button>  */}
      </ModalWithForm>
    </>
  );
}

export default Profile;
