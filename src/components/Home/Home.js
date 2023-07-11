import React, { useEffect, useState } from "react";
import Navbar from "../navabr/navbar";
import "./Home.css";
import KanbanImage from "../../image/erk695fjx3f5a9x7.svg";
import LoginModal from "../loginModal/loginModal";
import RegisterModal from "../registerModal/registerModal";
import EditAccount from "../EditAccount/EditAccount";
import jwt_decode from "jwt-decode";

function Home() {
  const [username, setUsername] = useState("");
  const [currentModal, setCurrentModal] = useState("login");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
    }
  }, [token]);

  const toggleModal = (argument) => {
    setCurrentModal(argument);
  };

  return (
    <div className="main-container">
      <Navbar name={`Hello ${username}`} from="home" onOpen={() => toggleModal('edit-account')} />
      <div className="home-container">
        <header className="home-header">What do you want to do today?</header>
        <div className="container">
          <div className="kanban-state">
            <span className="kanban-state-text">Kanban</span>
            <img src={KanbanImage} alt="kanban-img" />
          </div>
          <div className="home-right-side">
            {!localStorage.getItem("token") ? (
              <div className="login-register-container">
                {currentModal === "login" ? (
                  <LoginModal toggleModal={toggleModal} />
                ) : currentModal === "register" ? (
                  <RegisterModal toggleModal={toggleModal} />
                ) : null}
              </div>
            ) : (
              currentModal === 'edit-account' ? (
                <EditAccount />
              ) : (
                <div className="kanban-description">
                  <h2 className="kanban-description-header">What is Kanban Method?</h2>
                  <p>
                    The Kanban Method is a means to design, manage, and improve flow systems for knowledge work.
                    The method also allows organizations to start with their existing workflow and drive evolutionary change.
                    They can do this by visualizing their flow of work, limit work in progress (WIP), and stop starting and start finishing.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
