import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
export default function CustomButton({iconname, text, onPress, buttonBGColor}) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButton, {backgroundColor: buttonBGColor}]}>
      {iconname ? (
        <Icon
          name={iconname}
          size={24}
          color={theme.dark ? 'black' : 'white'}
        />
      ) : (
        <Text style={[styles.customButtonText, {color: theme.colors.text}]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  customButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
