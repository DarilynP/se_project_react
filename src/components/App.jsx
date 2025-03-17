import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "../utils/api";
import "./App.css";
import { coordinates, APIkey } from "../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import closeIcon from "../assets/X_mark.png";
import Footer from "./Footer/Footer";
// import CurrentTemperatureUnitContext from "../components/context/CurrentTemperatureUnit";
import AddItemModal from "./AddItemModal/AddItemModal";
import { defaultClothingItems } from "../utils/constants";
import Profile from "./Profile/Profile";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";
import ClothingSection from "./ClothingSection/ClothingSection";
import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnit";




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

  //delete state

  const [cardToDelete, setCardToDelete] = useState(null); // Stores the card that will be deleted

  const [isItemModalOpen, setIsItemModalOpen] = useState(false); // For ItemModal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Controls the confirmation modal

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    console.log("card clicked", card);
    setSelectedCard(card); // Set the selected card to be shown in the modal
    setIsItemModalOpen(true); // Open the modal
  };

  const handleAddClick = () => {
    console.log("opening modal...");
    setActiveModal("add-garment");
  };

  // const handleModalDeleteItem = (id) => {
  //   setClothingItems((prevItems) =>
  //     prevItems.filter((item) => item._id !== cardToDelete._id)
  //   );
  // };

  const handleDeleteItem = (id) => {
    console.log("Deleting item with ID:", id);
    fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    })
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

  const handleDeleteClick = (id) => {
    setCardToDelete(card); // Store the card to delete
    setIsConfirmModalOpen(true); // Open confirmation modal
    console.log("isConfirmModalOpen", isConfirmModalOpen);
  };

  const confirmDelete = () => {
    setClothingItems(
      (prevItems) => prevItems.filter((item) => item.id !== cardToDelete) // Correct logic for deleting the item
    );
    setIsConfirmModalOpen(false); // Close the modal
  };

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
    api
      .getItems() // Use api.getItems() if it's part of your API module
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Current activeModal:", activeModal);
  }, [activeModal]);

  const handleAddItem = (newItem) => {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((addedItem) => {
        setClothingItems((prevItems) => [...prevItems, addedItem]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  // const handleDeleteItem = (id) => {
  //   console.log("Deleting item with ID:", id);
  //   fetch(`http://localhost:3001/items/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       setClothingItems((prevItems) =>
  //         prevItems.filter((item) => item._id !== id)
  //       );
  //       setIsConfirmModalOpen(false);
  //     })
  //     .catch(console.error);
  // };

  const handleCardDelete = () => {
    if (!cardToDelete || !cardToDelete._id) {
      console.error("No valid item selected for deletion.");
      return;
    }
    fetch(`http://localhost:3001/items/${cardToDelete._id}`, {
      method: "DELETE",
    })
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
            <Header handleAddClick={handleAddClick} weatherData={weatherData} username={"User name"}/>
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
            card={selectedCard} // ✅ Pass the selected card as a prop
            onDelete={handleDeleteItem} // Ensure this prop is passed
            setCardToDelete={setCardToDelete}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
          />

          <ConfirmDeleteModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)} // Close modal without deleting
            onConfirm={handleCardDelete}
          />
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
