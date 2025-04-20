import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  
  // Check if the current user has liked the item
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (!currentUser) return; // Only allow like/unlike if the user is logged in
    onCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  };

  // Add conditional class for the like button based on whether the item is liked or not
  const itemLikeButtonClassName = `card__like-button ${isLiked ? "liked" : ""}`;

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <p className="card__weather">{item.weather?.description}</p>

      {/* Like button */}
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
