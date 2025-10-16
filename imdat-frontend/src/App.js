import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Main from "./Components/Main";
import CreatePosts from "./Components/Createposts";
import PostList from "./Components/PostList";
import Map from "./Components/Map";
import PostShow from "./Components/PostShow"; // Import PostShow component
import Profile from "./Components/Profile";
import HelpPosts from "./Components/HelpPosts"
import Signup from './Components/Signup';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/createposts" element={<CreatePosts />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/map" element={<Map />} />
          <Route exact path="/" element={<Map />} />{" "}
          {/* Ensure exact path for Map */}
          <Route path="/post/:id" element={<PostShow />} />{" "}
          {/* Route for PostShow */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/HelpPosts" element={<HelpPosts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help-posts" component={HelpPosts} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
