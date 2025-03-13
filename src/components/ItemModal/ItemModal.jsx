import "./ItemModal.css";

function ItemModal({
  isOpen,
  onClose,
  onDelete,
  setCardToDelete,
  setIsConfirmModalOpen,
  card,
}) {
  if (!isOpen) return null; // If the modal is not open, return null

  console.log("isOpen", isOpen);
  console.log("card", card); // Debugging the card prop

  return (
    <div className={`modal modal_type_image ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption"> {card.name}</h2>
          <p className="modal__weather">Weather : {card.weather}</p>
          <button
            className="modal__delete-button"
            onClick={() => {
              console.log("delete button clicked for card", card);
              setCardToDelete(card); // Store the card to be deleted
              setIsConfirmModalOpen(true); // Open the confirmation modal
            }}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
