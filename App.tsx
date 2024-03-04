import * as React from 'react';
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Logs from "./screens/Logs";
import AddCard from "./screens/AddCard";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useEffect, useState } from 'react';

/* export const DeviceComponent = () => {

  const [deviceId, setDeviceId] = useState('');

  const fetchDeviceId = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      console.log(id);
    } catch (error) {
      console.error('Error fetching device ID:', error);
    }
  };

  useEffect(() => {
    fetchDeviceId();
  }, []);

} */

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

