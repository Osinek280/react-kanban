import React, {useContext} from "react";
import Navbar from "../navabr/navbar";
import "./Home.css";
import { ApiContext } from "../RestClient";

function Home() {

  const { getItemFromBackEnd } = useContext(ApiContext)

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
  
    const loginData = {
      username: username.value,
      password: password.value,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Logowanie udane!", data.user);
        getItemFromBackEnd(data.user.id)
      } else {
        console.log("Logowanie nieudane");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = event.target.elements;
  
    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:3333/register", {
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
    <div className="main-container">
      <Navbar name={"Hello"} />
      <div className="login-register-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
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
                type="password"
                name="password"
                required
              />
              <label>Password</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
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
                type="password"
                name="password"
                required
              />
              <label>Password</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
