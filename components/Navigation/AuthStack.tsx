import { StyleSheet } from 'react-native'
import React from 'react'
import SignInPage from '../Pages/SignInPage';
import SignUpPage from '../Pages/SignUpPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        // <AuthProvider>
        <Stack.Navigator  screenOptions={{
            headerShown: false
          }} >
            <Stack.Screen name="SignIn" component={SignInPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            
        </Stack.Navigator>
        // </AuthProvider>
    )
  
}
export default AuthStack;
