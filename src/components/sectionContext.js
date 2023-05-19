import React, { createContext, useState } from 'react';

const SectionContext = createContext();

const SectionProvider = ({ children }) => {
  const [section, setSection] = useState([ 'To do', 'In progress', 'Done' ]);

  const replaceSection = (TaskArray) => {
    setSection(TaskArray)
  };



  return (
    <SectionContext.Provider
      value={{ section, replaceSection }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export { SectionContext, SectionProvider };