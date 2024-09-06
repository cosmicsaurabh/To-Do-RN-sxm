import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTodo} from '../../context/TodoProvider';
import {useTheme} from '../../context/ThemeProvider';
import Toast from 'react-native-toast-message';
import CustomButton from '../utils/CustomButton';

function AddToDo() {
  const {addTodoItem} = useTodo();
  const {theme} = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { bookmarkstatus} = route.params as {
    bookmarkstatus
  };
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
  };

  const handleCancel = () => {
    navigation.goBack();
  };
  const handleAdd = async () => {
    try {
      if (title.trim().length === 0) {
        setError('Title cannot be empty');
        return;
      }
      if (title.trim().length < 3) {
        setError('Title must be at least 3 char long');
        return;
      }
      setError(''); 
      const status = await addTodoItem(title, bookmarkstatus);
      if (status === 'randomm') {
        setError('Random error occurred....hit the create button again');
        return;
      }
      Toast.show({
        type: 'success',
        text1: 'Todo Added',
        text2: `${truncateText(title, 20)} has been added.`,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding todo item', error);
      setError(
        'An error occurred while adding the todo item. Please try again.',
      );
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error adding the todo item.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} backgroundColor = {theme.colors.background}>
      <View style={styles.container} backgroundColor = {theme.colors.cardbgcolor}>
          <TextInput
            style={[styles.input, { color: theme.colors.text },{backgroundColor :theme.colors.cardincardbgcolor}] }
            multiline
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Todo Title"
            placeholderTextColor="#999999"
          
          />
        <View style={styles.errorContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.buttonContainer}>
        <CustomButton
            text="cancel"
            onPress={() => navigation.goBack()}
            buttonBGColor={ theme.colors.cancel}
            />
          <CustomButton
            text="Create"
            onPress={() => handleAdd()}
            buttonBGColor={ theme.colors.create}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#232533',
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    marginBottom: 50,
  },
  errorContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    height: 600,
    elevation: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#CDCDE0',
    multiline: 'true',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

export default AddToDo;
