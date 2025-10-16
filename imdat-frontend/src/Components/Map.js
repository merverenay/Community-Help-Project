import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import MenuAppBar from "./MenuAppBar";
import "../styles/Map.css";

function Map() {
  const mapContainerStyle = {
    width: "100%",
    height: "90vh",
  };
  const [posts, setPosts] = useState([]);
  const createPost = (status, address, image) => {
    const createdPost = [
      ...posts,
      {
        id: Math.round(Math.random() * 9999999),
        status,
        address,
        image,
      },
    ];
    setPosts(createdPost);
  };

  const [currentPosition, setCurrentPosition] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionLat = parseFloat(sessionStorage.getItem("userLatitude"));
    const sessionLng = parseFloat(sessionStorage.getItem("userLongitude"));
    console.log(sessionLat, sessionLng);
    if (!isNaN(sessionLat) && !isNaN(sessionLng)) {
      setCurrentPosition({ lat: sessionLat, lng: sessionLng });
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.locations) {
      console.log(location.state.locations);
      setLocations(location.state.locations);
    }
  }, [location]);

  const handleMarkerClick = (location) => {
    setSelectedMarker(location);
  };

  const handlePostClick = (post) => {
    console.log("**** - handle post click" + post.id);
    const endpoint = `http://localhost:4444/api/posts/getPostById/${post.id}`;

    axios
      .get(endpoint)
      .then((response) => {
        const postData = response.data;
        console.log(response);
        navigate(`/post/${post.id}`, { state: { post: postData } });
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  return (
    <div className="mapPageDiv">
      <div>
        <MenuAppBar />
      </div>
      <LoadScript googleMapsApiKey="AIzaSyD-sV2HwR7QS2Oni6Jz9IuyPMD448s5TFY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={
            currentPosition ||
            (locations.length > 0 ? locations[0] : { lat: 0, lng: 0 })
          }
          zoom={10}
        >
          {/* Render markers */}
          {currentPosition && (
            <Marker
              position={currentPosition}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              onClick={() => handleMarkerClick(currentPosition)}
            />
          )}

          {locations?.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4>Location Info</h4>
                <img
                  src={selectedMarker.imageUrl} // Assuming your location data includes an imageUrl field
                  alt="location"
                  style={{ width: "100px", height: "100px" }}
                />
                <p>{selectedMarker.description}</p>{" "}
                {/* Assuming your location data includes a description field */}
                <button onClick={() => handlePostClick(selectedMarker)}>
                  View Post
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
