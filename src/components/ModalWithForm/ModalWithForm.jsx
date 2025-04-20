import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  className = "",
  onSubmit,
}) {
  console.log("isOpen:", isOpen);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className={`modal__content ${className}`}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close-btn">
          {/* Close icon or button */}
        </button>

        {/* Children are injected here. The form should be handled by the parent component. */}
        <div className="modal__form">
          {children} 
        </div>

        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
