import React, { useEffect, useState, useContext } from 'react';
import dragula from 'dragula';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import './task.css';
import AddEditTaskModal from '../taskForm/taskForm';
import emptyState from '../../image/undraw_empty_re_opql.svg';
import Navbar from '../navabr/navbar';
import SectionModal from '../SectionModal/SectionModal';
import { KanbanContext } from '../KanbanContext';

function Task() {
  const { Kanban, replaceTasks, replaceSections, replaceTasksAndSections } = useContext(KanbanContext);

  const taskList = Kanban.task;
  const section = Kanban.section;

  const [modalArgument, setModalArgument] = useState('');
  const [modalCategory, setModalCategory] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  const [contextIndex, setContextIndex] = useState(-1);

  const handleToggleModal = (argument, category) => {
    setModalArgument(argument);
    setModalCategory(category);
    setIsModalOpen(!isModalOpen);
  };

  const handleToggleSectionModal = () => {
    setIsSectionModalOpen(!isSectionModalOpen);
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

    const updatedTasks = taskList.map((task) => {
      if (task.category === defaultValue) {
        return {
          ...task,
          category: value,
        };
      }
      return task;
    });
    replaceTasksAndSections(updatedTasks, updatedSection);
  };

  const removeSection = (index) => {
    const updatedSection = section.slice();
    updatedSection.splice(index, 1);

    const taskArray = taskList.filter((task) => task.category !== section[index]);

    replaceTasksAndSections(taskArray, updatedSection)
  };

  const removeTask = (task) => {
    const updatedTaskList = taskList.filter((taskItem) => taskItem !== task);
    replaceTasks(updatedTaskList)
  }

  useEffect(() => {
    const drake = dragula([], {});

    drake.on('drop', function (element, target, source) {
      const newArray = taskList.map((task) => {
        if (task.id === parseInt(element.id)) {
          return {
            ...task,
            category: target.id,
          };
        }
        return task;
      });
      fetch(`http://127.0.0.1:3333/files/${Kanban.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...Kanban,
          task: newArray,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update tasks on the server');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const containers = Array.from(document.querySelectorAll('.task-container ul'));
    containers.forEach((con) => {
      drake.containers.push(con);
    });

    return () => {
      drake.destroy();
    };
  }, [replaceTasks, taskList]);

  return (
    <main className="main-container">
      {isModalOpen && (
        <AddEditTaskModal onClose={handleToggleModal} argument={modalArgument} category={modalCategory} />
      )}
      {isSectionModalOpen && <SectionModal onClose={handleToggleSectionModal} fromTask={true}/>}
      <Navbar onClose={() => handleToggleModal('create')} from="task" name={Kanban.name} onOpen={handleToggleSectionModal} />
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
                  value={item}
                  onChange={(event) => {
                    const updatedSection = section.map((secItem, secIndex) => {
                      if (secIndex === index) {
                        return event.target.value;
                      }
                      return secItem;
                    });
                    const updatedTasks = taskList.map((task) => {
                      if (task.category === item) {
                        return {
                          ...task,
                          category: event.target.value,
                        };
                      }
                      return task;
                    });
                    replaceTasksAndSections(updatedTasks, updatedSection);
                  }}
                  onBlur={updateName}
                  spellCheck={false}
                  className="task-container-header-input"
                />
                <span className="context-btn" onClick={() => handleToggleContext(index)}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
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
                    onClick={(e) => {
                      const isRemoveIconClicked = e.target.tagName === 'svg' || e.target.tagName === 'path';
                      if (!isRemoveIconClicked) {
                        if(e.target.className !== 'remove-task-btn') {
                          handleToggleModal(task, item);
                        }
                      }
                    }}
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
                    >{task.priority + ' Primary'}</span>
                    <span className="task-name">{task.name}</span>
                    <button className="remove-task-btn" onClick={() => { removeTask(task); }}>
                      <FontAwesomeIcon icon={faTrash} className="remove-task-icon" />
                    </button>
                  </li>
                ))}
              </ul>
              {contextIndex === index && (
                <span className="context-menu">
                  <span className="item" onClick={() => { handleToggleModal('create', item); setContextIndex(-1) }}>
                    Add New Task
                  </span>
                  <span className="item" onClick={(event) => { removeSection(index); setContextIndex(-1) }}>
                    Delete
                  </span>
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
