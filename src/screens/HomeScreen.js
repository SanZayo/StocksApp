import { View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import DetailsScreen from './DetailsScreen';
import ChangeLanguage from './ChangeLanguage';
import Home from '../components/Home';
import Edit from '../components/Edit';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';

const HomeScreen = () => {
  const Stack = createNativeStackNavigator();

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test channel'
    });
  };

  useEffect(() => {
    createChannels();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockDetails"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddEdit"
        component={Edit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={ChangeLanguage}
        options={{
          headerTitle: 'Select prefered language',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
