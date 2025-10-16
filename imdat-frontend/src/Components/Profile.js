import "../styles/Profil.css";
import MenuAppBar from "./MenuAppBar";

function Profile() {
  return (
    <div className="profilPageDiv">
      <div>
        <MenuAppBar />
      </div>
      <div className="profilMainDiv">
        <h3 style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
          Kişisel Bilgiler
        </h3>
        <div className="Profile Box">
          <div className="nameDiv">
            <label>İsim</label>
            <p>{sessionStorage.getItem("firstName")}</p>
          </div>
          <div className="lastNameDiv">
            <label>Soyisim</label>
            <p>{sessionStorage.getItem("lastName")}</p>
          </div>
          <div className="emailDiv">
            <label>E-posta</label>
            <p>{sessionStorage.getItem("userEmail")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
