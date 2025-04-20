import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RegisterModal from "../components/RegisterModal/RegisterModal";
import CurrentUserContext from "../context/CurrentUserContext.jsx";
import { CurrentUserProvider } from "../context/CurrentUserContext.jsx";
import { register } from "../utils/api";

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

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  function handleRegister({ email, password }) {
    console.log("Registering:", email, password);
    register({
      name: "New User",
      avatar: "",
      email,
      password,
    })
      .then(() => {
        return handleLogin({ email, password });
      })
      .catch((err) => console.error("registration error", err));
  }

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

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

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLogin = (data) => {
    console.log("Logging in:", data);
    // Handle login logic
    setIsModalOpen(false); // Close modal after login
  };

  const openSignupModal = () => {
    setActiveModal("sign up");
  };

  const openLoginModal = () => {
    console.log("login modal triggered")
    setActiveModal("login");
  };

  const handleDeleteItem = (id) => {
    if (!id) {
      console.error(" Error: ID is undefined!");
      return;
    }
    console.log("Deleting item with ID:", id);

    removeItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );

        setIsConfirmModalOpen(false);
        setCardToDelete(null);
        closeActiveModal(); // Ensures all modals close
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    console.log("Closing all modals...");
    setActiveModal("");
    setIsItemModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt"); // remove the token
    setIsLoggedIn(false); // update state to log out
    setCurrentUser({}); // optional: clear user state
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

  // Auto-login on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // const handleCardDelete = () => {
  //   if (!cardToDelete || !cardToDelete._id) {
  //     console.error("No valid item selected for deletion.");
  //     return;
  //   }

  //   removeItem(cardToDelete._id)
  //     .then(() => {
  //       setClothingItems((prevItems) =>
  //         prevItems.filter((item) => item._id !== cardToDelete._id)
  //       );
  //       setCardToDelete(null);
  //       setIsConfirmModalOpen(false);
  //       setIsItemModalOpen(false);
  //     })
  //     .catch(console.error);
  // };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                handleRegisterClick={openRegisterModal}
                handleLoginClick={openLoginModal}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardClick={handleCardLike}
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
                      onSignOut={handleSignOut}
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
              onConfirm={() => handleDeleteItem(cardToDelete?._id)}
            />

            <RegisterModal
              isOpen={activeModal === "register" || activeModal ==="login"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              onLogin={handleLogin}
              type={register}
            />
          </div>
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
