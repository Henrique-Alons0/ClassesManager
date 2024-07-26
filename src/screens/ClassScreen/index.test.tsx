import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { ClassScreen } from './index';
import ClassesContext from '../../context/ClassesContext';
import { ErrorHandler } from '../../services/ErrorHandler/ErrorHandler';
import { useRoute } from '@react-navigation/native';

jest.mock('../../services/ErrorHandler/ErrorHandler', () => ({
  ErrorHandler: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() }),
  useRoute: jest.fn(),
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

describe('ClassScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRoute as jest.Mock).mockReturnValue({ params: { classData: { id: '1', title: 'Class 1' } } });
  });

 it('should render the component', () => {
    render(
      <ClassesContext.Provider value={mockContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    expect(screen.getByText('Class 1')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nome do Participante')).toBeTruthy();
    expect(screen.getByText('Remover turma')).toBeTruthy();
  });

  it('should handle adding a participant', async () => {
    render(
      <ClassesContext.Provider value={mockContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Nome do Participante'), 'John Doe');
    fireEvent.press(screen.getByTestId('add-button'));

    await waitFor(() => {
      expect(mockContext.addParticipant).toHaveBeenCalledWith('1', 'John Doe', 'teamA');
    });
  });

  it('should show error when participant already exists', async () => {
    render(
      <ClassesContext.Provider value={mockContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Nome do Participante'), 'John Doe');
    fireEvent.press(screen.getByTestId('add-button'));

    fireEvent.changeText(screen.getByPlaceholderText('Nome do Participante'), 'John Doe');
    fireEvent.press(screen.getByTestId('add-button'));

    await waitFor(() => {
      expect(ErrorHandler).toHaveBeenCalledWith('PARTICIPANT_ALREADY_EXISTS', {
        participantName: 'John Doe',
        teamName: 'TIME A',
      });
    });
  });

  it('should handle removing a participant', async () => {
    render(
      <ClassesContext.Provider value={mockContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    fireEvent.press(screen.getByTestId('remove-participant-button-John'));

    await waitFor(() => {
      const classToUpdate = mockContext.classes.find(c => c.id === '1');
      const updatedTeamA = classToUpdate?.teamA || [];
      
      expect(mockContext.setTeamAClass).toHaveBeenCalledWith('1', updatedTeamA);
      expect(updatedTeamA).not.toContain('John');
    });
  });

  it('should handle deletion of class', async () => {
    render(
      <ClassesContext.Provider value={mockContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    fireEvent.press(screen.getByText('Remover turma'));

    await waitFor(() => {
      expect(mockContext.removeClass).toHaveBeenCalledWith('1');
    });
  });

  it('should show error if class ID is invalid when removing class', async () => {
    const mockErrorHandler = ErrorHandler as jest.Mock;

    const invalidContext = { ...mockContext, classes: [{ id: '', title: 'Invalid Class', teamA: [], teamB: [] }] };

    render(
      <ClassesContext.Provider value={invalidContext}>
        <ClassScreen />
      </ClassesContext.Provider>
    );

    fireEvent.press(screen.getByText('Remover turma'));

    await waitFor(() => {
      expect(mockErrorHandler).toHaveBeenCalledWith('DELETION_ERROR');
    });
  });
});
