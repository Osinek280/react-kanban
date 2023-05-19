// AddEditTaskModal.js
import React, { useContext } from 'react';
import './taskForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TasksContext } from '../context';
import { SectionContext } from '../sectionContext';

function AddEditTaskModal({ onClose, argument }) {
  const { section } = useContext(SectionContext)
  const { tasks, replaceTask } = useContext(TasksContext)
  
  const sectionList = section
  const taskList = tasks

  let date = {
    id: '',
    name: '',
    description: '',
    Subtasks: [],
    category: ''
  }

  if(argument !== 'create'){
    date = taskList[argument]
  }

  const closeFromClick = (e) => {
    if(e.target.className === 'form-container') {
      onClose()
    }
  }

  const addSaveTask = (e) => {
    const NewTask = {
      id: argument !== 'create' ? argument : taskList.length,
      name: document.querySelector('#task-name-input').value,
      description: document.querySelector('#task-description-input').value,
      Subtasks: Array.from(document.querySelectorAll('.form-input.subtask-input')).map((div) => div.value),
      category: document.querySelector('.form-select').value
    };   
    
    if (argument === 'create') {
      replaceTask([...taskList, NewTask])
    }else {
      const updatedTaskList = taskList
      updatedTaskList[argument] = NewTask
      replaceTask(updatedTaskList)
    }

    onClose()
  }

  return (
    <div className="form-container" onClick={closeFromClick}>
      {/* Modal Section */}
      <div className="form">
        <h3 className="form-heading">
          {argument === 'create' ? 'Add New' : 'Edit Task'}
        </h3>

        {/* Task Name */}
        <div className="form-group">
          <label className="form-label">Task Name</label>
          <input
            id="task-name-input"
            type="text"
            className="form-input"
            placeholder="e.g Take coffee break"
            defaultValue={date.name}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            id="task-description-input"
            className="form-textarea"
            placeholder="e.g. It's always good to take a break..."
            defaultValue={date.description}
          />
        </div>

        {/* Subtasks */}
        <div className="form-group">
      <label className="form-label">Subtasks</label>
      {date.Subtasks.map((item, index) => (
          <div key={index} className="subtasks-container">
            <input
              type="text"
              className="form-input subtask-input"
              placeholder="e.g Take coffee break"
            />
            <FontAwesomeIcon
              icon={faTimes}
            />
          </div>
          
        ))}
      <button className="add-subtask-button">
        Add New Subtask
      </button>
    </div>

        {/* Current Status */}
        <div className="form-group" id="current-status-group">
          <label className="form-label">Current Status</label>
          <select className="form-select" defaultValue={date.category}>
            {sectionList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button className="form-submit-button" onClick={addSaveTask}>
            {argument === 'create' ? 'Create Task' : 'Save Edit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;