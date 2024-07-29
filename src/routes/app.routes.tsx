import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { CreateClassScreen } from '../screens/CreateClassScreen';
import { ClassScreen } from '../screens/ClassScreen';

export type RootStackParamList = {
  MainScreen: undefined;
  CreateClassScreen: undefined;
  ClassScreen: { classData: { id: string; title: string } };
};


const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
      <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS
          }}
        >
        <Stack.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="CreateClassScreen"
            component={CreateClassScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ClassScreen"
            component={ClassScreen}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
