import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getItems,
  addItem,
  removeItem,
  handleSaveProfile,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import { coordinates, APIkey, defaultClothingItems } from "../utils/constants";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnit";
import CurrentUserContext from "../context/CurrentUserContext.jsx";
import { checkToken, login, register } from "../utils/auth.js";

// Components
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import Profile from "./Profile/Profile";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";

import RegisterModal from "../components/RegisterModal/RegisterModal";
import LoginModal from "./LoginModal/LoginModal.jsx";
import EditProfileModal from "./EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

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
  // const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

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

  // const handleRegisterClick = (e) => {
  //   e.preventDefault();

  //   setActiveModal("register");
  // };

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

  // const openSignupModal = () => {
  //   setActiveModal("sign up");
  // };

  const openLoginModal = () => {
    console.log("login modal triggered");
    setActiveModal("login");
  };

  const onEditProfile = () => {
    console.log("I've opened edit profile modal");
    setActiveModal("edit-profile");
    setName("");
    setUrl("");
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
    console.log(`Card ${id} has been ${isLiked ? "unliked" : "liked"}`);
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
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
                        // updatedUserData={updatedUserData}
                        handleCardLike={handleCardLike}
                        onEditProfile={onEditProfile}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>

            <EditProfileModal
              currentUser={currentUser}
              onClose={closeActiveModal}
              onSave={handleSaveProfile}
              isOpen={activeModal === "edit-profile"}
            />

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
              onSwitchToLogin={openLoginModal}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onSwitchToRegister={openRegisterModal}
            />
          </div>
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
