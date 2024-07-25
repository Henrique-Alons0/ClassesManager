import React, { createContext, useState, ReactNode } from 'react';

interface Class {
  id: string;
  title: string;
}

interface ClassesContextType {
  classes: Class[];
  addClass: (newClass: Class) => void;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = (newClass: Class) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  return (
    <ClassesContext.Provider value={{ classes, addClass }}>
      {children}
    </ClassesContext.Provider>
  );
}

export default ClassesContext;
