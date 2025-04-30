import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";

function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  onDelete,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button onClick={handleAddClick}>+ Add New </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          // .filter((item) => item.weather === weatherData.type) // Filtering based on weatherData
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick} // Pass the onCardClick prop down to ItemCard
                currentUser={currentUser}
                onDelete={onDelete}
                onCardLike={handleCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
