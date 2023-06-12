import React, {useState} from 'react';
import './EditAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function EditAccount () {
    const [passwordVisibly, SetPasswordVisibly] = useState(false)

    const editAccountSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = event.target.elements;
    
        const accountData = {
          username: username.value,
          email: email.value,
          password: password.value,
        };

        console.log(accountData)
        const token = localStorage.getItem('token');
    };
  
    return (
    <div className="register-box">
    <h2>Your Account</h2>
    <form onSubmit={editAccountSubmit}>
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
        <span className="deputy" onClick={() => {SetPasswordVisibly(!passwordVisibly)}}>
            {passwordVisibly ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </span>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default EditAccount;