import React, { createContext, useState } from 'react';

const SectionContext = createContext();

const SectionProvider = ({ children }) => {
  const [section, setSection] = useState([ 'To do', 'In progress', 'Done' ]);

  const replaceTask = (TaskArray) => {
    setSection(TaskArray)
  };



  return (
    <SectionContext.Provider
      value={{ section, replaceTask }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export { SectionContext, SectionProvider };