import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import {  Alert } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import CustomButton from './CustomButton';

const DeleteUserButton = ()=>{
    const {deleteUser} = useAuth();
    const {theme} = useTheme();
    const handleDeleteUser = () => {
      Alert.alert(
        'Delete User',
        'This action is Irreversible !!!.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteUser(),
          },
        ],
        { cancelable: false }
      );
      };

    return (
      <CustomButton
        iconname = 'warning-outline'
        onPress={() => handleDeleteUser()}
        buttonBGColor={ theme.colors.deleteuserbutton}
        />

      );
    };
    

export default DeleteUserButton;


