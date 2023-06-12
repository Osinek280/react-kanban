import React, { createContext, useState } from 'react';

const KanbanContext = createContext();

const KanbanProvider = ({ children }) => {
  const [Kanban, setKanban] = useState({
    id: 0,
    name: 'Example',
    section: [],
    task: [],
  });

  const replaceTasks = (taskArray) => {
    const token = localStorage.getItem('token');
    setKanban((prevKanban) => ({
      ...prevKanban,
      task: taskArray,
    }));
    console.log(JSON.stringify({
      ...Kanban,
      task: taskArray,
    }))
    fetch(`http://127.0.0.1:8888/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        task: taskArray,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.log('replaceSections')
    const token = localStorage.getItem('token');
    setKanban((prevKanban) => ({
      ...prevKanban,
      section: sectionArray,
    }));
    console.log(JSON.stringify({
      ...Kanban,
      section: sectionArray,
    }))
    fetch(`http://127.0.0.1:8888/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        section: sectionArray,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.log('replaceTasksAndSections')
    const token = localStorage.getItem('token');
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
    fetch(`http://127.0.0.1:8888/files/${Kanban.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...Kanban,
        section: sectionArray,
        task: taskArray,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
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
