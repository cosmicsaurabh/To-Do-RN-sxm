import React, { useEffect, createContext, useState, useContext, useMemo } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; 

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        showToast('Failed to load theme. Please try again.');
      }
    };

    loadTheme();
  }, []);

  const showToast = (message) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: message,
    });
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
      showToast('Failed to save theme. Please try again.');
    }
  };

  const theme = useMemo(() => ({
    dark: isDarkTheme,
    colors: isDarkTheme ? darkThemeColors : lightThemeColors,
  }), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;


const lightThemeColors = {
  background: '#ffffff',
  headerfootercolor:'#FF9C01',
  tabbarcolor: '#FF9C01',
  tabbarbgcolor: '#DAD8C9',
  cardbgcolor: '#aaaaaa',
  cardincardbgcolor: '#DAD8C9',
  text: '#000000',
  bookmark: '#f774d7', // Pink
  create: '#4caf50', // Green
  delete: '#f44336', // Red
  cancel: '#9e9e9e', // Gray
  update: '#ffeb3b', // Yellow
  ok: '#4caf50', // Green
  done: '#CDCDE0', // White
  dottedline: '#000000',
  loginsigninbutton: '#FF9C01',
  googleloginsigninbutton: '#FF9C01',
  mobilesigninbutton : '#FF9C01',
  logoutbutton: '#f44336',
  deleteuserbutton : '#FF9C01',
  
};

const darkThemeColors = {
  background: '#121212',
  headerfootercolor:'#FF8E01',
  tabbarcolor: '#FF8E01',
  tabbarbgcolor: '#232533',
  cardbgcolor: '#1E1E2D',
  cardbincardgcolor: '#232533',
  text: '#ffffff',
  bookmark: '#ff77a9', // A darker shade of pink
  create: '#66bb6a', // A lighter shade of green
  delete: '#e57373', // A lighter shade of red
  cancel: '#b0bec5', // A lighter shade of gray
  update: '#fdd835', // A darker yellow
  ok: '#66bb6a', // A lighter shade of green
  done: '#e0e0e0', // Light gray for done
  dottedline: '#ffffff',
  loginsigninbutton: "#FF8E01",
  googleloginsigninbutton: '#FF9C01',
  mobilesigninbutton : '#FF9C01',
  logoutbutton: '#e57373',
  deleteuserbutton : '#FF8E01',
  
};
