import "./Header.css";
import logo from "../../assets/Logo.png";
import avatar from "../../assets/Avatar.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes">+ Add clothes</button>
      <div className="header__user-containter">
        <p className="header__username">NAME</p>
        <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
