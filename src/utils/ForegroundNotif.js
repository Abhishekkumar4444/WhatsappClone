import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const ForegroundNotif = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'specialid', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        vibrate: true,
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        playSound: true,
        soundName: 'default',
        actions: ['Read More', 'Dismiss'], // Add an action button
        bigText: 'Custom notification with expanded text',
        color: 'red',
      });
    });

    return unsubscribe;
  }, []);
  return null;
};

export const PushNotif = () => {
  PushNotification.createChannel(
    {
      channelId: 'specialid', // (required)
      channelName: 'Special messasge', // (required)
      channelDescription: 'Notification for special message', // (optional) default: undefined.
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    // (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // Display an in-app banner
  //     showInAppBanner();
  //     // Handle other notification logic
  //   });

  //   return unsubscribe;
  // }, []);
  // const showInAppBanner = () => {
  //   // Display an in-app banner or alert
  //   Alert.alert(
  //     'New Message',
  //     'You have a new message. Do you want to read it?',
  //     [
  //       {text: 'Later', style: 'cancel'},
  //       {
  //         text: 'Read Now',
  //         onPress: () => {
  //           // Handle the action when the user chooses to read the message immediately
  //           console.log('User chose to read the message now.');
  //           // Add your logic here, e.g., navigate to a specific screen
  //           // Replace 'YourScreen' with the actual screen name in your app
  //           // navigation.navigate('YourScreen');
  //         },
  //       },
  //     ],
  //     {cancelable: true},
  //   );
  // };

  // ... (remaining code)

  return null;
};
