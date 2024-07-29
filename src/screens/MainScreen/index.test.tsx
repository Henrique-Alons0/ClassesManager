import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { MainScreen } from './index';
import ClassesContext from '../../context/ClassesContext/ClassesContext';
import { useNavigation } from '@react-navigation/native';
import ErrorBoundary from '../../services/ErrorBoundary/ErrorBoundary';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}));

const mockContext = {
  classes: [{ id: '1', title: 'Class 1', teamA: ['John'], teamB: [] }],
  removeClass: jest.fn(),
  addParticipant: jest.fn(),
  setTeamAClass: jest.fn((classId, updatedTeamA) => {
    if (typeof updatedTeamA !== 'undefined') {
      const classToUpdate = mockContext.classes.find(c => c.id === classId);
      if (classToUpdate) {
        classToUpdate.teamA = updatedTeamA;
      }
    } else {
      throw new Error('Expected updatedTeamA to be an array');
    }
  }),
  setTeamBClass: jest.fn((classId, updatedTeamB) => {
    if (typeof updatedTeamB !== 'undefined') {
      const classToUpdate = mockContext.classes.find(c => c.id === classId);
      if (classToUpdate) {
        classToUpdate.teamB = updatedTeamB;
      }
    } else {
      throw new Error('Expected updatedTeamB to be an array');
    }
  }),
  addClass: jest.fn(),
};

const mockNavigate = jest.fn();

describe('MainScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render the component', () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <MainScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    expect(screen.getByText('Turmas')).toBeTruthy();
    expect(screen.getByText('Jogue com a sua turma')).toBeTruthy();
    expect(screen.getByText('Criar nova turma')).toBeTruthy();
  });

  it('should navigate to ClassScreen on class card press', async () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <MainScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.press(screen.getByText('Class 1'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('ClassScreen', {
        classData: {
          id: '1',
          title: 'Class 1',
          teamA: ['John'],
          teamB: []
        }
      });
    });
  });

  it('should navigate to CreateClassScreen on button press', () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <MainScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.press(screen.getByText('Criar nova turma'));

    expect(mockNavigate).toHaveBeenCalledWith('CreateClassScreen');
  });

  it('should render empty state when there are no classes', () => {
    const emptyContext = { ...mockContext, classes: [] };

    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={emptyContext}>
          <MainScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    expect(screen.getByText('Nenhuma turma.')).toBeTruthy();
  });
});
