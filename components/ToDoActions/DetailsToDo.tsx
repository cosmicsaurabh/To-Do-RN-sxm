import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeProvider';
import CustomButton from '../utils/CustomButton';
import useBookmarkToDo from './BookmarkToDo';
import useDoneToDo from './DoneToDo';

function DetailsToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {theme} = useTheme();
  const handleBookmarkToDo = useBookmarkToDo();
  const handleDoneToDo = useDoneToDo()
  
  const { todo } = route.params as { todo };
  const [contentshowing,setContentshowing] = useState(todo.title)
  
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
  
 
  return (
    <SafeAreaView style={styles.safeArea} backgroundColor = {theme.colors.background}>
      <View style={styles.container} backgroundColor = {theme.colors.cardbgcolor}>

        <View style = {styles.optionsContainer}>
        <CustomButton
        iconname={
          todo.done
          ? 'close-circle-outline'
          : 'checkmark-done-circle-outline'
        }
        onPress={() => handleDoneToDo(todo)}
        buttonBGColor={todo.done ? theme.colors.cancel : theme.colors.done}
        />
        <CustomButton
        iconname={
          todo.bookmarked
            ? 'heart-dislike-circle-outline'
            : 'heart-circle-outline'
        }
        onPress={() => handleBookmarkToDo(todo)}
        buttonBGColor={ theme.colors.bookmark}
        />
        <CustomButton
        iconname = 'create-outline'
        onPress={() => handleEditToDo(todo)}
        buttonBGColor={ theme.colors.update}
        />
        <CustomButton
        iconname = 'trash-outline'
        onPress={() => handleDeleteToDo(todo)}
        buttonBGColor={ theme.colors.delete}
        />

        </View>

      <View style={styles.detailsContainer} backgroundColor = {theme.colors.cardincardbgcolor}>
        <ScrollView>
        <Text  style={[ { color: theme.colors.text }] }>{contentshowing}</Text>
        </ScrollView>
      </View>
        <CustomButton
        text = 'ok'
        onPress={() => navigation.goBack()}
        buttonBGColor={ theme.colors.ok}
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
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center',
    elevation: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
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
