import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faArrowRightFromBracket, faFile } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onClose, files, logOut, replaceDate }) => {
  return (
    <nav className="navbar">
      <span className='icon' onClick={() => {onClose('HOME')}}>
        <FontAwesomeIcon icon={faHome} className="my-icon" />
        <span id='tool-tip-text'>Home</span>
      </span>
      <span className='icon' onClick={() => {onClose('SEARCH')}}>
        <FontAwesomeIcon icon={faSearch} className="my-icon" />
        <span id='tool-tip-text'>Search</span>
      </span>
      <span className='icon'>
        <FontAwesomeIcon 
          icon={faBook} 
          className="my-icon" 
          onClick={() => {onClose('LIBRARY')}}
        />
        <span id='tool-tip-text'>Library</span>
      </span>
      {files.length !== 0 && <span className='vertical-line'></span>}

      {files.map((file, fileIndex) => (
      <span key={fileIndex} className='icon' onClick={() => {replaceDate(file)}}>
        <FontAwesomeIcon icon={faFile} className="my-icon" />
        <span id='name' className='file-name'>{file.name}</span>
      </span>
      ))}

      {localStorage.getItem("token") && (
        <span className='icon' style={{ marginTop: "auto" }} onClick={logOut}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="my-icon"/>
          {/* <span id='tool-tip-text'>log out</span> */}
        </span>
      )}
    </nav>
  );
};

export default Sidebar;

