import React, { useState, useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.png";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal"; // Import RegisterModal

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  isLoggedIn,
  handleRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  // State to manage which modal is active
  const [activeModal, setActiveModal] = useState(null);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Function to close modal
  const closeActiveModal = () => {
    setActiveModal(null);
  };

  // Register function
  const handleRegister = (formData) => {
    console.log("Registering with data: ", formData);
    closeActiveModal();
  };

  // Login function (to be passed to LoginModal)
  const handleLogin = (formData) => {
    console.log("Logging in with data: ", formData);
    closeActiveModal();
  };

  console.log("activeModal", activeModal);
  console.log("currentUser:", currentUser);

  return (
    <header className="header">
      <div className="header__logo-date">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__button-add"
        >
          + Add clothes
        </button>

        {currentUser.currentUser ? (
          <Link to="/profile" className="header__link">
            <div className="header__profile">
              <div className="header__username">{currentUser.username}</div>
              <img src={avatar} alt="user avatar" className="header__avatar" />
            </div>
          </Link>
        ) : (
          <>
            <button type="button" onClick={handleRegisterClick} className="signup-button">
              Sign up
            </button>
            <button onClick={() => handleLoginClick()} className="login-button">Login</button>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;
