import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import SignUpForm from '../utils/SignUpForm';
import CustomButton from '../utils/CustomButton';

const SignUpPage = () => {
  const { googleSignUp } = useAuth();
  const {theme} = useTheme();
  const navigation = useNavigation();

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const handleGoogleSignUp = async () => {
    try {
      const { success, message } = await googleSignUp();
      if (!success) {
      } 
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safearea} backgroundColor = {theme.colors.background}>
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.formContainer} backgroundColor = {theme.colors.cardbgcolor}>


       <SignUpForm/>

          <CustomButton
              both = "true"
              iconname="logo-google"
              text=" Sign Up"
              onPress={() => handleGoogleSignUp()}
              buttonBGColor={theme.colors.googleloginsigninbutton}
            />



        <View style={styles.signinContainer} >
          <Text style={styles.signinText} color = {theme.colors.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpPage;

const styles = StyleSheet.create({
  safearea: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor:'#1E1E2D',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  
  
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signinText: {
    fontSize: 16,
    color: "#CDCDE0",
  },
  signinButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

