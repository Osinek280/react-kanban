import React, { useContext, useState } from "react";
import { ApiContext } from "../RestClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function LoginModal({ toggleModal }) {
  const { getItemFromBackEnd } = useContext(ApiContext);

  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    const loginData = {
      username: username.value,
      password: password.value,
    };

    try {
      const response = await fetch('http://127.0.0.1:8888/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        getItemFromBackEnd();
        console.log('Zalogowano pomyślnie!');
      } else {
        throw new Error('Błąd logowania');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="user-box">
          <input type="text" name="username" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type={passwordVisibly ? 'text' : 'password'} name="password" required />
          <label>Password</label>
          <span className="deputy" onClick={() => { setPasswordVisibly(!passwordVisibly) }}>
            {passwordVisibly ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </span>
        </div>
        <div className="toggle_label">
          <a href="#" onClick={() => {toggleModal('register')}}>Sign up</a>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginModal;
