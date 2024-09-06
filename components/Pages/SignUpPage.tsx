import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import SignUpForm from '../utils/SignUpForm';


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
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.formContainer}>


       <SignUpForm/>

        <TouchableOpacity onPress={handleGoogleSignUp} style={styles.googleButton}>
        <Icon name="logo-google" size={24} color="white" />
            <Text style={styles.buttonText}> Sign Up</Text>
          </TouchableOpacity>



        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
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
  signupButton: {
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#fbc02d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
  googleButton: {
    flexGrow:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#db4437",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

