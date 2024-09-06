import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
export default function CustomButton({both ,iconname, text, onPress, buttonBGColor}) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButton, {backgroundColor: buttonBGColor}]}>
      { both ? 
      (
      <>
      <Icon
          name={iconname}
          size={24}
          color={theme.dark ? 'black' : 'white'}
        />
        <Text style={[styles.customButtonText, {color: theme.colors.text}]}>
        {text}
      </Text>
      </>
      ):(
        iconname ? 
         (<Icon
            name={iconname}
            size={24}
            color={theme.dark ? 'black' : 'white'}
          />
          ) : (
            <Text style={[styles.customButtonText, {color: theme.colors.text}]}>
              {text}
            </Text>
          )
          )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  customButton: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
    margin:5,
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
