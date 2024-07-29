import React, { createContext, useState, ReactNode } from 'react';
import { Class, ClassesContextType } from '../../types/types';

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = (newClass: Omit<Class, 'teamA' | 'teamB'>) => {
    setClasses((prevClasses) => [...prevClasses, { ...newClass, teamA: [], teamB: [] }]);
  };

  const removeClass = (classId: string) =>{
    setClasses(classes.filter(cls => cls.id !== classId));
  }

  const addParticipant = (classId: string, participant: string, team: 'teamA' | 'teamB') => {
    setClasses((prevClasses) => {
      return prevClasses.map(cls => {
        if (cls.id === classId) {
          return {
            ...cls,
            [team]: [...cls[team], participant],
          };
        }
        return cls;
      });
    });
  };

  const setTeamAClass = (classId: string, team: string[]) => {
    setClasses((prevClasses) => {
      return prevClasses.map(cls => {
        if (cls.id === classId) {
          return {
            ...cls,
            teamA: team,
          };
        }
        return cls;
      });
    });
  }

  const setTeamBClass = (classId: string, team: string[]) => {
    setClasses((prevClasses) => {
      return prevClasses.map(cls => {
        if (cls.id === classId) {
          return {
            ...cls,
            teamB: team,
          };
        }
        return cls;
      });
    });
  }

  return (
    <ClassesContext.Provider value={{ classes, addClass, removeClass, addParticipant, setTeamAClass, setTeamBClass }}>
      {children}
    </ClassesContext.Provider>
  );
}

export default ClassesContext;