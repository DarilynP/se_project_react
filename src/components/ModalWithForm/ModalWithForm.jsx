import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  isOpen,
  onClose,
  className = "",
  onSubmit,
}) {
  console.log("isOpen:", isOpen);

  // Close the modal if the overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClick} // Close on overlay click
    >
      <div className={`modal__content ${className}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
          aria-label="Close modal" // Accessibility improvement
        >
          {/* Close icon or button */}
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
