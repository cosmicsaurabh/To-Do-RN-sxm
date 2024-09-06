// useBookmarkToDo.ts

import { useCallback } from 'react';
import { useTodo } from '../../context/TodoProvider';
import Toast from 'react-native-toast-message';

const useBookmarkToDo = () => {
  const { bookmarkTodoItem } = useTodo();

  const handleBookmarkToDo = useCallback(async (item) => {
    try {
      item.bookmarked = !item.bookmarked;
      const newState = item.bookmarked;
      const updatedMsg = newState ? 'added to bookmark' : 'removed from bookmark';
      await bookmarkTodoItem({ ...item, bookmarked: newState });
      Toast.show({
        type: 'success',
        text1: 'Todo Bookmarked',
        text2: `${truncateText(item.title, 20)} has been ${updatedMsg}`,
      });
    } catch (error) {
      console.error('Error bookmarking todo item', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an error bookmarking the todo item.',
      });
    }
  }, [bookmarkTodoItem]);

  return handleBookmarkToDo;
};

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

export default useBookmarkToDo;
