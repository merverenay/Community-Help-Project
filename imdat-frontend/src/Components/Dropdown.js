import React from "react";
import { useState } from "react";
import "../styles/Dropdown.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(true);
    navigate("/Profile");
  };

  const handleLogOutClick = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="dropdown">
      <button id="buttonDropdown"
        onClick={toggleDropdown}
        className="dropdown-button"
        style={{
          cursor: "pointer",
          backgroundColor: "white",
          border: "none",
          height: "5vmin",
        }}
      >
        <MenuIcon />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleOptionClick("Option 1")}>Profili Gör</li>
          <li onClick={() => handleLogOutClick()}>Çıkış Yap</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
