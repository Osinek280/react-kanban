import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onClose, files }) => {
  const [resize, setResize] = useState(false);

  return (
    <nav className="navbar">
      <span className='icon' onClick={() => {onClose('HOME')}}>
        <FontAwesomeIcon icon={faHome} className="my-icon" />
        <span id='tool-tip-text'>Home</span>
        {resize && 'HOME'}
      </span>
      <span className='icon' onClick={() => {onClose('SEARCH')}}>
        <FontAwesomeIcon icon={faSearch} className="my-icon" />
        <span id='tool-tip-text'>Search</span>
        {resize && 'Search'}
      </span>
      <span className='icon'>
        <FontAwesomeIcon icon={faBook} className="my-icon" onClick={() => {onClose('LIBRALY')}}/>
        <span id='tool-tip-text'>Library</span>
        {resize && 'Library'}
      </span>
      <button className="resize-btn" onClick={() => setResize(!resize)}>
        {resize === false ? <FontAwesomeIcon icon={faArrowRight} className='arrow-btn-icon' />
          : <FontAwesomeIcon icon={faArrowLeft} className='arrow-btn-icon' />}
      </button>
    </nav>
  );
};

export default Sidebar;
