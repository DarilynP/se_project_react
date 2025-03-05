import "./Profile.css";
import ClothingSection from "../ClothingSection/ClothingSection";

function Profile({ onClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar"></section>
      <SideBar />
      <section className="profile__clothing-item">
        <ClothingSection onCardClick ={onCardClick}/>
      </section>
    </div>
  );
}

export default Profile;
