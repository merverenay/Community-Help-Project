import React, { useState, useEffect } from 'react';
import '../styles/Main.css';
import PostList from './PostList';
import MenuAppBar from './MenuAppBar';
import MainCard from './MainCard';
import '../styles/Main.css';

function Main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    // HTTP isteği yapılacak endpoint
    const endpoint = `http://localhost:4444/api/posts/getAllPosts/${email}`;

    // Veriyi çekmek için fonksiyon (Ajax kullanarak)
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', endpoint, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setPosts(data); // Gelen verileri state'e set et
        } else if (xhr.readyState === 4) {
          console.error('Error fetching posts:', xhr.statusText);
        }
      };
      xhr.send();
    };

    // Sayfa yüklendiğinde veriyi çek
    fetchData();

    // Her 5 saniyede bir veriyi çek
    const intervalId = setInterval(fetchData, 3000);

    // Cleanup function: bileşen unmount edildiğinde interval'i temizle
    return () => clearInterval(intervalId);
  }, []); // Boş dependency array ile sadece bir kez çalışmasını sağlarız

  const createPost = (status, address, image) => {
    const createdPost = [
      ...posts,
      {
        id: Math.round(Math.random() * 9999999),
        status,
        address,
        image
      }
    ];
    setPosts(createdPost);
  };

  return (
    <div className='mainPage'>
      <div className='header'>
        <MenuAppBar />
      </div>
      <div className='mainContent'>
        <div className='sidebar'>
          <MainCard onCreate={createPost} />
        </div>
        <div className='postContainer'>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default Main;