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
  onEditProfileOpen
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // State hooks for modal, username, and avatar
  
  const [username, setUsername] = useState(currentUser?.username || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");


 
  // Handle profile save
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    handleSaveProfile({ name: username, avatar })
      .then((updatedUser) => {
        if (updatedUser) {
          setCurrentUser(updatedUser); // Update user data in the UI
          closeEditProfileModal(); // Close the modal upon success
          console.log("Profile updated successfully:", updatedUser);
        } else {
          throw new Error("No updated user data returned");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
          <button
            className="profile__change-user"
            onClick={onEditProfileOpen}
          >
            Change Profile Data
          </button>
          <button className="profile__logout-button" onClick={onSignOut}>
            Sign Out
          </button>
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

        {/* Edit Profile Modal */}
        {/* {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={closeEditProfileModal}
            onSubmit={handleProfileSubmit}
            username={username}
            avatar={avatar}
            setUsername={setUsername}
            setAvatar={setAvatar}
            onSave={() => {
              console.log("hello");
            }}
          />
        )} */}
      </div>
    </>
  );
}

export default Profile;
