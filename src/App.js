import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Task from './components/task/task';
import { TasksProvider } from './components/context';
import { SectionProvider } from './components/sectionContext';

function App() {
  return (
    <div className="App">
      <TasksProvider>
        <SectionProvider>
          <Navbar />
          <Task />
        </SectionProvider>
      </TasksProvider>
    </div>
  );
}

export default App;
