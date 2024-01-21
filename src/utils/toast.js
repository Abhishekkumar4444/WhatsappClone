import Toast from 'react-native-toast-message';

export const showErrorToast = () => {
  Toast.show({
    type: 'error',
    text2: msg,
  });
};

export const showSuccessToast = () => {
  Toast.show({
    type: 'success',
    text2: msg,
  });
};

export const showInfoToast = () => {
  Toast.show({
    type: 'info',
    text2: msg,
  });
};
