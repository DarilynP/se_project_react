import "./Header.css";
import logo from "../../assets/Logo.png";
import avatar from "../../assets/Avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div>
        <img src={logo} alt="logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes"
        >
          + Add clothes
        </button>

        <div className="header__user-containter">
          <p className="header__username">Terrence Tengene</p>
          <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
