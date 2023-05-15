import { useEffect, useState } from 'react';
import dragula from 'dragula';
import './task.css';

const drake = dragula([], {});

function Task() {
  const [list] = useState([
    {
      name: "to do",
      task: ['buy car wash', 'like Walter White']
    },
    {
      name: "to do",
      task: ['buy car wash like Walter White']
    }    
  ]);

  useEffect(() => {
    const containers = Array.from(document.querySelectorAll('.task-container ul'));
    containers.forEach((con) => {
      drake.containers.push(con);
    })
  }, []);

  return (
    <main className="main-container">
        <header className="main-header">
          <span>Projects</span>
        </header>
        <div className="container-for-task">
          {list.map((item, index) => (
            <div key={index} className='task-container'>
              <header className="task-container-header">{item.name}</header>
              <ul>
                {item.task.map((task, taskIndex) => (
                  <li className='task' key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </main>
  );
}

export default Task;
