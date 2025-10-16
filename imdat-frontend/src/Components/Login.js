import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/logo.jpeg";
import "../styles/Login.css";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";

const getLocation = async (setLocation, setShowLocationModal) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log("latitude,longitude", latitude + " " + longitude);
        setShowLocationModal(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setShowLocationModal(false);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setShowLocationModal(false);
  }
};

const onSubmit = async (values, actions, navigate, location) => {
  if (location) {
    sessionStorage.setItem("userLatitude", location.latitude);
    sessionStorage.setItem("userLongitude", location.longitude);
  }
  const payload = {
    email: values.email,
    password: values.password,
    latitude: sessionStorage.getItem("userLatitude"),
    longitude: sessionStorage.getItem("userLongitude"),
  };

  try {
    const response = await axios.post(
      "http://localhost:4444/api/v1/test/login",
      payload
    );

    console.log(response);
    if (response.data.email !== null) {
      sessionStorage.setItem("userEmail", values.email);
      console.log("email", sessionStorage.getItem("userEmail"));
      sessionStorage.setItem("firstName", response.data.firstName);
      sessionStorage.setItem("lastName", response.data.lastName);

      console.log("Giriş başarılı");
      navigate("/main");
    } else {
      alert("Böyle bir E-posta/şifre kombinasyonu mevcut değil !");
      console.error("Login failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error during login request:", error);
  }

  actions.resetForm();
};

function Login(props) {
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleChange,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      setSubmitting(true);
      onSubmit(values, actions, navigate, location);
    },
  });

  useEffect(() => {
    getLocation(setLocation, setShowLocationModal);
  }, []);

  return (
    <div className="loginDiv">
      <div
        className="img-logo"
        style={{ backgroundImage: `url(${LogoImage})` }}
      ></div>
      <h2>İmdat</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="login-label">E-posta Adresi</label>
          <input
            type="email"
            name="email"
            value={values.email}
            id="email"
            onChange={handleChange}
            className={errors.email ? "input-error login-input" : "login-input"}
            placeholder="Lütfen email giriniz.."
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label className="login-label">Şifre</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            className={
              errors.password ? "input-error login-input" : "login-input"
            }
            placeholder="Lütfen şifre giriniz.."
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="link-div">
          <a href="#" className="login-link">
            Şifremi unuttum
          </a>
        </div>
        <button disabled={isSubmitting} className="login-button" type="submit">
          Giriş Yap
        </button>
        <button type='button' className='login-button' onClick={() => navigate('/Signup')}>
          Kayıt Ol
        </button>
      </form>

      {/* {showLocationModal && (
        <div className="location-modal">
          <div className="location-modal-content">
            <h2>Konum İzni</h2>
            <p>Giriş yapmak için konum bilginizi paylaşmak ister misiniz?</p>
            <button onClick={() => setShowLocationModal(false)}>Evet</button>
            <button onClick={() => setShowLocationModal(false)}>Hayır</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Login;
