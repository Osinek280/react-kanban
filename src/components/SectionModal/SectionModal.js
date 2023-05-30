import React, { useState, useContext } from "react";
import { KanbanContext } from "../KanbanContext";

function SectionModal({ onClose, fromTask, updateFiles }) {

  const { Kanban, replaceSections } = useContext(KanbanContext);

  const addNewSection = () => {
    const sectionNameInput = document.querySelector("#section-name-input");
    const sectionName = sectionNameInput.value.trim();
    
    replaceSections([...Kanban.section, sectionName]);
    onClose()
  };

  const addNewKanban = () => {
    const sectionNameInput = document.querySelector("#section-name-input");
    const sectionName = sectionNameInput.value.trim();
    console.log(sectionName);
    fetch('http://127.0.0.1:3333/files', {
      method: 'POST',
      body: JSON.stringify([sectionName]),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update tasks on the server');
      }
      updateFiles();
      onClose();
    })
    .catch((error) => {
      console.error(error);
    });
  }  

  return (
    <div className="form-container">
      <div className="form">
        <div className="form-group">
          <label className="form-label" style={{ marginBottom: "3px" }}>
            Section Name
          </label>
          <input
            id="section-name-input"
            type="text"
            className={'form-input'}
            placeholder="e.g Take coffee break"
          />

          <button
            className="form-submit-button"
            type="submit"
            onClick={fromTask === true ? addNewSection : addNewKanban}
          >
            Add new Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionModal;
