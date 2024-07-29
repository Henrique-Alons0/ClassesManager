import { ReactNode } from "react";

export interface Class {
    id: string;
    title: string;
    teamA: string[];
    teamB: string[];
}

export interface ClassesContextType {
    classes: Class[];
    removeClass: (classId: string) => void;
    addClass: (newClass: Omit<Class, 'teamA' | 'teamB'>) => void;
    addParticipant: (classId: string, participant: string, team: 'teamA' | 'teamB') => void;
    setTeamAClass: (classId: string, team: string[]) => void;
    setTeamBClass: (classId: string, team: string[]) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}