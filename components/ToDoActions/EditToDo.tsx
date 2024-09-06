import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTodo} from '../../context/TodoProvider';
import {useTheme} from '../../context/ThemeProvider';
import CustomButton from '../utils/CustomButton';
import Toast from 'react-native-toast-message';

function EditToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {updateTodoItem} = useTodo();
  const {theme} = useTheme();

  const {item} = route.params as {item};
  const [error, setError] = useState('');
  const [title, setTitle] = useState(item.title);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
  };
  const handleCancel = () => {
    navigation.goBack();
  };
  const previousTitle = item.title;
  const handleUpdate = async () => {
    try {
      if (title.trim().length === 0) {
        setError('Content cannot be empty');
        return;
      }
      if (title.trim().length < 3) {
        setError('Content must be at least 3 char long');
        return;
      }
      const status = await updateTodoItem({...item, title});
      if (status === 'randomm') {
        setError('Random error occurred....hit the update button again');
        return;
      }
      Toast.show({
        type: 'success',
        text1: 'Todo Updated',
        text2: `${truncateText(
          previousTitle,
          20,
        )} has been updated to ${truncateText(title, 20)}.`,
      });
      route.params.onGoBack(title);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating todo item', error);
      setError('An error occurred while updating the todo item');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error updating the todo item.',
      });
    }
  };
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            value={title}
            multiline
            onChangeText={setTitle}
            placeholder="Update Todo Title"
            placeholderTextColor="#999999"
            numberOfLines={5}
          />
        </View>
        <View style={styles.errorContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            text="cancel"
            onPress={() => handleCancel()}
            buttonBGColor="#cccccc"
          />
          <CustomButton
            text="Update"
            onPress={() => handleUpdate()}
            buttonBGColor="#fbc02d"
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
  textContainer: {
    flexGrow: 1,
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
    height: 200,
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

export default EditToDo;
