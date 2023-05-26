import React, { useState, useContext } from "react";
import { KanbanContext } from "../KanbanContext";

function SectionModal({ onClose }) {
  const { Kanban, replaceSections } = useContext(KanbanContext);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const addNewSection = () => {
    const sectionNameInput = document.querySelector("#section-name-input");
    const sectionName = sectionNameInput.value.trim();
    if (sectionName) {
      replaceSections([...Kanban.section, sectionName]);
      onClose();
    } else {
      setIsInputEmpty(true);
    }
  };

  const handleInputChange = () => {
    setIsInputEmpty(false);
  };

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
            className={`form-input ${isInputEmpty ? "form-input-error" : ""}`}
            placeholder="e.g Take coffee break"
            onChange={handleInputChange}
          />
          {isInputEmpty && (
            <span className="form-input-error-message">
              Field cannot be empty
            </span>
          )}

          <button
            className="form-submit-button"
            type="submit"
            onClick={addNewSection}
          >
            Add new Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionModal;
