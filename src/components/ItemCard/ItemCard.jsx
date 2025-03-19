import "./ItemCard.css";

function ItemCard({ item, onCardClick, cardToDelete })  {
  console.log("Item.name", item?.name); // Add this to check the item
  console.log("Item:", item);
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <p className="card__weather">{item.weather?.description}</p>
    </li>
  );
}
export default ItemCard;
