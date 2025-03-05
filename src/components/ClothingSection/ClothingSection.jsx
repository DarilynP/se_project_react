import { defaultClothingItems } from "../../utils/constants";

function ClothingSection(onCardClick) {
  return (
    <div className="clothes-section">
      <div>
        <p> Your items</p>
        <button> +Add New </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })

          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // onCardClick={handleCardClick}
               // todo- pass as prop
               //oncardclick={oncardclick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothingSection;
