import React from "react";
import "./ConfirmDeleteModal.css"; // Import CSS for styling

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, cardToDelete }) {
  console.log("ConfirmDeleteModal isOpen:", isOpen);

  return (
    <div
      className={`modal modal_type_confirm ${isOpen ? "modal__opened" : ""}`}
    >
      <div className=" modal__content-confirm ">
        <button className="modal__close-confirm" onClick={onClose}></button>

        <h2 className="modal__title-confirmModal">
          Are you sure you want to delete this item?
        </h2>
        <h3 className="modal__subtitle-confirm">This action is irreversible</h3>
        <div className="modal__buttons">
          <button
            className="modal__confirm-button"
            onClick={() => onConfirm(cardToDelete)} // Pass the cardToDelete to onConfirm
          >
            Yes, Delete Item
          </button>
          <button className=" modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
