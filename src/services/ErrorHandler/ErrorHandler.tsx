import { formatDate } from '../AuxService/AuxService';
import Errors, { ErrorKey } from './ListErrors';
import { Alert } from 'react-native';

const ErrorHandler = (key: ErrorKey, variables: Record<string, string> = {}): void => {
    let message = Errors[key]?.message || Errors['UNEXPECTED_ERROR'].message;
    let messageUser = Errors[key]?.messageUser || Errors['UNEXPECTED_ERROR'].messageUser;
    for (const [key, value] of Object.entries(variables)) {
        message = message.replace(`{${key}}`, value);
        messageUser = messageUser.replace(`{${key}}`, value);
    }
    Error(`[Erro_${formatDate(new Date())}]: ${message}.`);
    Alert.alert(`Erro (${key})`, messageUser);
};

export { Errors, ErrorHandler };