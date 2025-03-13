import React, { useState, useEffect } from "react";
import "./Profile.css";
import ClothingSection from "../ClothingSection/ClothingSection";
import SideBar from "../SideBar/SideBar";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  // const [clothingItems, setClothingItems] = useState([
  // //   {
  // //     name: "Test",
  // //     imageUrl:
  // //       "https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600.jpg",
  // //   },
  // // ]);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-item">
        <ClothingSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
