import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/PostShow.css";
import { useLocation } from "react-router-dom";
import AcildurumButton from "./AcildurumButton";
import BagisButton from "./BagisButton";

const PostShow = ({ post, showEmergencyButton = true, showDonationButton = true, deletePost, onWithdraw, showWithdrawButton = false }) => {
  const handleHelpClick = () => {
    setTimeout(() => {
      deletePost(post.id); // Assuming deletePost is a function passed as a prop to handle post deletion
    }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds
  };


  const location = useLocation();
  if (post === undefined) {
    post = location?.state?.post;

    if (post === undefined) return <div>not found</div>;
  }
  const handleWithdraw = () => {
    if (onWithdraw) onWithdraw(post.id);
  };////////

  console.log(post);
  console.log("isEMERGENCYBUTTON", post.isEmergencyPost)
  let base64String = "";
  if (post.imageBase64) {
    base64String = btoa(
      new Uint8Array(post.imageBase64).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  }

  return (
    <div className='postShow-mainDiv'>
      <div className='postShow-top'>
        <div className='avatar-container'>
          <PersonIcon style={{ marginRight: '5px' }} />
          <div>{post.firstName} {post.lastName}</div>
        </div>
      </div>
      <div className='postShow-body'>
        <p className='postShow-status'>{post.email}</p>
        <p className='postShow-address'>{post.description}</p>
        {post.imageBase64 && (
          <div className='postShow-image'>
            <img src={`data:image/jpeg;base64,${post.imageBase64}`} alt='Post Image' />
          </div>
        )}
        {post.isEmergencyPost && showEmergencyButton && (
          <AcildurumButton post={post} />
        )}
        {!post.isEmergencyPost && showDonationButton && (
          <BagisButton post={post} />
        )}
        {showWithdrawButton && (
          <button onClick={handleWithdraw} className="withdrawButton">Yardımı Geri Çek</button>
        )}
      </div>
    </div>
  );
};
export default PostShow;
