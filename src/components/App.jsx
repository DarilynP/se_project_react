import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { getItems, addItem, removeItem } from "../utils/api";
import "./App.css";
import { coordinates, APIkey } from "../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import { defaultClothingItems } from "../utils/constants";
import Profile from "./Profile/Profile";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";
import ClothesSection from "./ClothesSection/ClothesSection";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnit";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [cardToDelete, setCardToDelete] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    console.log("card clicked", card);
    setSelectedCard(card);
    setIsItemModalOpen(true);
  };

  const handleAddClick = () => {
    console.log("opening modal...");
    setActiveModal("add-garment");
  };

  const handleDeleteItem = (id) => {
    console.log("Deleting item with ID:", id);

    removeItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        setIsConfirmModalOpen(false);
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    console.log("closing modal...");
    setActiveModal("");
  };

  const handleAddItem = (newItem) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [...prevItems, addedItem]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);



  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log("Weather Data:", data);
        const filteredData = filterWeatherData(data);
        console.log("Filtered Data:", filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Current activeModal:", activeModal);
  }, [activeModal]);

  const handleCardDelete = () => {
    if (!cardToDelete || !cardToDelete._id) {
      console.error("No valid item selected for deletion.");
      return;
    }

    removeItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete(null);
        setIsConfirmModalOpen(false);
        setIsItemModalOpen(false);
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <BrowserRouter>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              username={"User name"}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    username={"User name"}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
          />
          <ItemModal
            isOpen={isItemModalOpen}
            onClose={() => setIsItemModalOpen(false)}
            card={selectedCard}
            onDelete={handleDeleteItem}
            setCardToDelete={setCardToDelete}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
          />

          <ConfirmDeleteModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleCardDelete}
          />
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
