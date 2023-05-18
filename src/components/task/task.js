import React, { useEffect, useState, useContext } from 'react';
import dragula from 'dragula';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './task.css';
import AddEditTaskModal from '../taskForm/taskForm';
import { TasksContext } from '../context';
import { SectionContext } from '../sectionContext';

function Task() {
  const { tasks, replaceTask } = useContext(TasksContext);

  const taskList = tasks;

  const { section } = useContext(SectionContext);

  const [modalArgument, setModalArgument] = useState('');

  const handleToggleModal = (argument) => {
    setModalArgument(argument);
    setIsModalOpen(!isModalOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const drake = dragula([], {});

    drake.on('drop', function (element, target, source, sibling) {
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
      <header className="main-header">
        <span className="text">Projects</span>
        <button className="new-task-btn" onClick={() => handleToggleModal('create')}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Task
        </button>
      </header>
      <div className="container-for-task">
        {section.map((item, index) => (
          <div key={index} id={item} className="task-container">
            <header className="task-container-header">
              <input spellCheck={false} defaultValue={item} 
                className='task-container-header-input'></input>
            </header>
            <ul id={item}>
              {taskList
                .filter((task) => task.category === item)
                .map((task, taskIndex) => (
                  <li
                    className="task"
                    key={taskIndex}
                    id={task.id}
                    onClick={() => handleToggleModal(task.id)}
                  >
                    {task.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Task;
