import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CheckInScreen from '../screens/CheckInScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MessagesScreen from '../screens/MessagesScreen';

type RootStackParamList = {
  CheckIn: undefined;
  Progress: undefined;
  Messages: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CheckIn">
        <Stack.Screen name="CheckIn" component={CheckInScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
