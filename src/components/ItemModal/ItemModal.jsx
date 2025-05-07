import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";

function ItemModal({
  isOpen,
  onClose,
  setCardToDelete,
  setIsConfirmModalOpen,
  card,
}) {
  if (!isOpen || !card) return null; // Ensure modal only renders if open and card exists

  console.log("isOpen", isOpen);
  console.log("card", card);
  console.log("Card inside ItemModal:", card);
  console.log("Card ID inside ItemModal:", card?._id);

  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    if (!card || !card._id) {
      console.error("Error: Card ID is missing!", card);
      return;
    }

    console.log("Setting cardToDelete:", card);
    setCardToDelete(card); // Store the card to be deleted
    setIsConfirmModalOpen(true);
  };

  console.log("card:", card);
  console.log("currentUser:", currentUser);
  console.log("isOwn:", card?.owner === currentUser?._id);

  const isOwn =
    card?.owner === currentUser?._id || card?.owner?._id === currentUser?._id;

  return (
    <div className={`modal modal_type_image ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content-item modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image modal__image-profile"
        />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {currentUser?.currentUser && isOwn && (
            <button
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
