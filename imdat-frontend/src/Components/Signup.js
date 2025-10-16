import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoImage from '../assets/logo.jpeg';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleSignup = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4444/api/v1/test/register', {
                firstName,
                lastName,
                email,
                password,
                latitude: location?.latitude,
                longitude: location?.longitude
            });

            console.log('Signup response:', response.data);  // Debugging: Log the response data

            if (response.data.userId) {
                sessionStorage.setItem('userId', response.data.userId);
                sessionStorage.setItem('firstName', firstName);
                sessionStorage.setItem('lastName', lastName);
                sessionStorage.setItem('email', email);

                console.log(`Signup successful! Your user ID is: ${response.data.userId}`);
                setMessage('Signup successful!');
                navigate('/main');  // Navigating to main page
            } else {
                console.log('No userId received, check backend!');
                navigate('/main');  // Force navigation for testing
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('Signup failed!');
            navigate('/main');  // Force navigation if error for testing
        }
    };
    return (
        <div className='loginDiv'>
            <div className="img-logo" style={{ backgroundImage: `url(${LogoImage})` }}></div>
            <h2>İmdat</h2>
            <form onSubmit={handleSignup} className='login-form'>
                <div>
                    <label className='login-label'>İsim
                        :</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='login-input'
                        placeholder='Please enter your first name'
                    />
                </div>
                <div>
                    <label className='login-label'>Soyisim:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='login-input'
                        placeholder='Please enter your last name'
                    />
                </div>
                <div>
                    <label className='login-label'>E-posta:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='login-input'
                        placeholder='Please enter your email'
                    />
                </div>
                <div>
                    <label className='login-label'>Şifre
                        :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='login-input'
                        placeholder='Please enter your password'
                    />
                </div>
                <div>
                    <label className='login-label'>Şifrenizi tekrar girin:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='login-input'
                        placeholder='Please confirm your password'
                    />
                </div>
                <button type="submit" className='login-button'>Signup</button>
            </form>
            {message && <p>{message}</p>}
            <div className='link-div'>
                <a href='#' className='signup-link' onClick={() => navigate('/')}>Hesabım var</a>
            </div>
        </div>
    );
}

export default Signup;
