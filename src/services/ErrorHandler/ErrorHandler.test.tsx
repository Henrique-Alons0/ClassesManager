import { ErrorHandler, Errors } from './ErrorHandler';
import { Alert } from 'react-native';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockError = jest.fn();
global.Error = mockError as unknown as ErrorConstructor;

describe('ErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Error and Alert.alert with correct message when no variables are provided', () => {
    const errorKey: keyof typeof Errors = 'EMPTY_PARTICIPANT_NAME';

    ErrorHandler(errorKey);

    expect(mockError).toHaveBeenCalledWith(Errors[errorKey].message);
    expect(Alert.alert).toHaveBeenCalledWith('Error', Errors[errorKey].messageUser);
  });

  it('should replace variables in the error message correctly', () => {
    const errorKey: keyof typeof Errors = 'PARTICIPANT_ALREADY_EXISTS';
    const variables = { participantName: 'john_doe', teamName: 'Team T' };

    ErrorHandler(errorKey, variables);


    const expectedMessage = `Participant \"${variables.participantName}\" already exists in team \"${variables.teamName}\"!`;
    const expectedMessageUser = Errors[errorKey].messageUser.replace('{participantName}', variables.participantName).replace('{teamName}', variables.teamName);

    expect(mockError).toHaveBeenCalledWith(expectedMessage);
    expect(Alert.alert).toHaveBeenCalledWith('Error', expectedMessageUser);
  });

  it('should handle missing variables gracefully', () => {
    const errorKey: keyof typeof Errors = 'SAMPLE_ERROR';

    ErrorHandler(errorKey, {});

    expect(mockError).toHaveBeenCalledWith(Errors.UNEXPECTED_ERROR.message);
    expect(Alert.alert).toHaveBeenCalledWith('Error', Errors.UNEXPECTED_ERROR.messageUser);
  });

  it('should handle empty error key gracefully', () => {
    const invalidKey = 'INVALID_KEY' as keyof typeof Errors;

    jest.spyOn(console, 'error').mockImplementation(() => {});

    ErrorHandler(invalidKey, {});

    expect(mockError).toHaveBeenCalledWith(Errors.UNEXPECTED_ERROR.message);
    expect(Alert.alert).toHaveBeenCalledWith('Error', Errors.UNEXPECTED_ERROR.messageUser);
  });

  it('should handle variable replacement when no matching keys are found', () => {
    const errorKey: keyof typeof Errors = 'CLASS_NOT_FOUND';
    const variables = { nonExistentKey: 'some_value' };

    ErrorHandler(errorKey, variables);

    const expectedMessage = Errors[errorKey].message;
    const expectedMessageUser = Errors[errorKey].messageUser;

    expect(mockError).toHaveBeenCalledWith(expectedMessage);
    expect(Alert.alert).toHaveBeenCalledWith('Error', expectedMessageUser);
  });
});
