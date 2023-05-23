import React, { useEffect, useState, useContext } from 'react';
import dragula from 'dragula';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import './task.css';
import AddEditTaskModal from '../taskForm/taskForm';
import { TasksContext } from '../context';
import { SectionContext } from '../sectionContext';
import emptyState from '../../image/undraw_empty_re_opql.svg';
import Navbar from '../navabr/navbar';
// import TaskModal from '../taskModal/taskModal';

function Task() {
  const { tasks, replaceTask } = useContext(TasksContext);

  const taskList = tasks;

  const { section, replaceSection } = useContext(SectionContext);

  const [modalArgument, setModalArgument] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextIndex, setContextIndex] = useState(-1);

  const handleToggleModal = (argument) => {
    setModalArgument(argument);
    setIsModalOpen(!isModalOpen);
  };

  const handleToggleContext = (index) => {
    if (contextIndex === index) {
      setContextIndex(-1);
    } else {
      setContextIndex(index);
    }
  };

  const updateName = (event) => {
    const { value, defaultValue } = event.target;
    const updatedSection = section.map((item) => {
      if (item === defaultValue) {
        return value;
      }
      return item;
    });

    const updatedTasks = tasks.map((task) => {
      if (task.category === defaultValue) {
        return {
          ...task,
          category: value,
        };
      }
      return task;
    });

    replaceTask(updatedTasks);

    replaceSection(updatedSection);
  };

  useEffect(() => {
    const drake = dragula([], {});

    drake.on('drop', function (element, target) {
      const newArray = taskList.map((task) => {
        if (task.id === element.id) {
          return { ...task, category: target.id };
        }
        return task;
      });

      replaceTask(newArray);
    });

    const containers = Array.from(document.querySelectorAll('.task-container ul'));
    containers.forEach((con) => {
      drake.containers.push(con);
    });

    return () => {
      drake.destroy();
    };
  }, [replaceTask, taskList]);

  return (
    <main className="main-container">
      {isModalOpen && <AddEditTaskModal onClose={handleToggleModal} argument={modalArgument} />}
      <Navbar onClose={() => handleToggleModal('create')}/>
      <div className="container-for-task">
        {section.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-text">No sections available</span>
            <img src={emptyState} alt="empty-state-img" />
          </div>
        ) : (
          section.map((item, index) => (
            <div key={index} id={item} className="task-container">
              <header className="task-container-header">
                <input
                  defaultValue={item}
                  onBlur={updateName}
                  spellCheck={false}
                  className="task-container-header-input"
                />
                <span className='context-btn' onClick={() => handleToggleContext(index)}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                />
                </span>
              </header>
              <ul id={item} className="task-list">
                {taskList
                  .filter((task) => task.category === item)
                  .map((task, taskIndex) => (
                    <li
                      className="task"
                      key={taskIndex}
                      id={task.id}
                      onClick={() => handleToggleModal(task.id)}
                    >
                      <span
                        className="task-primary"
                        style={{
                          color:
                            task.priority === 'low'
                              ? '#00aa00'
                              : task.priority === 'medium'
                              ? '#007bff'
                              : '#ff0000',
                        }}
                      >
                        {task.priority + ' Primary'}
                      </span>
                      <span className="task-name">{task.name}</span>
                    </li>
                  ))}
              </ul>
              {contextIndex === index && (
                <span className="context-menu">
                  <span className="item">Add New Task</span>
                  <span className="item">Delete</span>
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Task;
