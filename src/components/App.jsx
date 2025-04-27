import { useState, useEffect } from "react";
import { checkToken, handleSaveProfile } from "../utils/api";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import LoginModal from "./LoginModal/LoginModal.jsx";
import { login } from "../utils/api";
import updatedUserData from "../utils/api";
import { addCardLike, removeCardLike } from "../utils/api";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as api from "../utils/api";


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

  function handleRegister({ email, password, avatar, name }) {
    console.log("Registering:", email, password);
    register({
      name,
      avatar,
      email,
      password,
    })
      .then(() => {
        return handleLogin({ email, password, avatar, name });
      })
      .catch((err) => console.error("registration error", err));
  }

  const handleRegisterClick = (e) => {
    e.preventDefault();

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

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        if (token) {
          checkToken(token).then((user) => {
            setCurrentUser(user);
            console.log("user set after login:", user);
            setIsLoggedIn(true);
            closeActiveModal();
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const openSignupModal = () => {
    setActiveModal("sign up");
  };

  const openLoginModal = () => {
    console.log("login modal triggered");
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

  const handleCardLike = ({ id, isLiked, currentUser }) => {
    console.log(`Card ${id} has been ${isLiked ? "unliked" : "liked"}`);
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

  console.log("Render check: isLoggedIn =", isLoggedIn);
  console.log("Render check: currentUser =", currentUser);

  const handleSignOut = () => {
    console.log("sign out clicked");
    console.trace();
    console.log("current user before signout:", currentUser);
    localStorage.removeItem("jwt"); // remove the token
    setIsLoggedIn(false); // update state to log out
    setCurrentUser(null); // optional: clear user state
  };

  //delete item from server
  // const deleteItem = (itemId) => {
  //   api
  //     .deleteItem(itemId)
  //     .then(() => {
  //       const updatedItems = clothingItems.filter(
  //         (item) => item._id !== itemId
  //       );
  //       setClothingItems(updatedItems); // Update local state
  //       setIsConfirmDeleteModalOpen(false); // Close delete confirmation modal if you have one
  //     })
  //     .catch((err) => {
  //       console.error("Error deleting item:", err);
  //     });
  // };

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
          if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
          } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => {
          console.error("Auth error:", err);
          setCurrentUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                username={currentUser?.name || "User"}
                handleRegisterClick={openRegisterModal}
                handleLoginClick={openLoginModal}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        username={"User name"}
                        onSignOut={handleSignOut}
                        updatedUserData={updatedUserData}
                        handleCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
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
              onCardLike={handleCardLike}
            />

            <ConfirmDeleteModal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={() => handleDeleteItem(cardToDelete?._id)}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              onLogin={handleLogin}
              type={activeModal}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
            />
          </div>
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
