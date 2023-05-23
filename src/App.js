import React, { useState, useContext } from 'react';
import './App.css';
import Sidebar from './components/SideBar/Sidebar.js';
import Task from './components/task/task';
import Libraly from './components/Libraly/Libraly';
import { TasksProvider } from './components/context';
import { SectionProvider } from './components/sectionContext';
import { SectionContext } from './components/sectionContext';

function App() {
  const [activeWindow, setActiveWindow] = useState('TASK');
  const toggleWindow = (window) => {
    console.log(window);
    setActiveWindow(window);
  };

  return (
    <div className="App">
      <TasksProvider>
        <SectionProvider>
          <Sidebar onClose={toggleWindow} />
          {activeWindow === 'TASK' && <Task />}
          {activeWindow === 'LIBRALY' && <Libraly />}
        </SectionProvider>
      </TasksProvider>
    </div>
  );
}

export default App;
