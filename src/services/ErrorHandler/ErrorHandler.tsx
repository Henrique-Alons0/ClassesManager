import Errors, { ErrorKey } from './ListErrors';
import { Alert } from 'react-native';

const ErrorHandler = (key: ErrorKey, variables: Record<string, string> = {}): void => {
    let message = Errors[key]?.message || Errors['UNEXPECTED_ERROR'].message;
    let messageUser = Errors[key]?.messageUser || Errors['UNEXPECTED_ERROR'].messageUser;
    for (const [key, value] of Object.entries(variables)) {
        message = message.replace(`{${key}}`, value);
        messageUser = messageUser.replace(`{${key}}`, value);
    }
    Error(`[Erro_${new Date().getFullYear()}_${(new Date().getMonth()+1).toString().padStart(2, '0')}_${(new Date().getDate()).toString().padStart(2, '0')}_${(new Date().getHours()).toString().padStart(2, '0')}_${(new Date().getMinutes()).toString().padStart(2, '0')}_${(new Date().getSeconds()).toString().padStart(2, '0')}]: ${message}.`);
    Alert.alert(`Erro (${key})`, messageUser);
};

export { Errors, ErrorHandler };