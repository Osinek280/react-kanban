import React, { useContext, useState } from 'react';
import './taskForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { KanbanContext } from '../KanbanContext';

function AddEditTaskModal({ onClose, argument, category }) {
  const { Kanban, replaceTasks } = useContext(KanbanContext);
  const sectionList = Kanban.section;
  const taskList = Kanban.task;

  let date = {
    id: '',
    name: '',
    description: '',
    Subtasks: [],
    category: '',
    priority: 'low'
  };

  if (argument !== 'create') {
    date = argument;
  }

  if (category !== undefined) date.category = category;

  const [priority, setPriority] = useState(date.priority);
  const [subtasks, setSubtasks] = useState(date.Subtasks || []);

  const closeFromClick = (e) => {
    if (e.target.className === 'form-container') {
      onClose();
    }
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubtaskChange = (e, index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const addSaveTask = (e) => {
    const NewTask = {
      id: argument !== 'create' ? argument : taskList.length,
      name: document.querySelector('#task-name-input').value,
      description: document.querySelector('#task-description-input').value,
      Subtasks: subtasks,
      category: document.querySelector('.form-select').value,
      priority: priority
    };

    if (argument === 'create') {
      replaceTasks([...taskList, NewTask]);
    } else {
      const updatedTaskList = taskList.map((task) => {
        if (task === argument) {
          return NewTask;
        }
        return task;
      });

      replaceTasks(updatedTaskList);
    }

    onClose();
  };

  return (
    <div className="form-container" onClick={closeFromClick}>
      {/* Modal Section */}
      <div className="form">
        <h3 className="form-heading">{argument === 'create' ? 'Add New' : 'Edit Task'}</h3>
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
          {subtasks.length > 0 ? (
            subtasks.map((item, index) => (
              <div key={index} className="subtasks-container">
                <input
                  type="text"
                  className="form-input subtask-input"
                  placeholder="e.g Take coffee break"
                  value={item}
                  onChange={(e) => handleSubtaskChange(e, index)}
                />
                <FontAwesomeIcon icon={faTimes} onClick={() => removeSubtask(index)} />
              </div>
            ))
          ) : (
            <span className='subtask-empty-state'>No subtasks available!</span>
          )}
          <button className="add-subtask-button" onClick={addSubtask}>
            Add New Subtask
          </button>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label className="form-label">Priority</label>
          <div className="priority-container">
            <span className="priority">
              <label className="priority-label" htmlFor="low">
                Low Priority
              </label>
              <input
                className="priority-input"
                type="checkbox"
                id="low"
                value="low"
                checked={priority === 'low'}
                onChange={handlePriorityChange}
              />
            </span>
            <span className="priority">
              <label className="priority-label" htmlFor="medium">
                Medium Priority
              </label>
              <input
                className="priority-input"
                type="checkbox"
                id="medium"
                value="medium"
                checked={priority === 'medium'}
                onChange={handlePriorityChange}
              />
            </span>
            <span className="priority">
              <label className="priority-label" htmlFor="high">
                High Priority
              </label>
              <input
                className="priority-input"
                type="checkbox"
                id="high"
                value="high"
                checked={priority === 'high'}
                onChange={handlePriorityChange}
              />
            </span>
          </div>
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
