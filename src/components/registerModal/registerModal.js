import React, { useState } from "react";
import './registerModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function RegisterModal({ toggleModal }) {
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = event.target.elements;

    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    try {
      const response = await fetch("http://127.0.0.1:8888/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Rejestracja udana!", data.user);
      } else {
        console.log("Rejestracja nieudana");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-box">
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="email"
            name="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type={passwordVisibly ? 'text' : 'password'}
            name="password"
            required
          />
          <label>Password</label>
          <span className="deputy" onClick={() => { setPasswordVisibly(!passwordVisibly) }}>
            {passwordVisibly ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </span>
        </div>
        <div className="toggle_label">
          <a href="#" onClick={() => {toggleModal('login')}}>Login</a>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterModal;
