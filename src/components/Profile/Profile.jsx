import { useContext, useState } from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";
import SideBar from "../SideBar/SideBar";

import { handleSaveProfile } from "../../utils/api.js";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onSignOut,
  deleteItem,
  handleCardLike,
  onEditProfile,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // Ensure these state hooks are always defined
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [username, setUsername] = useState(
    currentUser ? currentUser.username : ""
  ); // Handle case where currentUser might be null or undefined
  
  const [avatar, setAvatar] = useState(currentUser ? currentUser.avatar : "");

  // Handle opening the modal
  // const handleEditClick = () => {
  //   setIsEditModalOpen(true);
  // };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
  
    handleSaveProfile({ name: username, avatar })
      .then((updatedUser) => {
        if (updatedUser) {
          setCurrentUser(updatedUser); // Update avatar and name in UI
          console.log("Profile updated successfully:", updatedUser);
        } else {
          throw new Error("No updated user data returned");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      })
      .finally(() => {
        setIsEditModalOpen(false); // Always close modal
      });
  };
  

  // const handleProfileChange = () => {
  //   setIsProfileModalOpen(true); // Open the profile modal
  // };

  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
          <button className="profile__change-user" onClick={onEditProfile}>
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
    </>
  );
}

export default Profile;
