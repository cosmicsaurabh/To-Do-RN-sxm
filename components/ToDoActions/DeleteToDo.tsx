import React from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTodo } from '../../context/TodoProvider';
import { useTheme } from '../../context/ThemeProvider';
import Toast from 'react-native-toast-message';
import CustomButton from '../utils/CustomButton';

function DeleteToDo() {
  const navigation = useNavigation();
  const { deleteTodoItem } = useTodo();
  const{theme}  = useTheme();

  const route = useRoute();
  const { item } = route.params;

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const handleDelete = async () => {
    try {
      const status = await deleteTodoItem(item.todo_id);
      Toast.show({
        type: 'success',
        text1: 'Todo Deleted',
        text2: `${truncateText(item.title, 20)} has been deleted.`,
      });
      if(status === "randomm") {
        Toast.show({
          type: 'info',
          text1: 'Todo Deleted',
          text2: 'Random error occurred....hit the delete button again',
        });
        return;
      }
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Error deleting todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error deleting the todo item.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safearea} backgroundColor = {theme.colors.background}>

      <View style={styles.container} backgroundColor = {theme.colors.cardbgcolor}>
        <Text style={[styles.confirmationText, { color: theme.colors.text }] }>Are you sure you want to delete this To-Do?</Text>
        
        <View style={styles.buttonContainer}>
        <CustomButton
            text="cancel"
            onPress={() => navigation.goBack()}
            buttonBGColor={ theme.colors.cancel}
          />
          <CustomButton
            text="Delete"
            onPress={() => handleDelete()}
            buttonBGColor={ theme.colors.delete}
          />
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  confirmationText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexGrow:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
});

export default DeleteToDo;
