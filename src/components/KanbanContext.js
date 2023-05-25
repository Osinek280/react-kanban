import React, { createContext, useState } from 'react';

const KanbanContext = createContext();

const KanbanProvider = ({ children }) => {
  const [Kanban, setKanban] = useState({
    name: 'School',
    type: 'file',
    files: null,
    section: ['To do', 'In progress', 'Done'],
    task: [
      {
      name: 'Buy car wash',
      description: 'Make sure to wash the car thoroughly.',
      Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      category: 'To do',
      priority: 'medium'
    },
    {
      name: 'Research car options',
      description: 'Take some time to research different car models and features.',
      Subtasks: ['Compare prices', 'Read customer reviews'],
      category: 'To do',
      priority: 'height'
    },
    {
      name: 'Buy car wash',
      description: 'I am planning to buy a new car.',
      Subtasks: ['Contact bank for financing options', 'Schedule a test drive'],
      category: 'Done',
      priority: 'low'
    }
    ,
    {
      name: 'Organize car insurance',
      description: 'Contact insurance provider and arrange car insurance coverage.',
      Subtasks: ['Gather necessary documents', 'Compare insurance plans'],
      category: 'In progress',
      priority: 'medium'
    }

    ],
  });

  const replaceTasks = (taskArray) => {
    setKanban(prevKanban => ({
      ...prevKanban,
      task: taskArray
    }));
  };
  

  const replaceSections = (sectionArray) => {
    setKanban((prevKanban) => ({
      ...prevKanban,
      section: sectionArray,
    }));
  };

  return (
    <KanbanContext.Provider value={{ Kanban, replaceTasks, replaceSections }}>
      {children}
    </KanbanContext.Provider>
  );
};

export { KanbanContext, KanbanProvider };
