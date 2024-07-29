// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './src/routes';
import ErrorBoundary from './src/services/ErrorBoundary/ErrorBoundary';
import { ClassesProvider } from './src/context/ClassesContext/ClassesContext';

const Stack = createStackNavigator();

export default function App() {

    return (
      <ErrorBoundary>
        <ClassesProvider>
          <Routes />
        </ClassesProvider>
      </ErrorBoundary>
    );
}
