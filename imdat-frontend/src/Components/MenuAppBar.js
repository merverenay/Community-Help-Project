import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/MenuAppBar.css';
import LogoImage from '../assets/logo.jpeg';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import LocationIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';


import { MenuBook } from '@mui/icons-material';
import Dropdown from './Dropdown';


function MenuAppBar() {
  const navigate = useNavigate();
  const navigateToMainPage = async () => {
    navigate("/main")

  }

  const navigateToLocation = async () => {
    try {
      const userEmail = sessionStorage.getItem("userEmail");
      console.log("userEmail", userEmail);
      const response = await axios.get(`http://localhost:4444/api/posts/getPostsAroundUser/${userEmail}`);
      const locations = response.data;
      console.log("response", locations);
      navigate('/map', { state: { locations } });
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error as needed (e.g., show user a message)
    }
  };
  const navigateToHelpPosts = () => {
    // Function to navigate to HelpPosts
    navigate('/HelpPosts');
  };

  return (
    <div>
      <div className='navbar'>

        <div className="img-navbarLogo" style={{ backgroundImage: `url(${LogoImage})`, width: '50px' }}></div>
        <div className='navbarTrio'>
          <button id="buttonMainPage" style={{ backgroundColor: 'white', cursor: 'pointer', border: 'none', height: '7vmin' }} onClick={navigateToMainPage}>
            <OtherHousesOutlinedIcon />
          </button>
          <button id="buttonLocation" style={{ cursor: 'pointer', backgroundColor: 'white', border: 'none', height: '5vmin' }} onClick={navigateToLocation}>
            <LocationIcon />
          </button>
          <button style={{ cursor: 'pointer', backgroundColor: 'white', border: 'none', height: '5vmin' }} onClick={navigateToHelpPosts}>
            <MenuBook />
          </button>
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default MenuAppBar;
