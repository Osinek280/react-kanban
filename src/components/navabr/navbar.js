import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onClose }) {
  return (
    <header className="main-header">
      <span className="text">Projects</span>
      <button className="new-task-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faPlus} />
        Add New Task
      </button>
    </header>
  );
}

export default Navbar;
