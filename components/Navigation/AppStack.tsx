import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeProvider';

import HomePage from '../Pages/HomePage';
import AddToDo from '../ToDoActions/AddToDo';
import DetailsToDo from '../ToDoActions/DetailsToDo';
import EditToDo from '../ToDoActions/EditToDo';
import DeleteToDo from '../ToDoActions/DeleteToDo';
import ProfilePage from '../Pages/ProfilePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="EditToDo" component={EditToDo} />
    <Stack.Screen name="DeleteToDo" component={DeleteToDo} />
    <Stack.Screen name="AddToDo" component={AddToDo} />
    <Stack.Screen name="DetailsToDo" component={DetailsToDo} />
  </Stack.Navigator>
);
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile-Stack" component={ProfilePage} />
  </Stack.Navigator>
);
// const BookmarkStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Bookmark-Stack" component={BookmarkPage} />
    
//   </Stack.Navigator>
// );

const AppStack = () => {
  const { theme } = useTheme(); 
  return(
  <Tab.Navigator  
  screenOptions={{ 
    headerShown: false ,
    tabBarHideOnKeyboard: true,
    //  tabBarActiveTintColor: '#fbc02d',
    tabBarActiveTintColor:theme.colors.tabbarcolor,
    tabBarInactiveTintColor: theme.colors.text,
     tabBarStyle: {
      backgroundColor: theme.colors.tabbarbgcolor,
      borderTopColor: theme.colors.border,
    },
  }}>
    <Tab.Screen name="To-Do" component={HomeStack} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={size} />
        ),
      }}  />
    {/* <Tab.Screen name="Bookmark" component={BookmarkStack}   options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bookmark-outline" color={color} size={size} />
        ),
      }}  /> */}
    <Tab.Screen name= "Profile" component={ProfileStack}  options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
      }}  /> 
  </Tab.Navigator>
);
}

export default AppStack;
