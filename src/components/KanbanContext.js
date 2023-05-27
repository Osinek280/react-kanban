import React, { createContext, useState } from 'react';

const KanbanContext = createContext();

const KanbanProvider = ({ children }) => {
  const [Kanban, setKanban] = useState({
    id: 0,
    name: 'School',
    section: ['To do', 'In progress', 'Done'],
    task: [
      {
        name: 'Research car options',
        description: 'Take some time to research different car models and features.',
        Subtasks: ['Compare prices', 'Read customer reviews'],
        category: 'To do',
        priority: 'height',
      },
      {
        name: 'Buy car wash',
        description: 'I am planning to buy a new car.',
        Subtasks: ['Contact bank for financing options', 'Schedule a test drive'],
        category: 'Done',
        priority: 'low',
      },
      {
        name: 'Organize car insurance',
        description: 'Contact insurance provider and arrange car insurance coverage.',
        Subtasks: ['Gather necessary documents', 'Compare insurance plans'],
        category: 'In progress',
        priority: 'medium',
      },
    ],
  });

  const replaceTasks = (taskArray) => {
    setKanban((prevKanban) => ({
      ...prevKanban,
      task: taskArray,
    }));
    fetch(`http://127.0.0.1:3333/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        task: taskArray,
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
  };

  const replaceSections = (sectionArray) => {
    setKanban((prevKanban) => ({
      ...prevKanban,
      section: sectionArray,
    }));
    fetch(`http://127.0.0.1:3333/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        section: sectionArray,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update sections on the server');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const replaceTasksAndSections = (taskArray, sectionArray) => {
    setKanban((prevKanban) => ({
      ...prevKanban,
      section: sectionArray,
      task: taskArray,
    }));
    console.log(JSON.stringify({
      ...Kanban,
      section: sectionArray,
      task: taskArray,
    }))
    fetch(`http://127.0.0.1:3333/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        section: sectionArray,
        task: taskArray,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update sections on the server');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const replaceKanban = (KanbanArray) => {
    setKanban(KanbanArray);
  };

  return (
    <KanbanContext.Provider value={{ Kanban, replaceTasks, replaceSections, replaceKanban, replaceTasksAndSections }}>
      {children}
    </KanbanContext.Provider>
  );
};

export { KanbanContext, KanbanProvider };
