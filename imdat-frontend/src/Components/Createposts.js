
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import '../styles/Post.css';
import { useNavigate } from 'react-router-dom';

function CreatePosts({ onClose }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    const storedUserEmail = sessionStorage.getItem('userEmail');
    const storedLatitude = sessionStorage.getItem('userLatitude');
    const storedLongitude = sessionStorage.getItem('userLongitude');

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
    if (storedLatitude) {
      setLatitude(parseFloat(storedLatitude));
    }
    if (storedLongitude) {
      setLongitude(parseFloat(storedLongitude));
    }
  }, []);

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  }

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  }

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    console.log("clciekd button", buttonType)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('description', status);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (selectedButton === "emergency") {
      formData.append('isEmergencyPost', true);
    } else {
      formData.append('isEmergencyPost', false);
    }
    if (latitude !== null && longitude !== null) {
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
    }

    let endpoint = 'http://localhost:4444/api/posts/create';
    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Post created successfully:', response.data);
      setStatus('');
      setImageFile(null);
      setSelectedButton(null);
      onClose(); // Close the modal or form after successful submission
      navigate('/Main');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <div className='createPost'>
      <div className='createPost-top'>
        <h1 className='createPost-maintitle'>Post Oluştur</h1>
        <button className='createPost-topButton' onClick={onClose}><CloseIcon /></button>
      </div>

      <div className='avatar-container'>
        <div><PersonIcon /></div>
        <div className='avatar-title'>{userName}</div>
      </div>

      <div className='createPost-status'>
        <h4>Durumunuz</h4>
        <input placeholder='Durumunuzu ekleyiniz'
          value={status}
          onChange={handleChange} />
      </div>
      {status.length < 20 && (
        <div className="error">Durum en az 20 karakter olmalıdır.</div>
      )}
      {status.length > 200 && (
        <div className="error">Durum en fazla 200 karakter olabilir.</div>
      )}
      <div className='createPost-photo'>
        <div className='createPost-addPhoto'>
          <div><AddToPhotosIcon /></div>
          <button onClick={handleImageButtonClick} style={{ border: 'none', fontSize: '16px', fontWeight: '700', backgroundColor: 'aliceblue' }}>
            {imageFile ? `Selected: ${imageFile.name}` : 'Fotoğraflar/Videolar Ekle'}
          </button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
        </div>
      </div>
      {!imageFile && (
        <div className="error">Fotoğraf Eklenmeyen Postlar Kabul Edilmemektedir. </div>
      )}
      <div className='createPost-buttons'>
        <button className={`createPost-emergency ${selectedButton === "emergency" ? 'active' : ''}`} onClick={() => handleButtonClick('emergency')}>🚨 Acil Durum</button>
        <button className={`createPost-socialResponsibility ${selectedButton === "socialResponsibility" ? 'active' : ''}`} onClick={() => handleButtonClick('socialResponsibility')}>🤝 Sosyal Sorumluluk</button>
        {!selectedButton && (
          <div className="error">Lütfen Gönderi Türünü Seçiniz. </div>
        )}
      </div>
      <button className='createPost-button' onClick={handleSubmit}>Paylaş</button>

    </div>

  )
}

export default CreatePosts;