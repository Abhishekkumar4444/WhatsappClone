import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission()
//   console.log('called', authStatus)
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

//   if (enabled) {
//     // console.log('Authorization status:', authStatus)
//     getFcmToken()
//   }
// }

export async function requestUserPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    getFcmToken();
  } catch (error) {}
}

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        console.log('token generated', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('fcmToken', error);
      // Alert.alert(error?.message)
    }
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type)
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type) // e.g. "Settings"
      }
    });
};
