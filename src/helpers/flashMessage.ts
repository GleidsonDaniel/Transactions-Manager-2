import {showMessage} from 'react-native-flash-message';

export const showSuccessAlert = (message: string, description?: string) => {
  showMessage({
    message,
    description,
    type: 'success',
    icon: {icon: 'success', position: 'left'},
    floating: true,
  });
};

export const showErrorAlert = (message: string, description?: string) => {
  showMessage({
    message,
    description,
    type: 'danger',
    icon: {icon: 'warning', position: 'left'},
    floating: true,
  });
};
