import "./Header.css";
import logo from "../../assets/Logo.png";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, username }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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

        <Link to="/profile" className="header__link">
          <div className="header__profile">
          <div className="header__username">{username}</div>
            <img src={avatar} alt="user avatar" className="header__avatar" />

          </div>
          {/* <span className="header__avatar header__Avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
          </span> */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
