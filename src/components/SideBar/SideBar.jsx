import avatar from "../../assets/Avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sideBar">
      <img src={avatar} alt="Default avatar" />
      <p className="sideBar__username">User name</p>
    </div>
  );
}

export default SideBar;
