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

      
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
            <button type="submit" className="modal__submit">
         {buttonText} 
          </button> 
        </form>  
      </div>
    </div>
  );
}

export default ModalWithForm;
