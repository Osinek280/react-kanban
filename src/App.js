import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import Sidebar from './components/SideBar/Sidebar.js';
import Task from './components/task/task';
import Libraly from './components/Libraly/Libraly';
import { KanbanContext } from './components/KanbanContext';
import Home from './components/Home/Home';
import { ApiContext } from './components/RestClient';

function App() {
  const [activeWindow, setActiveWindow] = useState('HOME');
  const { replaceKanban } = useContext(KanbanContext);
  const { getItemFromBackEnd, files } = useContext(ApiContext)

  // useEffect(() => {
  //   getItemFromBackEnd();
  // }, []);

  const toggleWindow = (window) => {
    setActiveWindow(window);
  };

  const replaceDate = (element) => {
    const kanbanIndex = files.findIndex(file => file === element)
    console.log(kanbanIndex)
    replaceKanban(element)
    setActiveWindow('TASK');


    fetch('http://127.0.0.1:3333/lastFileIndex', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lastFileIndex: kanbanIndex })
    })
      .then(response => {
        console.log('Success');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <Sidebar onClose={toggleWindow} files={files} />
      {activeWindow === 'HOME' && <Home />}
      {activeWindow === 'TASK' && <Task />}
      {activeWindow === 'LIBRALY' && <Libraly files={files} replaceDate={replaceDate} focus={false} updateFiles={getItemFromBackEnd}/>}
      {activeWindow === 'SEARCH' && <Libraly files={files} replaceDate={replaceDate} focus={true} updateFiles={getItemFromBackEnd}/>}
    </div>
  );
}

export default App;
