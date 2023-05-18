import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [resize, setResize] = useState(false);

  return (
    <nav className="navbar">
      <span className='icon'>
        <FontAwesomeIcon icon={faHome} className="my-icon" />
        <span id='tool-tip-text'>Home</span>
        {resize && 'HOME'}
      </span>
      <span className='icon'>
        <FontAwesomeIcon icon={faSearch} className="my-icon" />
        <span id='tool-tip-text'>Search</span>
        {resize && 'Search'}
      </span>
      <span className='icon'>
        <FontAwesomeIcon icon={faBook} className="my-icon" />
        <span id='tool-tip-text'>Libraly</span>
        {resize && 'Library'}
      </span>
      <button className="resize-btn" onClick={() => setResize(!resize)}>
        {resize === false ? <FontAwesomeIcon icon={faArrowRight} className='arrow-btn-icon'/>
         : <FontAwesomeIcon icon={faArrowLeft} className='arrow-btn-icon' />}
      </button>
    </nav>
  );
};

export default Navbar;
