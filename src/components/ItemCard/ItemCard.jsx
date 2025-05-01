import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";
import Like_button from "../../assets/Like_button.png";
import Liked_button from "../../assets/Liked_button.png"

function ItemCard({ item, onCardClick, onCardLike, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  console.log("ITEM OWNER:", item.owner);
  console.log("CURRENT USER ID:", currentUser ? currentUser._id : "no user loaded yet" );
  console.log("currentUser:", currentUser);

  // const isLiked = item.likes?.some((id) => id === currentUser?.currentUser._id);
  // const isOwn = item.owner === currentUser?.currentUser._id;

  const isLiked = currentUser?.currentUser && item.likes?.some((id) => id === currentUser.currentUser._id);
  const isOwn = currentUser?.currentUser && item.owner === currentUser.currentUser._id;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked, currentUser: currentUser.currentUser });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(item._id);
  };

  //const itemLikeButtonClassName = `card__like-button ${isLiked ? "liked" : ""}`;

  return (
    <li className="card">
      <div className="card__content-container">
        <h2 className="card__name">{item.name}</h2>
        <button className="card__like-button" onClick={handleLike}>
          

          {isLiked ? <img src={Liked_button} alt="Like" /> : <img src={Like_button} alt="Like" />  }

        </button>
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      <p className="card__weather">{item.weather?.description}</p>

      {/* Delete button - only if user owns the item */}
      {isOwn && (
        <button
          className="card__delete-button"
          onClick={handleDelete}
          aria-label="Delete"
        >
          Delete
        </button>
      )}
    </li>
  );
}

export default ItemCard;
