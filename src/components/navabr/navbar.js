import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

function Navbar({ onClose, focus, from }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <header className="main-header">
      <span className="text">Projects</span>
      {from !== 'task' && (
        <span className="search">
          <input
            ref={inputRef}
            onInput={(e) => onClose(e.target.value)} 
            className="search-input" 
            placeholder="Search"
          />
        </span>
      )}
      <button className="new-task-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faPlus} />
        Add New Task
      </button>
      <button className="new-task-btn">
        <FontAwesomeIcon icon={faPlus} />
        Add New Section
      </button>
    </header>
  );
}

export default Navbar;
