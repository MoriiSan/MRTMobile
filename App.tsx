import * as React from 'react';
import Welcome from "./screens/Welcome";
import SetNickname from './screens/SetNickname';
import Home from "./screens/Home";
import Account from "./screens/Account";
import Logs from "./screens/Logs";
import AddCard from "./screens/AddCard";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="SetNickname"
          component={SetNickname}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction Logs"
          component={Logs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Card"
          component={AddCard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

