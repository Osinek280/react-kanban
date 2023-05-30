import React, { createContext, useState, useContext } from 'react';
import { KanbanContext } from './KanbanContext';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const { replaceKanban} = useContext(KanbanContext);
  const [files, setFiles] = useState([]);

  function getItemFromBackEnd(userId) {
    console.log('GET');
    return fetch(`http://127.0.0.1:3333/files?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        replaceKanban(data.kanban[0][data.kanban[1]]);
        setFiles(data.kanban[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  

  return (
    <ApiContext.Provider value={{ getItemFromBackEnd, files }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
