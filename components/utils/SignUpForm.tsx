import { Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import FormField from './FormField'
import { useAuth } from '../../context/AuthProvider'
import { useTheme } from '../../context/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton'

const SignUpForm = () => {
    const {signup}  = useAuth();
    const {theme} = useTheme();
    const navigation = useNavigation();

    const [errorText, setErrorText] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: '',
        phone: '',
        username: '',
      });

      const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };
      const isValidPhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
      };
    

      const handleSignUp = async () => {
        const { email, password, username, phone } = form;
    
        if (!email || !password || !username || !phone) {
          setErrorText('Please fill in all fields.');
          return;
        }
    
        if (!isValidPhone(phone)) {
          setErrorText('Invalid phone number.');
          return;
        }
    
        if (!isValidEmail(email)) {
          setErrorText('Invalid email address.');
          return;
        }
    
        setErrorText('');
    
        try {
          const { success, message } = await signup(form);
          if (!success) {
            setErrorText('Sign up failed. Please try again.');
          } else {
            navigation.navigate('SignIn');
          }
        } catch (error) {
          console.error('Sign Up Error:', error);
          setErrorText('Something went wrong. Please try again later.');
        }
      };
    
  return (
    <>
     <FormField
          title="Username"
          value={form.username}
          placeholder="Username"
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        <FormField
          title="Phone"
          value={form.phone}
          placeholder="Phone"
          handleChangeText={(e) => setForm({ ...form, phone: e })}
        />
        <FormField
          title="Email"
          value={form.email}
          placeholder="Email"
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          title="Password"
          value={form.password}
          placeholder="Password"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />
        {errorText ? (
            <Text style={styles.errorText}>{errorText}</Text>
          ) : null}
        
        <CustomButton
        text = 'SIGN UP'
        onPress={() => handleSignUp()}
        buttonBGColor={ theme.colors.loginsigninbutton}
        />
    </>
  )
}
export default SignUpForm;
const styles = StyleSheet.create({  
    errorText: {
      color: 'red',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  
  