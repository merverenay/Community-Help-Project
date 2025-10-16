import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PostShow from "./PostShow";
//import "../styles/PostShow.css";
import BagisButton from "./BagisButton";

import MenuAppBar from "./MenuAppBar";

import PostList from "./PostList";
//import '../styles/Main.css';
import '../styles/HelpPost.css';

function HelpPosts() {
    const [posts, setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define the function outside useEffect using useCallback
    const withdrawHelp = useCallback(async (postId) => {
        console.log("POSTID", postId)


        const email = sessionStorage.getItem('userEmail');
        console.log("EMAIL", email)



        if (!email) {
            console.error('No email found in sessionStorage');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4444/api/posts/removeHelpToPost`, {

                email: email,
                postId: postId
            });

            console.log("Help withdrawn successfully", response.data);
            // Optionally update UI or state based on response
            // Update the posts array to remove the withdrawn post
            setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error withdrawing help:', error);
        }
    }, []);  // if dependent on dynamic variables, include them in this dependency array

    useEffect(() => {
        const fetchPostById = async (postId) => {
            try {
                const response = await axios.get(`http://localhost:4444/api/posts/getPostById/${postId}`);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch post details:', error);
                return undefined;
            }
        };

        const fetchUserDetailsAndPosts = async () => {
            try {
                const email = sessionStorage.getItem('userEmail');
                if (!email) {
                    throw new Error('No email found in sessionStorage');
                }

                const userResponse = await axios.get(`http://localhost:4444/api/v1/test/user/${email}`);
                setUserDetails(userResponse.data);

                if (!userResponse.data || !userResponse.data.helpToPostlist) {
                    throw new Error('Unexpected API response structure');
                }

                const postIds = userResponse.data.helpToPostlist;
                if (postIds.length === 0) {
                    throw new Error('No posts or empty posts list.');
                }

                const fetchPosts = await Promise.all(postIds.map(fetchPostById));
                setPosts(fetchPosts.filter(post => post !== undefined));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetailsAndPosts();
    }, [withdrawHelp]); // make sure to include withdrawHelp here if its logic depends on the fetched data

    if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error}</div>;

    return (
        <div className='helpPostPageDiv'>
            <div>
                <MenuAppBar />
            </div>
            <div className='postContainer'>
                {posts.map((post, index) => (
                    <PostShow
                        key={index}
                        post={post}
                        showEmergencyButton={!post.isEmergencyPost}
                        showDonationButton={false}
                        showWithdrawButton={post.isEmergencyPost}
                        onWithdraw={withdrawHelp}

                    />
                ))}
                {/* <PostList posts={posts} /> */}
            </div>
        </div>
    );

}

export default HelpPosts;
