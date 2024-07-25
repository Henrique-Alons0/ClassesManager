import React, { createContext, useState, ReactNode } from 'react';

interface Class {
  id: string;
  title: string;
  teamA: string[];
  teamB: string[];
}

interface ClassesContextType {
  classes: Class[];
  addClass: (newClass: Omit<Class, 'teamA' | 'teamB'>) => void;
  addParticipant: (classId: string, participant: string, team: 'teamA' | 'teamB') => void;
  setTeamAClass: (classId: string, team: string[]) => void;
  setTeamBClass: (classId: string, team: string[]) => void;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = (newClass: Omit<Class, 'teamA' | 'teamB'>) => {
    setClasses((prevClasses) => [...prevClasses, { ...newClass, teamA: [], teamB: [] }]);
  };

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
    <ClassesContext.Provider value={{ classes, addClass, addParticipant, setTeamAClass, setTeamBClass }}>
      {children}
    </ClassesContext.Provider>
  );
}

export default ClassesContext;
