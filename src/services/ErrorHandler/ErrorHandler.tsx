import React, { createContext, useState, ReactNode, Key } from 'react';
import Errors, { ErrorKey } from './ListErrors';
import { Alert } from 'react-native';

const ErrorHandler = (key: ErrorKey, variables: Record<string, string> = {}): void => {
    let message = Errors[key].message;
    let messageUser = Errors[key].messageUser;
    for (const [key, value] of Object.entries(variables)) {
        message = message.replace(`{${key}}`, value);
        messageUser = messageUser.replace(`{${key}}`, value);
    }
    Error(message)
    Alert.alert('Error', messageUser)
};

export { Errors, ErrorHandler };