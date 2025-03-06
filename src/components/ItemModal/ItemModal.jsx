import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card = { name: "Image preview" } }) {
  console.log("isOpen", isOpen);
  return (
    <div
      className={`modal ${isOpen === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          {/*
      // <div className="modal__footer"> */}
          <h2 className="modal__caption"> {card.name}</h2>
          <p className="modal__weather">Weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
