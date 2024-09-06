import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Alert, TouchableOpacity, Text,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { updateTodoItem } from '../../helper';
import { useTheme } from '../../context/ThemeProvider';
function ReadToDo() {
  const navigation = useNavigation();
  const route = useRoute();
  const {theme} = useTheme();

  const { title } = route.params as { title };
const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };
const handleRead=() =>{
    navigation.goBack();
}
  

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style = {styles.optionsContainer}>

        </View>

      <View style={styles.detailsContainer}>
        <ScrollView>
        <Text >{title}</Text>
        </ScrollView>
      </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.okButton}>
          <Text style={[styles.buttonText,{ color: theme.colors.text }]}>ok</Text>
        </TouchableOpacity>
      
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
  },
  
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  okButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default ReadToDo;
