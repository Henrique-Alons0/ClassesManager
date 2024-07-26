// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './src/routes';
import { ClassesProvider } from './src/context/ClassesContext';

const Stack = createStackNavigator();

export default function App() {

    return (
      <ClassesProvider>
        <Routes />
      </ClassesProvider>
    );
}
