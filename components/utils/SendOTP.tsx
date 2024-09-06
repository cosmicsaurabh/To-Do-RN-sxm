import { Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import FormField from './FormField'
import { useAuth } from '../../context/AuthProvider'
import { useTheme } from '../../context/ThemeProvider'
import Toast from 'react-native-toast-message'
import CustomButton from './CustomButton'
const SendOTP = ({onConfirmChange}) => {
    const {signInAndSignUpWithPhoneNumber} = useAuth();
    const {theme} = useTheme();
    const [errorText, setErrorText] = useState('');
    const [form, setForm] = useState({phone: ''});

    const isValidPhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
      };

    const handlePhoneLoginSignup = async () => {
        if (!isValidPhone(form.phone)) {
          setErrorText('Please enter a valid phone number.');
          return;
        }
        const formattedPhoneNumber = `+91${form.phone}`; 
        setErrorText('');
        try {
          const { success, confirmation: confirm } = await signInAndSignUpWithPhoneNumber(formattedPhoneNumber);     
           if (success) {
            onConfirmChange(confirm);
            console.log(typeof(onConfirmChange));
            Toast.show({ type: 'success', text1: 'OTP sent successfully' });
          } else {
            setErrorText('Failed to send OTP.');
            Toast.show({ type: 'error', text1: 'Failed to send OTP' });
        }
    } catch (error) {
        console.error('Signin Error', error);
        setErrorText('Error signing in with phone number.');
        Toast.show({ type: 'error', text1: 'Error signing in with phone number' });
        }
      };
  return (
    <>
    <FormField
        title="Phone"
        value={form.phone}
        placeholder="Number without code"
        handleChangeText={e => setForm({ ...form, phone: e })}
    />
    {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
    ) : null}
    <CustomButton
        text = 'Send OTP'
        onPress={() => handlePhoneLoginSignup()}
        buttonBGColor={ theme.colors.mobilesigninbutton}
        />
    </>
  )
}
export default SendOTP;

const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    
  });