
import React, { useState } from 'react';
import axios from 'axios';

const AcildurumButton = ({ post }) => {
    const [isTepkiDisabled, setIsTepkiDisabled] = useState(false);

    const handleTepkiClick = () => {
        setIsTepkiDisabled(true);
    };

    const handleYardimClick = () => {
        const email = sessionStorage.getItem('userEmail');
        const postId = post.id;
        console.log("emial", email);
        console.log('AcildurumButton postId:', postId);
        console.log('AcildurumButton postId:', post.id);

        axios.put('http://localhost:4444/api/posts/helpToPost', {
            email,
            postId
        })
            .then(response => {
                console.log('Help to post response:', response.data);
                // Handle response if needed
            })
            .catch(error => {
                console.error('Error helping to post:', error);
            });
    };

    return (
        <div className='acildurum-button-container'>
            <button
                onClick={handleTepkiClick}
                disabled={isTepkiDisabled}
                style={{ marginRight: '10px', backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Tepki Ver
            </button>
            <button
                onClick={handleYardimClick}
                style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Yardım Et
            </button>
        </div>
    );
};

export default AcildurumButton;
