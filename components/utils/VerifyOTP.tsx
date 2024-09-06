import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import FormField from './FormField'
import { useAuth } from '../../context/AuthProvider'
import { useTheme } from '../../context/ThemeProvider'
import Toast from 'react-native-toast-message'

const VerifyOTP = ({confirmation}) => {
    const {confirmCodeAndSignInOrSignUp}  = useAuth();
    const {theme} = useTheme();
    const [errorText, setErrorText] = useState('');
    const [form, setForm] = useState({ otp: '',});

    const handleOTPVerification = async () => {
        if (!form.otp) {
          setErrorText('Please enter the OTP.');
          return;
        }
        setErrorText('');
        const formattedPhoneNumber = `+91${form.phone}`; 
        try {
          const { success, message } = await confirmCodeAndSignInOrSignUp(formattedPhoneNumber, confirmation, form.otp);
          if (success) {
            Toast.show({ type: 'success', text1: 'OTP verified successfully' });
          } else {
            setErrorText('Failed to verify OTP.');
            Toast.show({ type: 'warning', text1: 'Failed to verify OTP' });
          }
        } catch (error) {
          console.error('OTP Verification Error:', error);
          setErrorText('Error verifying OTP.');
          Toast.show({ type: 'error', text1: 'OTP verification error' });
        }
      };
  return (
    <>
    <FormField
        title="OTP"
        value={form.otp}
        placeholder="Enter OTP"
        handleChangeText={e => setForm({ ...form, otp: e })}
    />
    {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
    ) : null}
    <TouchableOpacity onPress={handleOTPVerification} style={styles.loginButton}>
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
        Verify OTP
        </Text>
    </TouchableOpacity>
    </>
  )
}
export default VerifyOTP;
const styles = StyleSheet.create({
  
    loginButton: {
      marginVertical: 20,
      elevation: 8,
      backgroundColor: '#fbc02d',
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
    
    errorText: {
      color: 'red',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  
  