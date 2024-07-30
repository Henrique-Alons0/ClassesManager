import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { CreateClassScreen } from './index';
import ClassesContext from '../../context/ClassesContext/ClassesContext';
import { ErrorHandler } from '../../services/ErrorHandler/ErrorHandler';
import { useNavigation } from '@react-navigation/native';
import ErrorBoundary from '../../services/ErrorBoundary/ErrorBoundary';

jest.mock('../../services/ErrorHandler/ErrorHandler', () => ({
  ErrorHandler: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() }),
}));


const mockContext = {
    classes: [{ id: '1', title: 'Class 1', teamA: ['John'], teamB: [] as string[] }],
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

describe('CreateClassScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <CreateClassScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    expect(screen.getByText('Nova Turma')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nome da Turma')).toBeTruthy();
    expect(screen.getByText('Criar')).toBeTruthy();
  });

  it('should handle creating a class', async () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <CreateClassScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Nome da Turma'), 'New Class');
    fireEvent.press(screen.getByText('Criar'));

    await waitFor(() => {
      expect(mockContext.addClass).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Class'
      }));
    });
  });

  it('should show error if class name is empty', async () => {
    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <CreateClassScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.press(screen.getByText('Criar'));

    await waitFor(() => {
      expect(ErrorHandler).toHaveBeenCalledWith('EMPTY_CLASS_NAME');
    });
  });

  it('should navigate back when logo or back button is pressed', () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });

    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <CreateClassScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Nome da Turma'), 'John Doe Club');

    fireEvent.press(screen.getByTestId('create-class-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should click in back home arrow button', () =>{
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });

    render(
      <ErrorBoundary>
        <ClassesContext.Provider value={mockContext}>
          <CreateClassScreen />
        </ClassesContext.Provider>
      </ErrorBoundary>
    );

    fireEvent.press(screen.getByTestId('go-back-button'));

    expect(mockGoBack).toHaveBeenCalled();
  })
});
