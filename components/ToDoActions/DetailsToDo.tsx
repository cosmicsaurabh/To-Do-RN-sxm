import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text,ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeProvider';
import CustomButton from '../utils/CustomButton';
import { useTodo } from '../../context/TodoProvider';

function DetailsToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {theme} = useTheme();
  const {bookmarkTodoItem} = useTodo();
  
  const { todo } = route.params as { todo };
  const [contentshowing,setContentshowing] = useState(todo.title)
  console.log("todo from detils to do page    ",todo)
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
  };
  
  const handleEditToDo = async (item) => {
    item.title = contentshowing;
    console.log("todo from detils to do page  handledittodo   ",item)
    navigation.navigate('EditToDo', {item,
      onGoBack: (data) => {
      setContentshowing(data);
    },});
  };
  const handleDeleteToDo = async( item )=> {
    navigation.navigate('DeleteToDo', {item });
  };
  const handleBookmarkToDo = async (item) => {
    try {
      let updatedbookmarkstatus = item.bookmarked;
      {
        item.bookmarked
          ? (updatedbookmarkstatus = 'removed from bookmark')
          : (updatedbookmarkstatus = 'added to bookmark');
      }
      item.bookmarked = !item.bookmarked;
      const newstate = item.bookmarked;
      await bookmarkTodoItem({...item, bookmarked: newstate});
      Toast.show({
        type: 'success',
        text1: 'Todo Bookmarked',
        text2: `${truncateText(
          item.title,
          20,
        )} has been ${updatedbookmarkstatus}`,
      });
    } catch (error) {
      console.error('Error bookmarking todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error bookmakring the todo item.',
      });
    }
  };
//   const handleDoneToDo = async item =>{
    
// }


  
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

        <View style = {styles.optionsContainer}>
        {/* <CustomButton
        iconname={
          todo.done
            ? 'checkmark-done-circle-outline'
            : 'close-circle-outline'
        }
        onPress={() => handleDoneToDo(todo)}
        buttonBGColor = {todo.done ? '#999999' : '#ffffff'}
        /> */}
        <CustomButton
        iconname={
          todo.bookmarked
            ? 'heart-dislike-circle-outline'
            : 'heart-circle-outline'
        }
        onPress={() => handleBookmarkToDo(todo)}
        buttonBGColor = '#f774d7'
        />
        <CustomButton
        iconname = 'create-outline'
        onPress={() => handleEditToDo(todo)}
        buttonBGColor = '#fbc02d'
        />
        <CustomButton
        iconname = 'trash-outline'
        onPress={() => handleDeleteToDo(todo)}
        buttonBGColor = '#f44336'
        />

        </View>

      <View style={styles.detailsContainer}>
        <ScrollView>
        <Text >{contentshowing}</Text>
        </ScrollView>
      </View>
        <CustomButton
        text = 'ok'
        onPress={() => navigation.goBack()}
        buttonBGColor = '#4CAF50'
        />
      
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
  optionsContainer:{
    flexDirection:'row',
    padding:5,
    marginBottom:20,
    justifyContent:'space-around',

  },
  detailsContainer: {
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
    padding:10,
  },
  
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DetailsToDo;
