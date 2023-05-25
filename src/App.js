import React, { useState, useContext } from 'react';
import './App.css';
import Sidebar from './components/SideBar/Sidebar.js';
import Task from './components/task/task';
import Libraly from './components/Libraly/Libraly';
import { KanbanContext } from './components/KanbanContext';

function App() {
  const [activeWindow, setActiveWindow] = useState('TASK');

  const { replaceSections, replaceTasks } = useContext(KanbanContext)

  const replaceDate = (element) => {
    if(element.type === 'file') {
      replaceSections(element.section)
      replaceTasks(element.task)
      setActiveWindow('TASK')
    }
  }

  const [files] = useState([
    {
      name: 'School',
      type: 'file',
      files: null,
      section: ['To do', 'In progress', 'Done'],
      task: [
        {
          name: 'Study for math test',
          description: 'Review chapters 1-5 and solve practice problems.',
          category: 'To do',
          priority: 'medium'
        },
        {
          name: 'Write essay for English class',
          description: 'Choose a topic and draft an outline for the essay.',
          category: 'To do',
          priority: 'high'
        },
        {
          name: 'Complete science experiment',
          description: 'Gather materials and conduct the experiment following the procedure.',
          category: 'In progress',
          priority: 'medium'
        },
        {
          name: 'Prepare presentation for history project',
          description: 'Research the topic and create slides for the presentation.',
          category: 'In progress',
          priority: 'low'
        },
        {
          name: 'Submit homework assignments',
          description: 'Complete and submit the assigned homework tasks.',
          category: 'Done',
          priority: 'low'
        },
        {
          name: 'Review study notes for upcoming quiz',
          description: 'Go through the notes and summarize key concepts.',
          category: 'Done',
          priority: 'medium'
        },
        // Dodaj więcej zadań dla sekcji "School"
      ]
    },
    {
      name: 'Work',
      type: 'file',
      files: null,
      section: ['To do', 'In progress', 'Done'],
      task: [
        {
          name: 'Prepare monthly report',
          description: 'Gather data and analyze performance to create the report.',
          category: 'To do',
          priority: 'high'
        },
        {
          name: 'Attend team meeting',
          description: 'Participate in the weekly team meeting and provide updates.',
          category: 'To do',
          priority: 'medium'
        },
        {
          name: 'Follow up with clients',
          description: 'Contact clients to address their concerns and provide assistance.',
          category: 'In progress',
          priority: 'medium'
        },
        {
          name: 'Develop new feature for the app',
          description: 'Write code and perform testing for the new feature implementation.',
          category: 'In progress',
          priority: 'high'
        },
        {
          name: 'Finalize project proposal',
          description: 'Review and refine the project proposal document.',
          category: 'Done',
          priority: 'medium'
        },
        {
          name: 'Attend training workshop',
          description: 'Participate in a professional development workshop.',
          category: 'Done',
          priority: 'low'
        },
      ]
    },
  ]);
  
  

  const toggleWindow = (window) => {
    setActiveWindow(window);
  };

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
