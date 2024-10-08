import { Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import FormField from './FormField'
import { useAuth } from '../../context/AuthProvider'
import { useTheme } from '../../context/ThemeProvider'
import CustomButton from './CustomButton'

const SignInForm = () => {
    const {signin}  = useAuth();
    const {theme} = useTheme();
    const [errorText, setErrorText] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
        phone: '',
        otp: '',
      });

    const isValidEmail =( email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

    const handleLogin = async () => {
        if (!isValidEmail(form.email)) {
          setErrorText('Please enter a valid email address.');
          return;
        }
        if (!form.email || !form.password) {
          setErrorText('Please fill in both email and password.');
          return;
        }
        setErrorText('');
        try {
          const { success, message } = await signin(form.email, form.password);
          if (!success) {
            setErrorText("Credentials don't match 🧐... try again");
          }
        } catch (error) {
          console.error('Login Error:', error);
          setErrorText('Something went Wrong from our side.....try again later');
        }
      };
    
  return (
    <>
    <FormField
        title="Email"
        value={form.email}
        placeholder="Email"
        handleChangeText={e => setForm({...form, email: e})}
    />
    <FormField
        title="Password"
        value={form.password}
        placeholder="Password"
        handleChangeText={e => setForm({...form, password: e})}
        secureTextEntry
        />
    {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
    ) : null}
    
    <CustomButton
        text = 'LOGIN'
        onPress={() => handleLogin()}
        buttonBGColor={ theme.colors.loginsigninbutton}
        />
    </>
  )
}
export default SignInForm;
const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  
  