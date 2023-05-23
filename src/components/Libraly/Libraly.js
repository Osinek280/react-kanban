import React from "react";
import './Libraly.css';
import Navbar from "../navabr/navbar";
import folderIcon from "../../image/files-and-folders.png"

function Libraly() {
  
  const files = [
    {name: 'Sudoku'},{name: 'Polish'},{name: 'school presentation'},
    {name: 'Sudoku'},{name: 'Polish'},{name: 'school presentation'},
    {name: 'Sudoku'},{name: 'Polish'},{name: 'school presentation'},
    {name: 'Sudoku'},{name: 'Polish'},{name: 'school presentation'},
    {name: 'Sudoku'},{name: 'Polish'},{name: 'school presentation'}
  ]

  return (
    <div className="main-container">
      <Navbar />
      <div className="libraly-container">
        {files.map((task, taskIndex) => (
          <div key={taskIndex} className="file">
            <span className="img-box">
              <img src={folderIcon} alt=""></img>
            </span>
            <span>{task.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Libraly;