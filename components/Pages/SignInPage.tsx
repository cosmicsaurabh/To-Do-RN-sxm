import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthProvider';
import {useTheme} from '../../context/ThemeProvider';
import ToggleSwitch from 'toggle-switch-react-native';
import VerifyOTP from '../utils/VerifyOTP';
import SendOTP from '../utils/SendOTP';
import SignInForm from '../utils/SignInForm';

const SignInPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {googleSignIn} = useAuth();

  const [confirmation, setConfirmation] = useState(null);
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const [toggledtophone, setToggledtophone] = useState(false);
  const handleToggle = () => {
    setToggledtophone(!toggledtophone);
  };

  const handleConfirmation = confirmation => {
    setConfirmation(confirmation);
    console.log("sdfsjgf->>>>>>>>>>",confirmation)
  };

  const handleGoogleSignIn = async () => {
    try {
      const {success, message} = await googleSignIn();
      if (!success) {
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.togglecontainer}>
          <Icon
            name={!toggledtophone ? 'phone-portrait-outline' : 'mail-outline'}
            size={40}
            color={theme.colors.text}
            style={styles.themeIcon}
          />

          <ToggleSwitch
            isOn={toggledtophone}
            offColor="#4E4E50"
            onColor="#4E4E50"
            labelStyle={{color: theme.colors.text, fontWeight: '600'}}
            size="large"
            onToggle={handleToggle}
          />
        </View>
        {!toggledtophone ? (
          <View style={styles.formContainer}>
            <SignInForm />

            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={styles.googleButton}>
              <Icon name="logo-google" size={24} color="white" />
              <Text style={styles.buttonText}> Log In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupButton}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.formContainer}>
            {!confirmation ? (
              <SendOTP onConfirmChange={handleConfirmation} />
            ) : (
              <VerifyOTP confirmation={confirmation} />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignInPage;

const styles = StyleSheet.create({
  safearea: {
    flexGrow: 1,
  },

  togglecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems:'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#1E1E2D',
  },
  googleButton: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 8,
    backgroundColor: '#db4437',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: '#CDCDE0',
  },
  signupButton: {
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
