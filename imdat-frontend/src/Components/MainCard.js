import React from "react";
// import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import "../styles/MainCard.css";
import CreatePosts from "./Createposts";
import { useState } from "react";

function MainCard({ onCreate }) {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <>
      <div className="mainDiv">
        <button
          id="addPost"
          className="createPostButton"
          onClick={() => setShowCreatePost(true)}
        >
          <AddIcon />
        </button>

        <div className="mainContent">
          <h3>Post Oluştur</h3>
          <p>Bir yardım paylaş</p>
        </div>
        {showCreatePost && (
          <div className="popup-background" onClick={() => setShowCreatePost(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <CreatePosts
              onClose={() => setShowCreatePost(false)}
              onCreate={onCreate}/>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MainCard;