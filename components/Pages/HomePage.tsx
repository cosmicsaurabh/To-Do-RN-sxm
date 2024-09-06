import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTodo} from '../../context/TodoProvider';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTheme} from '../../context/ThemeProvider';
import GlobalStyle from '../others/GlobalStyle';
import CustomButton from '../utils/CustomButton';

function HomePage({navigation}: any): JSX.Element {
  const {todos, bookmarkTodoItem, loadMoreTodos} = useTodo();
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isBookmarkedToggled, setIsBookmarkedToggled] = useState(false);
  let bookmarkedtodos = [];
  if (isBookmarkedToggled) {
    bookmarkedtodos = todos.filter(that => that.bookmarked);
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };


  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const {hasMore: more} = await loadMoreTodos();
    setHasMore(more);
    setLoading(false);
  };
  const handleAddToDo = async () => {
    const inbookmarked = isBookmarkedToggled ? true : false;
    navigation.navigate('AddToDo',{bookmarkstatus : inbookmarked});
  };
  const handleDetailsToDo = async todo => {
    try {
      console.log('item - >handle details', todo);
      navigation.navigate('DetailsToDo', {todo});
    } catch (error) {
      console.error('Error reading todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error reading the todo item.',
      });
    }
  };
  const handleBookmarkToDo = async item => {
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
  // const handleDoneToDo = async item =>{
      
  // }

  const renderTodoItem = ({item}) => (
    <TouchableOpacity key={item.id} onPress={() => handleDetailsToDo(item)}>
      <View style={styles.todoItem}>
        <View style={styles.todoContent}>
          <Text style={[styles.sectionDescription, {color: theme.colors.text}]}>
            {truncateText(item.title, 40)}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {/* <CustomButton
            iconname={
              item.done
                ? 'checkmark-done-circle-outline'
                : 'close-circle-outline'
            }
            onPress={() => handleDoneToDo(item)}
            buttonBGColor={item.done ? '#999999' : '#ffffff'}
          /> */}
          <CustomButton
            iconname={
              item.bookmarked
                ? 'heart-dislike-circle-outline'
                : 'heart-circle-outline'
            }
            onPress={() => handleBookmarkToDo(item)}
            buttonBGColor="#f774d7"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <Text
          style={[
            styles.tabTitle,
            GlobalStyle.CustomFont,
            {color: theme.colors.text},
          ]}>
          Home
        </Text>
        <ToggleSwitch
          isOn={isBookmarkedToggled}
          onColor="#f774d7"
          offColor="#FF9C01"
          label={isBookmarkedToggled ? 'BookMarked To-Do' : 'All To-Do'}
          labelStyle={{color: theme.colors.text, fontWeight: '600'}}
          size="medium"
          onToggle={() => setIsBookmarkedToggled(!isBookmarkedToggled)}
        />
      </View>
      <View style={styles.sectionContainer}>
        {todos.length === 0 ? (
          <Text style={[styles.emptyMessage, {color: theme.colors.text}]}>
            {isBookmarkedToggled
              ? 'Nothing bookmarked yet !!!'
              : 'No To-Do added yet !!!'}
          </Text>
        ) : (
          <FlatList
            data={isBookmarkedToggled ? bookmarkedtodos : todos}
            renderItem={renderTodoItem}
            keyExtractor={item => item.todo_id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.01}
            ListFooterComponent={
              loading ? (
                <Text style={[styles.loadingText, {color: theme.colors.text}]}>
                  Loading...
                </Text>
              ) : null
            }
          />
        )}
      </View>

      <View style={styles.fab}>
        <TouchableOpacity onPress={handleAddToDo}>
          <Icon
            name="add-outline"
            size={35}
            color={theme.dark ? 'black' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
  safearea: {
    flexGrow: 1,
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginRight:10,
    alignItems: 'center',
  },
  todoContent: {
    flex: 2,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  optionsContainer:{
    flexDirection:'row',
    padding:5,
    margin:5,
    justifyContent:'space-around',

  },
  loadingText: {
    textAlign: 'center',
    padding: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fbc02d',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  tabTitle: {
    fontSize: 18, // Adjusted font size
    fontWeight: '600',
    color: '#333',
  },

  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: '#fbc02e',
    borderRadius: 28,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 18,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
});

export default HomePage;
