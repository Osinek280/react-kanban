import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

function Navbar({ onClose, onOpen, focus, from, name }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <header className="main-header">
      <span className="text">{name === undefined ? 'Files' : name}</span>
      {from === 'Library' && (
        <>
          <span className="search">
            <input
              ref={inputRef}
              onInput={(e) => onClose(e.target.value)} 
              className="search-input" 
              placeholder="Search"
            />
          </span>
          <button className="new-kanban-btn" onClick={onOpen}>
            <FontAwesomeIcon icon={faPlus} />
            Add New Kanban
          </button>
        </>
      )}
      {from === 'task' && (
        <>
          <button className="new-task-btn" onClick={() => onClose(false)}>
            <FontAwesomeIcon icon={faPlus} />
            Add New Task
          </button>
          <button className="new-section-btn" onClick={onOpen}>
            <FontAwesomeIcon icon={faPlus} />
            Add New Section
          </button>
        </>
      )}
      {from === 'home' && (
        <>
          <button className="personal-data-btn" onClick={onOpen}>
            Personal Data
          </button>
        </>
      )}
    </header>
  );
}

export default Navbar;
