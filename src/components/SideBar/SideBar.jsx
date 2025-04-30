import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext); // Moved inside function

  return (
    <div className="sideBar">
      <img src={currentUser?.avatar} alt="User avatar" className="sideBar__avatar" />
      <p className="sideBar__username">{currentUser?.name}</p>
    </div>
  );
}

export default SideBar;
