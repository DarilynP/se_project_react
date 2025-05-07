import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import  useForm  from "../../Hooks/useForm"
import { useContext } from "react";
// import { currentUserContext } from '../../context/CurrentUserContext';

export default function AddItemModal({ onClose, isOpen, onAddItem }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });



  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new item:", values);
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card-name"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Enter Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
   
        <button type="submit" className="modal__submit-garment">
          Add Garment
        </button>
    
    </ModalWithForm>
  );
}
