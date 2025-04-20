import React, { useContext, useState } from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  weatherData,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle opening the modal
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  // Handle saving the updated user data
  const handleSaveProfile = (updatedUserData) => {
    fetch(`/api/users/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data); // Update context with new user data
        setIsEditModalOpen(false); // Close modal
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Something went wrong while updating your profile.");
      });
  };

  return (
    <>
      <Header
        handleAddClick={handleAddClick}
        weatherData={weatherData}
        username={currentUser?.name}
      />
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
          <button className="profile__logout-button" onClick={onSignOut}>
            Sign Out
          </button>
        </section>
        <section className="profile__clothing-item">
          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
            handleAddClick={handleAddClick}
          />
        </section>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          currentUser={currentUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
}

export default Profile;
