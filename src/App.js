import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import Sidebar from './components/SideBar/Sidebar.js';
import Task from './components/task/task';
import Libraly from './components/Libraly/Libraly';
import { KanbanContext } from './components/KanbanContext';

function App() {
  const [activeWindow, setActiveWindow] = useState('TASK');
  const { Kanban, replaceSections, replaceTasks, replaceKanban } = useContext(KanbanContext);
  
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getItemFromBackEnd();
  }, []);

  function getItemFromBackEnd() {
    return fetch("http://127.0.0.1:3333/files")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.Files && data.Files.length > 0) {
          console.log(data)
          replaceKanban(data.Files[0]);
          setFiles(data.Files)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const toggleWindow = (window) => {
    setActiveWindow(window);
  };

  const replaceDate = (element) => {
    if (element.type === 'file') {
      replaceSections(element.section);
      replaceTasks(element.task);
      setActiveWindow('TASK');
    }
  }

  return (
    <div className="App">
      <Sidebar onClose={toggleWindow} files={files} />
      {activeWindow === 'TASK' && <Task />}
      {activeWindow === 'LIBRALY' && <Libraly files={files} replaceDate={replaceDate} focus={false} />}
      {activeWindow === 'SEARCH' && <Libraly files={files} replaceDate={replaceDate} focus={true} />}
    </div>
  );
}

export default App;
