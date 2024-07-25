// App.tsx
import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { CreateClassScreen } from './src/screens/CreateClassScreen';
import { ClassScreen } from './src/screens/ClassScreen';
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
