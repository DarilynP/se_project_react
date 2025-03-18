import ItemCard from "../ItemCard/ItemCard"; // Import the ItemCard component
import "./ClothesSection.css";
function ClothesSection({
  clothingItems,
  weatherData,
  onCardClick,
  handleAddClick,
}) {
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
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
