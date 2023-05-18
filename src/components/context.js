import React, { createContext, useState } from 'react';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: 'Buy car wash',
      description: 'Make sure to wash the car thoroughly.',
      Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      category: 'To do'
    },
    {
      id: 1,
      name: 'Research car options',
      description: 'Take some time to research different car models and features.',
      Subtasks: ['Compare prices', 'Read customer reviews'],
      category: 'To do'
    },
    {
      id: 2,
      name: 'Buy car was',
      description: 'I am planning to buy a new car.',
      Subtasks: ['Contact bank for financing options', 'Schedule a test drive'],
      category: 'Done',
    }
    ,
    {
      id: 3,
      name: 'Organize car insurance',
      description: 'Contact insurance provider and arrange car insurance coverage.',
      Subtasks: ['Gather necessary documents', 'Compare insurance plans'],
      category: 'In progress'
    }
  ]);

  const replaceTask = (TaskArray) => {
    setTasks(TaskArray)
  };



  return (
    <TasksContext.Provider
      value={{ tasks, replaceTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
