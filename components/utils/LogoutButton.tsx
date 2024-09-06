import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import CustomButton from './CustomButton';

const LogoutButton = () => {
  const { logout } = useAuth();
  const {theme} = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <CustomButton
        iconname = 'log-out-outline'
        onPress={() => handleLogout()}
        buttonBGColor={ theme.colors.logoutbutton}
        />
    
  );
};

export default LogoutButton;
