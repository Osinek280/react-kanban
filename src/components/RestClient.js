import React, { createContext, useState, useContext } from 'react';
import { KanbanContext } from './KanbanContext';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const { replaceKanban} = useContext(KanbanContext);
  const [files, setFiles] = useState([]);

  function getItemFromBackEnd(userId) {
    const token = localStorage.getItem('token');
  
    fetch('http://127.0.0.1:8888/files', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Błąd pobierania plików');
        }
      })
      .then(data => {
        console.log(data)
        setFiles(data.files)
      })
      .catch(error => {
        console.error('Błąd pobierania plików:', error);
      });
  }

  return (
    <ApiContext.Provider value={{ getItemFromBackEnd, files }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
