import {StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native';
import Toast from 'react-native-toast-message';




const ThemeToggleSwitch = () => {
  const {theme, toggleTheme} = useTheme();

  const showsuccessToast = (message) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: message,
    });
  };

  const hanldetoggleTheme = () => {
    toggleTheme();
    if (!theme.dark) {
      showsuccessToast("It's 🌤️ Now take care !");
    } else {
      showsuccessToast("It's 🌌 Now Beware !");
    }
  };

  return (
    <>
      <Icon
        name={theme.dark ? 'sunny' : 'moon'}
        size={40}
        color={theme.colors.text}
        style={styles.themeIcon}
      />

      <ToggleSwitch
        isOn={theme.dark}
        offColor='#232533'
        
        onColor="#DAD8C9"
        labelStyle={{color: theme.colors.text, fontWeight: '600'}}
        size="large"
        onToggle={hanldetoggleTheme}
      />
    </>
  );
};

export default ThemeToggleSwitch;
const styles = StyleSheet.create({
    themeIcon: {
        marginRight: 10,
      },
})
