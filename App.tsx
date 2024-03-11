import * as React from 'react';
import Welcome from "./screens/Welcome";
import SetNickname from './screens/SetNickname';
import Home from "./screens/Home";
import Account from "./screens/Account";
import Logs from "./screens/Logs";
import AddCard from "./screens/AddCard";
import Scan from "./screens/Scan";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import UserInactivityWrapper from './components/UserActivityDetector';


const Stack = createStackNavigator();
export const storage = new MMKV()

export default function App() {
  //   const [isSessionActive, setIsSessionActive] = useState(false);

  //   const updateSession = () => {
  //     const currentTime = new Date().getTime();
  //     const sessionDuration = 5 * 1000; // 1 hour in milliseconds
  //     const sessionExpirationTime = currentTime + sessionDuration;
  //     storage.set('sessionExpirationTime', sessionExpirationTime.toString());
  //     setIsSessionActive(true);
  //   };

  //   useEffect(() => {
  //     updateSession();
  // }, []);

  return (
    <UserInactivityWrapper>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen
            name="SetNickname"
            component={SetNickname}
            options={{ headerShown: false, gestureEnabled: false }} />
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
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserInactivityWrapper>
  );
}

