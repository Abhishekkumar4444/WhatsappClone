import {StatusBar, View, Alert, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {Colors} from './src/theme/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './src/screens/ChatScreen';
import ContactScreen from './src/screens/ContactScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import {
  notificationListner,
  requestUserPermission,
} from './src/utils/NotificationServices';
import {ForegroundNotif, PushNotif} from './src/utils/ForegroundNotif';
import AppNavigator from './src/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <>
      <ForegroundNotif />
      <PushNotif />
      <AppNavigator />
    </>
  );
};
export default App;
