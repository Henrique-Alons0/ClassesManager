import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import ClassesContext, { ClassesProvider } from './ClassesContext';
import { waitFor } from '@testing-library/react-native';

describe('ClassesContext', () => {
  const renderWithProvider = () => {
    return renderHook(() => React.useContext(ClassesContext), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ClassesProvider>{children}</ClassesProvider>
      ),
    });
  };
  
  it('should not remove a class if the class does not exist', async () => {
    const { result } = renderWithProvider();

    
    await waitFor(() => {
        act(() => {
          result.current?.addClass({ id: '0', title: 'Class 4' });
        });
    })

    await waitFor(() => {
      act(() => {
        result.current?.removeClass('1');
      });

      expect(result.current?.classes).toHaveLength(1);
      expect(result.current?.classes).toEqual([{ id: '0', title: 'Class 4', teamA: [], teamB: [] }]);
    });
  });

  it('should add a class correctly', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
    });

    expect(result.current?.classes).toHaveLength(1);
    expect(result.current?.classes[0]).toEqual({ id: '1', title: 'Class 1', teamA: [], teamB: [] });
  });

  it('should remove a class correctly', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.removeClass('1');
    });

    expect(result.current?.classes).toHaveLength(0);
  });

  it('should add a participant to the correct team', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.addParticipant('1', 'John', 'teamA');
    });

    expect(result.current?.classes[0].teamA).toContain('John');
    expect(result.current?.classes[0].teamB).toHaveLength(0);
  });

  it('should not add a participant if the class does not exist', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.addParticipant('2', 'John', 'teamA');
    });

    expect(result.current?.classes[0].teamA).toHaveLength(0);
  });

  it('should set teamA correctly', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.setTeamAClass('1', ['John', 'Jane']);
    });

    expect(result.current?.classes[0].teamA).toEqual(['John', 'Jane']);
  });

  it('should not set teamA if the class does not exist', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.setTeamAClass('2', ['John', 'Jane']);
    });

    expect(result.current?.classes[0].teamA).toHaveLength(0);
  });

  it('should set teamB correctly', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.setTeamBClass('1', ['Mike']);
    });

    expect(result.current?.classes[0].teamB).toEqual(['Mike']);
  });

  it('should not set teamB if the class does not exist', () => {
    const { result } = renderWithProvider();

    act(() => {
      result.current?.addClass({ id: '1', title: 'Class 1' });
      result.current?.setTeamBClass('2', ['Mike']);
    });

    expect(result.current?.classes[0].teamB).toHaveLength(0); 
  });
});