import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTodo} from '../../context/TodoProvider';
import {useTheme} from '../../context/ThemeProvider';
function EditToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {updateTodoItem} = useTodo();
  const {theme} = useTheme();

  const {item, onUpdate} = route.params as {
    item: TodoItem;
    onUpdate: () => void;
  };
  const [error, setError] = useState('');
  const [title, setTitle] = useState(item.title);

  const handleCancel = () => {
    navigation.goBack();
  };

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
      onUpdate(title);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating todo item', error);
      setError('An error occurred while updating the todo item');
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
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={[styles.buttonText, {color: theme.colors.text}]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={[styles.buttonText, {color: theme.colors.text}]}>
              Update
            </Text>
          </TouchableOpacity>
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
  updateButton: {
    backgroundColor: '#fbc02d',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
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

export default EditToDo;
