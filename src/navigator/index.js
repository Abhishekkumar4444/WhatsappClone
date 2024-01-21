import {StatusBar, View, Alert, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../theme/Colors';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ContactScreen from '../screens/ContactScreen';
import SplashScreen from '../screens/SplashScreen';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkBiometricAvailability = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      console.log('biometryType', biometryType);

      if (available) {
        if (biometryType === BiometryTypes.TouchID) {
          // Handle Touch ID specific logic
          const resultObject = await rnBiometrics.simplePrompt({
            promptMessage: 'Confirm fingerprint',
            allowDeviceCredentials: true,
          });
          const {success} = resultObject;

          if (success) {
            setIsAuthenticated(true);
            console.log('Successful biometrics provided');
          } else {
            setIsAuthenticated(false);
            console.log('User cancelled biometric prompt');
          }
          console.log('Touch ID is available');
        } else if (biometryType === BiometryTypes.FaceID) {
          // Handle Face ID specific logic
          console.log('Face ID is available');

          // Prompt Face ID authentication
          const result = await rnBiometrics.simplePrompt({
            promptMessage: 'Authenticate with Face ID',
          });

          if (result.success) {
            // Authentication successful
            setIsAuthenticated(true);
          } else {
            console.log('Biometric authentication failed');
            // If authentication fails, handle the exit app logic
            BackHandler.exitApp();
          }
        } else if (biometryType === BiometryTypes.Biometrics) {
          // Handle generic biometric (e.g., fingerprint) logic
          console.log('Generic biometric is available');
          const resultObject = await rnBiometrics.simplePrompt({
            promptMessage: 'Confirm fingerprint',
            allowDeviceCredentials: true,
          });
          const {success} = resultObject;

          if (success) {
            setIsAuthenticated(true);
            console.log('Successful biometrics provided');
          } else {
            setIsAuthenticated(false);
            console.log('User cancelled biometric prompt');
          }
        } else {
          console.log('Biometric authentication not supported');
          // If biometric authentication is not supported, handle the exit app logic
          BackHandler.exitApp();
        }
      } else {
        console.log('Biometric authentication is not available');
        // If biometric authentication is not available, handle the exit app logic
        BackHandler.exitApp();
      }
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      // Handle errors and exit app if necessary
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    let id;

    const initializeApp = async () => {
      try {
        id = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error initializing the app:', error);
        BackHandler.exitApp();
      }
    };
    checkBiometricAvailability();
    initializeApp();

    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const handleExitApp = () => {
      if (!isAuthenticated) {
        BackHandler.exitApp();
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleExitApp,
    );

    return () => backHandler.remove();
  }, [isAuthenticated]);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : isAuthenticated ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ContactScreen" component={ContactScreen} />
          </>
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
